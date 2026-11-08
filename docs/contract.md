# Contract — uuid-check-core

Pure ESM in `src/uuid.mjs` (generation via `node:crypto`), zero runtime
dependencies, Node >= 22. Hyphenated text only; `urn:uuid:` prefix and
surrounding braces tolerated.

| Export | Result |
| --- | --- |
| `normalize(input)` | Canonical lowercase text. Throws `NOT_STRING`/`EMPTY`/`BAD_CHARS`/`BAD_SHAPE`. |
| `validate(input)` | `{ uuid, version, variant }`. Version = 13th hex digit; variant from the 17th (`8-b` rfc4122). |
| `check(input)` | `{ ok:true, ... }` or `{ ok:false, code }`. |
| `generateV4()` | `crypto.randomUUID()` (canonical v4 text). |
