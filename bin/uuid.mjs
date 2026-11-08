#!/usr/bin/env node
// Demo: validate fixed UUIDs + generate one. --assert exits non-zero on mismatch.
import { check, generateV4, validate } from '../src/uuid.mjs';

let failed = 0;
const r1 = check('f47ac10b-58cc-4372-a567-0e02b2c3d479');
const ok1 = r1.ok && r1.version === 4 && r1.variant === 'rfc4122';
console.log(`${ok1 ? 'PASS' : 'FAIL'} fixture v4 -> ${r1.ok ? `v${r1.version}/${r1.variant}` : r1.code}`);
if (!ok1) failed++;
const r2 = check('not-a-uuid');
const ok2 = !r2.ok;
console.log(`${ok2 ? 'PASS' : 'FAIL'} garbage -> ${r2.code}`);
if (!ok2) failed++;
try {
  const g = validate(generateV4());
  const ok3 = g.version === 4;
  console.log(`${ok3 ? 'PASS' : 'FAIL'} generated -> ${g.uuid}`);
  if (!ok3) failed++;
} catch (e) {
  failed++;
  console.log(`FAIL generated threw ${e.code}`);
}
if (process.argv.includes('--assert') && failed > 0) process.exit(1);
if (failed > 0) process.exitCode = 1;
console.log(failed === 0 ? 'demo: all cases as expected' : `demo: ${failed} mismatch(es)`);
