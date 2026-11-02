// Installs the latest QuizzduBerger.app simulator build on another simulator, without compiling again.
// `expo run:ios --device` (no value) prompts for the device, `--binary` skips the build.
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const derivedData = path.join(os.homedir(), "Library/Developer/Xcode/DerivedData");

const candidates = fs
  .readdirSync(derivedData)
  .filter((dir) => dir.startsWith("QuizzduBerger-"))
  .map((dir) => path.join(derivedData, dir, "Build/Products/Debug-iphonesimulator/QuizzduBerger.app"))
  .filter((app) => fs.existsSync(app))
  .map((app) => ({ app, mtime: fs.statSync(app).mtimeMs }))
  .sort((a, b) => b.mtime - a.mtime);

if (!candidates.length) {
  console.error("No Debug-iphonesimulator QuizzduBerger.app found in DerivedData. Run `npm run ios` once first.");
  process.exit(1);
}

const { app, mtime } = candidates[0];
console.log(`Using ${app}\n(built ${new Date(mtime).toLocaleString()})\n`);

const result = spawnSync("npx", ["expo", "run:ios", "--port", "8085", "--device", "--binary", app], {
  stdio: "inherit",
});
process.exit(result.status ?? 1);
