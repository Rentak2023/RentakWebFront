/* eslint-disable unicorn/prefer-module, @typescript-eslint/no-require-imports, no-undef */

// See https://nextjs.org/docs/basic-features/eslint#lint-staged for details

const path = require("node:path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*.{js,jsx,cjs,mjs,ts,tsx}": [buildEslintCommand, "prettier --write"],
  "*.{json,md}": "prettier --write",
};
