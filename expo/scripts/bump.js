// Usage: npm run bump -- <major|minor|patch|bump>
// "bump" only increments buildNumber, version stays the same
const fs = require("fs");
const path = require("path");

const level = process.argv[2];
if (!["major", "minor", "patch", "bump"].includes(level)) {
  console.error("Usage: npm run bump -- <major|minor|patch|bump>");
  process.exit(1);
}

const file = path.join(__dirname, "..", "app.config.ts");
let src = fs.readFileSync(file, "utf8");

const versionMatch = src.match(/const version = "(\d+)\.(\d+)\.(\d+)";/);
const buildMatch = src.match(/const buildNumber = "(\d+)";/);
if (!versionMatch || !buildMatch) {
  console.error("Could not find version or buildNumber in app.config.ts");
  process.exit(1);
}

let [major, minor, patch] = versionMatch.slice(1).map(Number);
if (level === "major") [major, minor, patch] = [major + 1, 0, 0];
if (level === "minor") [minor, patch] = [minor + 1, 0];
if (level === "patch") patch += 1;

const version = `${major}.${minor}.${patch}`;
const buildNumber = Number(buildMatch[1]) + 1;

src = src
  .replace(versionMatch[0], `const version = "${version}";`)
  .replace(buildMatch[0], `const buildNumber = "${buildNumber}";`);
fs.writeFileSync(file, src);

console.log(`version ${versionMatch.slice(1).join(".")} -> ${version}, buildNumber ${buildMatch[1]} -> ${buildNumber}`);
