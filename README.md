# krapi
[![NPM version][npm-image]][npm-url]
[![JSR version][jsr-image]][jsr-url]

A TypeScript wrapper for the official Krunker API

## Installation

krapi is available on both [NPM][npm-url] and [JSR][jsr-url] as `@gu5/krapi`.

## Example

```ts
import { KrunkerApi } from "@gu5/krapi";

const kr = new KrunkerApi({ apiKey: "YOUR API KEY HERE" });

const profile = await kr.fetchProfile("givetickrate");
```

[npm-image]: https://img.shields.io/npm/v/@gu5/krapi?logo=npm
[npm-url]: https://www.npmjs.com/package/@gu5/krapi

[jsr-image]: https://jsr.io/badges/@gu5/krapi
[jsr-url]: https://jsr.io/@gu5/krapi
