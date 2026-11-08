# uuid-check-core

UUID validation with version/variant reporting and v4 generation. Zero
runtime dependencies, Node >= 22.

Part of the LOFRANO TECNOLOGIA open-source lab. MIT.

```js
import { validate, generateV4 } from './src/uuid.mjs';
validate('f47ac10b-58cc-4372-a567-0e02b2c3d479'); // { uuid, version: 4, variant: 'rfc4122' }
generateV4(); // 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
```

```sh
npm test          # 5 tests, node:test, no dependencies
npm run demo
```

Hyphenated text only. MIT — see `LICENSE`. [Versão em português](README.pt-BR.md).
