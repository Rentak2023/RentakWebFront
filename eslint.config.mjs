import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import react from "@eslint-react/eslint-plugin";
import tanStackQuery from "@tanstack/eslint-plugin-query";
import configPrettier from "eslint-config-prettier";
import importX from "eslint-plugin-import-x";
import promise from "eslint-plugin-promise";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tailwind from "eslint-plugin-tailwindcss";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import ts from "typescript-eslint";

const baseDirectory = path.dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory,
  resolvePluginsRelativeTo: baseDirectory,
});

export default ts.config(
  {
    ignores: [".next/"],
  },
  js.configs.recommended,
  ...ts.configs.strictTypeChecked,
  ...ts.configs.stylisticTypeChecked,
  ...tailwind.configs["flat/recommended"],
  unicorn.configs["flat/recommended"],
  promise.configs["flat/recommended"],
  ...tanStackQuery.configs["flat/recommended"],
  configPrettier,
  ...fixupConfigRules(
    compat.extends(
      "plugin:@next/next/recommended",
      "plugin:@next/next/core-web-vitals",
      "plugin:react-hooks/recommended",
      "plugin:barrel-files/recommended",
    ),
  ),
  importX.flatConfigs.recommended,
  importX.flatConfigs.react,
  importX.configs.typescript,
  comments.recommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "func-style": ["error", "declaration", { allowArrowFunctions: true }],
      "prefer-arrow-callback": "error",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-null": "off",
      "unicorn/no-array-reduce": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "no-restricted-imports": [
        "error",
        {
          name: "next/link",
          message: "Please use @/i18n/routing instead.",
        },
        {
          name: "next/navigation",
          importNames: [
            "redirect",
            "permanentRedirect",
            "usePathname",
            "useRouter",
          ],
          message: "Please use @/i18n/routing instead.",
        },
      ],
      "promise/always-return": [
        "error",
        {
          ignoreLastCallback: true,
        },
      ],
      "tailwindcss/no-custom-classname": "off",
      // Gives false positive for overflow-clip
      "tailwindcss/migration-from-tailwind-2": "off",
      "barrel-files/avoid-namespace-import": [
        "error",
        {
          allowList: [
            "@radix-ui/react-checkbox",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-dialog",
            "@radix-ui/react-label",
            "@radix-ui/react-popover",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slider",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@sentry/nextjs",
            "react",
            "valibot",
          ],
        },
      ],
      // `lucid-react` is exporting barrel files. but nextjs handles it correctly
      "barrel-files/avoid-importing-barrel-files": ["off"],
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          fixStyle: "inline-type-imports",
          prefer: "type-imports",
        },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: { attributes: false },
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
        },
      ],
      "@eslint-community/eslint-comments/disable-enable-pair": [
        "error",
        { allowWholeFile: true },
      ],
      "@eslint-community/eslint-comments/no-unused-disable": "error",
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      linkComponents: ["Link"],
      tailwindcss: {
        callees: ["cn"],
      },
      "import-x/resolver": {
        typescript: true,
        node: true,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    ...react.configs["recommended-type-checked"],
  },
  react.configs.dom,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs"],
    extends: [ts.configs.disableTypeChecked],
  },
);
