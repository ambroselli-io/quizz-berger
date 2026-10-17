// Avatars are shown at 56px at most, the source PNGs weigh up to 800 KB each.
// Writes a 112px (2x) WebP next to them, in public/candidates/thumbs/. Needs ImageMagick (`brew install imagemagick`).
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = join(import.meta.dirname, '..', 'public', 'candidates');
const thumbsDir = join(dir, 'thumbs');
mkdirSync(thumbsDir, { recursive: true });

for (const file of readdirSync(dir).filter((f) => f.endsWith('.png'))) {
  const out = join(thumbsDir, file.replace(/\.png$/, '.webp'));
  execFileSync('magick', [join(dir, file), '-resize', '112x112^', '-strip', '-quality', '80', out]);
  console.log(out);
}
