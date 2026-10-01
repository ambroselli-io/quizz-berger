/**
 * Writes src/content/candidates-light.json: every candidate of candidates-answers.json, without the answers.
 * Run: npm run generate-candidates-light (also chained after generate-gagnait-theme).
 *
 * The home page, the root layout and the route heads only need names, pictures and colours. Getting them from
 * candidates-answers.json shipped every candidate's answers (~800 kB) in the main bundle of every page.
 * utils/seo-light.test.ts fails when this file drifts from candidates-answers.json.
 */

import { writeFileSync } from 'fs';
import candidatesData from '../src/shared/candidates-answers.json';

const light = candidatesData.map(({ id, pseudo, picture, color }) => ({ id, pseudo, picture, color }));

writeFileSync('src/content/candidates-light.json', `${JSON.stringify(light, null, 2)}\n`);
console.log(`candidates-light.json: ${light.length} candidates`);
