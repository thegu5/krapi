# krapi
[![JSR version][jsr-image]][jsr-url]


A TypeScript wrapper for the official Krunker API

## Example

```ts
import { KrunkerApi } from "@gu5/krapi";

const kr = new KrunkerApi({ apiKey: "YOUR API KEY HERE" });

const profile = await kr.fetchProfile("givetickrate");
```

[jsr-image]: https://jsr.io/badges/@gu5/krapi
[jsr-url]: https://jsr.io/@gu5/krapi
