/**
 * Writes a .gz next to every JS/CSS file of dist/client/assets.
 * Run after `vite build` (part of `npm run build`).
 *
 * nginx serves /assets/ straight from disk with `gzip_static on`: it sends these files as they are
 * instead of compressing the same 1 MB bundle again for every new visitor, which cost a sizeable share
 * of the VPS CPU under load. Level 9 also makes them ~15 % smaller than nginx's on-the-fly level 1.
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { constants, gzipSync } from 'zlib';

const assetsDir = 'dist/client/assets';

let count = 0;
for (const file of readdirSync(assetsDir)) {
  if (!/\.(js|css)$/.test(file)) continue;
  const path = join(assetsDir, file);
  writeFileSync(`${path}.gz`, gzipSync(readFileSync(path), { level: constants.Z_BEST_COMPRESSION }));
  count++;
}

console.log(`precompress-assets: ${count} files gzipped in ${assetsDir}`);
