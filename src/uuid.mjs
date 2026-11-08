// SPDX-License-Identifier: MIT
// UUID validation, version/variant reporting and v4 generation.
// Accepts hyphenated text, optional urn:uuid: prefix or braces.
// No network, no I/O (generation uses crypto.randomUUID).

import { randomUUID } from 'node:crypto';

export class UuidError extends Error {
  constructor(code, detail = '') {
    super(detail ? `${code}: ${detail}` : code);
    this.name = 'UuidError';
    this.code = code;
  }
}

const SHAPE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** Strip prefix/braces, lowercase. Returns canonical text or throws. */
export function normalize(input) {
  if (typeof input !== 'string') throw new UuidError('NOT_STRING');
  let t = input.trim().toLowerCase();
  if (t.startsWith('urn:uuid:')) t = t.slice(9);
  if (t.startsWith('{') && t.endsWith('}')) t = t.slice(1, -1);
  if (t.length === 0) throw new UuidError('EMPTY');
  if (!SHAPE.test(t)) throw new UuidError(/[^0-9a-f{}-]/.test(t) ? 'BAD_CHARS' : 'BAD_SHAPE');
  return t;
}

/** Validate; returns { uuid, version (0-8 hex digit), variant }. */
export function validate(input) {
  const uuid = normalize(input);
  const version = Number.parseInt(uuid[14], 16);
  const vbits = Number.parseInt(uuid[19], 16);
  const variant = vbits >= 8 && vbits <= 11 ? 'rfc4122' : vbits < 8 ? 'reserved-ncs' : vbits < 12 ? 'reserved-microsoft' : 'reserved-future';
  return { uuid, version, variant };
}

/** Non-throwing: { ok:true, ... } or { ok:false, code }. */
export function check(input) {
  try {
    return { ok: true, ...validate(input) };
  } catch (err) {
    if (err instanceof UuidError) return { ok: false, code: err.code };
    throw err;
  }
}

/** Generate a random v4 UUID (canonical text). */
export function generateV4() {
  return randomUUID();
}
