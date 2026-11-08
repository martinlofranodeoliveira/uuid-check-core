import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { normalize, validate, check, generateV4, UuidError } from '../src/uuid.mjs';

describe('validate', () => {
  it('accepts a v4 and reports version/variant', () => {
    const r = validate('f47ac10b-58cc-4372-a567-0e02b2c3d479');
    assert.equal(r.version, 4);
    assert.equal(r.variant, 'rfc4122');
  });
  it('accepts nil, urn and braces', () => {
    assert.equal(validate('00000000-0000-0000-0000-000000000000').version, 0);
    assert.equal(validate('urn:uuid:f47ac10b-58cc-4372-a567-0e02b2c3d479').uuid, 'f47ac10b-58cc-4372-a567-0e02b2c3d479');
    assert.equal(validate('{F47AC10B-58CC-4372-A567-0E02B2C3D479}').uuid, 'f47ac10b-58cc-4372-a567-0e02b2c3d479');
  });
  it('rejects bad shapes and chars', () => {
    assert.equal(check('f47ac10b58cc4372a5670e02b2c3d479').code, 'BAD_SHAPE');
    assert.equal(check('zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz').code, 'BAD_CHARS');
    assert.equal(check('').code, 'EMPTY');
    assert.throws(() => validate(42), (e) => e.code === 'NOT_STRING');
    assert.ok(new UuidError('X') instanceof Error);
  });
});

describe('generate', () => {
  it('produces valid v4 rfc4122 UUIDs', () => {
    for (let i = 0; i < 5; i++) {
      const r = validate(generateV4());
      assert.equal(r.version, 4);
      assert.equal(r.variant, 'rfc4122');
    }
  });
  it('generates unique values', () => {
    assert.notEqual(generateV4(), generateV4());
  });
});
