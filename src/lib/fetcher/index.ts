import { type KyInstance } from "ky";

let importPath = "./index-server.ts";

// eslint-disable-next-line unicorn/prefer-global-this
if (typeof window !== "undefined") {
  importPath = "./index-client.ts";
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export default (await import(importPath).then((i) => i.default)) as KyInstance;
