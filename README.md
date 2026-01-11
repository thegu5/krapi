# krapi
[![JSR version][jsr-image]][jsr-url]


A TypeScript wrapper for the official Krunker API

## Installation

krapi is available on [JSR][jsr-url]. If you use [pnpm](https://pnpm.io) or [yarn](https://yarnpkg.com) or [deno](https://deno.com), install `jsr:@gu5/krapi`.
If you use npm, run `npx jsr add @gu5/krapi`.

## Example

```ts
import { KrunkerApi } from "@gu5/krapi";

const kr = new KrunkerApi({ apiKey: "YOUR API KEY HERE" });

const profile = await kr.fetchProfile("givetickrate");
```

[jsr-image]: https://jsr.io/badges/@gu5/krapi
[jsr-url]: https://jsr.io/@gu5/krapi
