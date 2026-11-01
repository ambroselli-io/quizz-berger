// Store release without a native build: take the last full build, put in the
// current JS bundle and the version numbers of app.config.ts, sign it again.
// Only for JS changes: the fingerprint check refuses the repack when native code,
// config plugins or native dependencies changed since the source build.
//
// Usage:
//   node scripts/repack.js save <ios|android> <file>   keep a full build (.ipa/.aab) as the repack source
//   node scripts/repack.js <ios|android> [--force]     write ./build.ipa or ./build.aab from the source
//
// Needs credentials.json (gitignored): `eas credentials` > platform >
// credentials.json > "Download credentials from EAS to credentials.json".
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const { getConfig } = require("expo/config");
const {
  createFingerprintAsync,
  diffFingerprints,
  SourceSkips,
} = require("@expo/fingerprint");

const ROOT = path.join(__dirname, "..");
const SOURCE_DIR = path.join(ROOT, "builds", "repack-source");
const EXT = { ios: "ipa", android: "aab" };
const OUTPUT = {
  ios: path.join(ROOT, "build.ipa"),
  android: path.join(ROOT, "build.aab"),
};
// Hermes bytecode files start with this magic number (little endian).
const HBC_MAGIC = Buffer.from([0xc6, 0x1f, 0xbc, 0x03]);
const ANDROID_NS = "http://schemas.android.com/apk/res/android";

function fail(message) {
  console.error(`\n✖ ${message}`);
  process.exit(1);
}

function run(cmd, args, options = {}) {
  execFileSync(cmd, args, { stdio: "inherit", cwd: ROOT, ...options });
}

function readExpoConfig() {
  return getConfig(ROOT, {
    skipSDKVersionRequirement: true,
    isPublicConfig: true,
  }).exp;
}

function readVersions(platform, exp = readExpoConfig()) {
  if (platform === "ios") {
    return {
      version: exp.ios?.version ?? exp.version,
      buildNumber: Number(exp.ios?.buildNumber),
    };
  }
  return {
    version: exp.android?.version ?? exp.version,
    buildNumber: Number(exp.android?.versionCode),
  };
}

// Versions are skipped: changing them is the point of a repack. package.json
// scripts and .gitignore do not change the native binary.
function fingerprint(platform) {
  return createFingerprintAsync(ROOT, {
    platforms: [platform],
    sourceSkips:
      SourceSkips.ExpoConfigVersions |
      SourceSkips.PackageJsonScriptsAll |
      SourceSkips.GitIgnore,
  });
}

function metaPath(platform) {
  return path.join(SOURCE_DIR, `${platform}.json`);
}

function freshDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function isHermesBytecode(file) {
  const head = Buffer.alloc(4);
  const fd = fs.openSync(file, "r");
  fs.readSync(fd, head, 0, 4, 0);
  fs.closeSync(fd);
  return head.equals(HBC_MAGIC);
}

function exportEmbed({
  platform,
  entryFile,
  bundleOutput,
  assetsDest,
  sourcemapOutput,
  hermes,
}) {
  run("npx", [
    "expo",
    "export:embed",
    "--platform",
    platform,
    "--entry-file",
    entryFile,
    "--bundle-output",
    bundleOutput,
    "--assets-dest",
    assetsDest,
    "--sourcemap-output",
    sourcemapOutput,
    "--dev",
    "false",
    "--reset-cache",
    ...(hermes
      ? [
          "--minify",
          "false",
          "--bytecode",
          "true",
          "--unstable-transform-profile",
          "hermes",
        ]
      : ["--minify", "true"]),
  ]);
}

function readCredentials(platform) {
  const file = path.join(ROOT, "credentials.json");
  if (!fs.existsSync(file)) {
    fail(
      "credentials.json is missing. Run `eas credentials`, pick the platform, then " +
        '"credentials.json" > "Download credentials from EAS to credentials.json".',
    );
  }
  const credentials = JSON.parse(fs.readFileSync(file, "utf8"))[platform];
  if (!credentials) fail(`credentials.json has no "${platform}" section.`);
  return credentials;
}

function uploadSourcemaps(exp, mapsDir) {
  const sentry = exp.plugins?.find(
    (p) => Array.isArray(p) && p[0] === "@sentry/react-native",
  )?.[1];
  if (!process.env.SENTRY_AUTH_TOKEN || !sentry) {
    console.warn(
      `⚠ SENTRY_AUTH_TOKEN is not set: source maps not uploaded. They are in ${mapsDir}`,
    );
    return;
  }
  try {
    run("npx", [
      "sentry-cli",
      "sourcemaps",
      "upload",
      "--org",
      sentry.organization,
      "--project",
      sentry.project,
      mapsDir,
    ]);
  } catch {
    console.warn(`⚠ Sentry upload failed. The source maps are in ${mapsDir}`);
  }
}

// --- Protobuf (aapt2 proto format of the AAB manifest and resource table) ---
// Minimal wire format codec: fields keep their raw bytes, so the fields we do
// not touch are written back exactly as they were.

function readVarint(buf, pos) {
  let value = 0;
  let shift = 0;
  let byte;
  do {
    byte = buf[pos++];
    value += (byte & 0x7f) * 2 ** shift;
    shift += 7;
  } while (byte & 0x80);
  return { value, pos };
}

function writeVarint(value) {
  const bytes = [];
  do {
    let byte = value % 128;
    value = Math.floor(value / 128);
    if (value > 0) byte |= 0x80;
    bytes.push(byte);
  } while (value > 0);
  return Buffer.from(bytes);
}

function decode(buf) {
  const fields = [];
  let pos = 0;
  while (pos < buf.length) {
    const key = readVarint(buf, pos);
    pos = key.pos;
    const num = Math.floor(key.value / 8);
    const type = key.value % 8;
    let raw;
    if (type === 0) {
      const start = pos;
      pos = readVarint(buf, pos).pos;
      raw = buf.subarray(start, pos);
    } else if (type === 1 || type === 5) {
      const size = type === 1 ? 8 : 4;
      raw = buf.subarray(pos, pos + size);
      pos += size;
    } else if (type === 2) {
      const length = readVarint(buf, pos);
      raw = buf.subarray(length.pos, length.pos + length.value);
      pos = length.pos + length.value;
    } else {
      throw new Error(`Unsupported protobuf wire type ${type}`);
    }
    fields.push({ num, type, raw });
  }
  return fields;
}

function encode(fields) {
  return Buffer.concat(
    fields.flatMap(({ num, type, raw }) => [
      writeVarint(num * 8 + type),
      ...(type === 2 ? [writeVarint(raw.length)] : []),
      raw,
    ]),
  );
}

const getString = (fields, num) =>
  fields.find((f) => f.num === num)?.raw.toString("utf8");

function setString(fields, num, value) {
  const field = fields.find((f) => f.num === num);
  if (field) field.raw = Buffer.from(value, "utf8");
}

// Calls edit(decodedFields) on each embedded message `num`, writes the result back.
function editMessages(fields, num, edit) {
  for (const field of fields) {
    if (field.num !== num || field.type !== 2) continue;
    const child = decode(field.raw);
    edit(child);
    field.raw = encode(child);
  }
}

// AndroidManifest.xml (XmlNode): element=1 > attribute=4 { namespace_uri=1,
// name=2, value=3, compiled_item=6 > Item { str=2 > String { value=1 },
// prim=7 > Primitive { int_decimal_value=6 } } }
function patchManifest(buf, { versionCode, versionName }) {
  const root = decode(buf);
  const done = new Set();
  editMessages(root, 1, (element) => {
    editMessages(element, 4, (attribute) => {
      if (getString(attribute, 1) !== ANDROID_NS) return;
      const name = getString(attribute, 2);
      if (name === "versionCode") {
        setString(attribute, 3, String(versionCode));
        editMessages(attribute, 6, (item) =>
          editMessages(item, 7, (prim) => {
            const int = prim.find((f) => f.num === 6);
            if (int) int.raw = writeVarint(versionCode);
          }),
        );
        done.add(name);
      } else if (name === "versionName") {
        setString(attribute, 3, versionName);
        editMessages(attribute, 6, (item) =>
          editMessages(item, 2, (str) => setString(str, 1, versionName)),
        );
        done.add(name);
      }
    });
  });
  if (done.size !== 2)
    fail("versionCode/versionName not found in the AAB manifest.");
  return encode(root);
}

// resources.pb (ResourceTable): package=2 > type=3 { name=2 } > entry=3 { name=2 }
// > config_value=6 > value=2 > item=4 > str=2 > String { value=1 }
function patchStringResource(buf, resourceName, value) {
  const table = decode(buf);
  let found = false;
  editMessages(table, 2, (pkg) =>
    editMessages(pkg, 3, (type) => {
      if (getString(type, 2) !== "string") return;
      editMessages(type, 3, (entry) => {
        if (getString(entry, 2) !== resourceName) return;
        editMessages(entry, 6, (configValue) =>
          editMessages(configValue, 2, (val) =>
            editMessages(val, 4, (item) =>
              editMessages(item, 2, (str) => {
                setString(str, 1, value);
                found = true;
              }),
            ),
          ),
        );
      });
    }),
  );
  if (!found) fail(`string/${resourceName} not found in the AAB resources.`);
  return encode(table);
}

// --- iOS ---

async function repackIos({ source, work, mapsDir }) {
  const { repackAppIosAsync } = require("@expo/repack-app");
  const credentials = readCredentials("ios");
  // credentials.json has one entry per target (app, share extension, widgets),
  // or the flat form for a single target.
  const targets = credentials.provisioningProfilePath
    ? { app: credentials }
    : credentials;
  const provisioningProfile = {};
  let certificate;
  for (const [
    target,
    { provisioningProfilePath, distributionCertificate },
  ] of Object.entries(targets)) {
    provisioningProfile[target] = path.resolve(ROOT, provisioningProfilePath);
    certificate ??= distributionCertificate;
  }

  // repack-app only rebuilds the main bundle: the share extension bundle
  // (index.share.js) is replaced here, before repack-app signs everything.
  const unzipped = path.join(work, "source");
  run("unzip", ["-q", source, "-d", unzipped]);
  const [app] = fs
    .readdirSync(path.join(unzipped, "Payload"))
    .filter((f) => f.endsWith(".app"));
  const plugins = path.join(unzipped, "Payload", app, "PlugIns");
  const extensions = fs.existsSync(plugins)
    ? fs
        .readdirSync(plugins)
        .filter((f) => fs.existsSync(path.join(plugins, f, "main.jsbundle")))
    : [];
  for (const extension of extensions) {
    const dir = path.join(plugins, extension);
    const bundle = path.join(dir, "main.jsbundle");
    const hermes = isHermesBytecode(bundle);
    fs.rmSync(path.join(dir, "assets"), { recursive: true, force: true });
    exportEmbed({
      platform: "ios",
      entryFile: path.join(ROOT, "index.share.js"),
      bundleOutput: bundle,
      assetsDest: dir,
      sourcemapOutput: path.join(mapsDir, `${extension}.map`),
      hermes,
    });
  }
  const patched = path.join(work, "source-patched.ipa");
  run("zip", ["-qry", patched, "."], { cwd: unzipped });

  await repackAppIosAsync({
    platform: "ios",
    projectRoot: ROOT,
    sourceAppPath: patched,
    outputPath: OUTPUT.ios,
    workingDirectory: path.join(work, "repack"),
    exportEmbedOptions: {
      sourcemapOutput: path.join(mapsDir, "main.jsbundle.map"),
    },
    iosSigningOptions: {
      backend: "zsign",
      certificatePath: path.resolve(ROOT, certificate.path),
      keyPassword: certificate.password,
      provisioningProfile,
      useAppEntitlements: true,
    },
  });
}

// --- Android ---
// repack-app turns an AAB into a universal APK, which Google Play refuses. So
// the AAB is patched here: JS bundle, embedded manifests, versions, runtime version.

async function repackAndroid({ source, work, mapsDir, version, buildNumber }) {
  const {
    resolveRuntimeVersionAsync,
  } = require("expo-updates/utils/build/resolveRuntimeVersionAsync");
  const { keystore } = readCredentials("android");
  const aab = path.join(work, "aab");
  run("unzip", ["-q", source, "-d", aab]);
  const assets = path.join(aab, "base", "assets");
  const bundle = path.join(assets, "index.android.bundle");
  const updatesManifest = path.join(assets, "app.manifest");
  const oldAssets = JSON.parse(fs.readFileSync(updatesManifest, "utf8")).assets;

  const entryFile = execFileSync(
    "node",
    [
      "-e",
      "require('expo/scripts/resolveAppEntry')",
      ROOT,
      "android",
      "absolute",
    ],
    { cwd: ROOT, encoding: "utf8" },
  ).trim();
  exportEmbed({
    platform: "android",
    entryFile,
    bundleOutput: bundle,
    // Images go to res/ in an AAB, compiled into resources.pb: they cannot change
    // here, see the asset check below.
    assetsDest: freshDir(path.join(work, "res")),
    sourcemapOutput: path.join(mapsDir, "index.android.bundle.map"),
    hermes: isHermesBytecode(bundle),
  });
  run("node", [
    require.resolve("expo-updates/utils/build/createUpdatesResources.js"),
    "android",
    ROOT,
    assets,
    "all",
    entryFile,
  ]);
  const expoConstantsDir = path.dirname(
    require.resolve("expo-constants/package.json"),
  );
  run("node", [
    path.join(expoConstantsDir, "scripts", "getAppConfig.js"),
    ROOT,
    assets,
  ]);

  const assetKey = (a) =>
    `${a.subdirectory}/${a.name}.${a.type}@${a.scale}:${a.packagerHash}`;
  const newAssets = JSON.parse(fs.readFileSync(updatesManifest, "utf8")).assets;
  const before = new Set(oldAssets.map(assetKey));
  const changed = newAssets.map(assetKey).filter((key) => !before.has(key));
  if (changed.length || newAssets.length !== oldAssets.length) {
    fail(
      `JS assets (images, fonts...) changed since the source build: do a full build.\n${changed.join("\n")}`,
    );
  }

  const { runtimeVersion } = await resolveRuntimeVersionAsync(
    ROOT,
    "android",
    {},
    {},
  );
  const manifestFile = path.join(
    aab,
    "base",
    "manifest",
    "AndroidManifest.xml",
  );
  fs.writeFileSync(
    manifestFile,
    patchManifest(fs.readFileSync(manifestFile), {
      versionCode: buildNumber,
      versionName: version,
    }),
  );
  const resourcesFile = path.join(aab, "base", "resources.pb");
  fs.writeFileSync(
    resourcesFile,
    patchStringResource(
      fs.readFileSync(resourcesFile),
      "expo_runtime_version",
      runtimeVersion,
    ),
  );

  // Drop the old signature, zip, sign with the upload key.
  const metaInf = path.join(aab, "META-INF");
  for (const file of fs.existsSync(metaInf) ? fs.readdirSync(metaInf) : []) {
    if (/\.(SF|RSA|DSA|EC)$|^MANIFEST\.MF$/.test(file))
      fs.rmSync(path.join(metaInf, file));
  }
  const unsigned = path.join(work, "unsigned.aab");
  run("zip", ["-qrD", "-X", unsigned, "."], { cwd: aab });
  run(
    "jarsigner",
    [
      "-sigalg",
      "SHA256withRSA",
      "-digestalg",
      "SHA-256",
      "-keystore",
      path.resolve(ROOT, keystore.keystorePath),
      "-storepass:env",
      "REPACK_KS_PASS",
      "-keypass:env",
      "REPACK_KEY_PASS",
      "-signedjar",
      OUTPUT.android,
      unsigned,
      keystore.keyAlias,
    ],
    {
      env: {
        ...process.env,
        REPACK_KS_PASS: keystore.keystorePassword,
        REPACK_KEY_PASS: keystore.keyPassword,
      },
    },
  );

  // Read the values back with bundletool: a wrong patch stops here, not on the Play Console.
  run("bundletool", ["validate", "--bundle", OUTPUT.android], {
    stdio: "pipe",
  });
  const dump = (...args) =>
    execFileSync("bundletool", ["dump", ...args, "--bundle", OUTPUT.android], {
      encoding: "utf8",
    }).trim();
  const checks = [
    [
      dump("manifest", "--xpath", "/manifest/@android:versionCode"),
      String(buildNumber),
    ],
    [dump("manifest", "--xpath", "/manifest/@android:versionName"), version],
  ];
  for (const [actual, expected] of checks) {
    if (actual !== expected)
      fail(
        `Patched AAB check failed: got "${actual}", expected "${expected}".`,
      );
  }
  const runtimeDump = dump(
    "resources",
    "--resource",
    "string/expo_runtime_version",
    "--values",
  );
  if (!runtimeDump.includes(`"${runtimeVersion}"`))
    fail(`Patched AAB runtime version check failed:\n${runtimeDump}`);
}

// --- Commands ---

async function save(platform, file) {
  if (!file || !fs.existsSync(file)) fail(`File not found: ${file}`);
  fs.mkdirSync(SOURCE_DIR, { recursive: true });
  fs.copyFileSync(file, path.join(SOURCE_DIR, `${platform}.${EXT[platform]}`));
  const { version, buildNumber } = readVersions(platform);
  const meta = {
    savedAt: new Date().toISOString(),
    version,
    buildNumber,
    lastBuildNumber: buildNumber,
    fingerprint: await fingerprint(platform),
  };
  fs.writeFileSync(metaPath(platform), JSON.stringify(meta, null, 2));
  console.log(
    `✔ ${platform} ${version} (${buildNumber}) saved as the repack source`,
  );
}

async function repack(platform, force) {
  const source = path.join(SOURCE_DIR, `${platform}.${EXT[platform]}`);
  if (!fs.existsSync(source) || !fs.existsSync(metaPath(platform))) {
    fail(
      `No repack source for ${platform}. Do a full build, then run npm run repack-save-source:${platform}.`,
    );
  }
  const meta = JSON.parse(fs.readFileSync(metaPath(platform), "utf8"));

  const current = await fingerprint(platform);
  if (current.hash !== meta.fingerprint.hash) {
    console.error(
      `Native changes since the source build (${meta.version} - ${meta.buildNumber}):`,
    );
    for (const item of diffFingerprints(meta.fingerprint, current)) {
      const s =
        item.addedSource ??
        item.removedSource ??
        item.afterSource ??
        item.beforeSource;
      console.error(`  ${item.op} ${s.type} ${s.filePath ?? s.id ?? ""}`);
    }
    if (!force)
      fail(
        "Do a full build, or use --force if these changes do not touch the native binary.",
      );
    console.warn("⚠ --force: repacking anyway");
  }

  require("@expo/env").load(ROOT);
  const exp = readExpoConfig();
  const { version, buildNumber } = readVersions(platform, exp);
  if (!(buildNumber > meta.lastBuildNumber)) {
    fail(
      `Build number ${buildNumber} is already used (last: ${meta.lastBuildNumber}). Run npm run bump first.`,
    );
  }

  const work = freshDir(path.join(os.tmpdir(), `quizz-du-berger-repack-${platform}`));
  const mapsDir = freshDir(
    path.join(ROOT, "builds", "sourcemaps", `${platform}-${buildNumber}`),
  );
  fs.rmSync(OUTPUT[platform], { force: true });
  const args = { source, work, mapsDir, version, buildNumber };
  await (platform === "ios" ? repackIos(args) : repackAndroid(args));

  meta.lastBuildNumber = buildNumber;
  fs.writeFileSync(metaPath(platform), JSON.stringify(meta, null, 2));
  uploadSourcemaps(exp, mapsDir);
  fs.rmSync(work, { recursive: true, force: true });
  console.log(
    `✔ ${path.relative(ROOT, OUTPUT[platform])}: ${version} (${buildNumber}), repacked from ${meta.version} (${meta.buildNumber})`,
  );
}

module.exports = { patchManifest, patchStringResource };

if (require.main === module) {
  const [command, ...rest] = process.argv.slice(2);
  const platform = command === "save" ? rest[0] : command;
  if (!EXT[platform]) {
    fail(
      "Usage: node scripts/repack.js save <ios|android> <file> | node scripts/repack.js <ios|android> [--force]",
    );
  }
  (command === "save"
    ? save(platform, rest[1])
    : repack(platform, rest.includes("--force"))
  ).catch((e) => fail(e.stack ?? e));
}
