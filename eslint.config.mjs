import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tanStackQuery from "@tanstack/eslint-plugin-query";
import configPrettier from "eslint-config-prettier";
import promise from "eslint-plugin-promise";
import reactPlugin from "eslint-plugin-react";
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
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  ...tailwind.configs["flat/recommended"],
  unicorn.configs["flat/recommended"],
  promise.configs["flat/recommended"],
  ...tanStackQuery.configs["flat/recommended"],
  configPrettier,
  ...fixupConfigRules(
    compat.extends(
      "plugin:@next/next/recommended",
      "plugin:react-hooks/recommended",
      "plugin:barrel-files/recommended",
      // "plugin:import/recommended"
      // "plugin:import/typescript"
    ),
  ),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "function-declaration",
          unnamedComponents: "arrow-function",
        },
      ],
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
          message: "Please use @/navigation instead.",
        },
        {
          name: "next/navigation",
          importNames: [
            "redirect",
            "permanentRedirect",
            "usePathname",
            "useRouter",
          ],
          message: "Please use @/navigation instead.",
        },
      ],
      "promise/always-return": [
        "error",
        {
          ignoreLastCallback: true,
        },
      ],
      "react/prop-types": "off",
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-no-leaked-render": "error",
      "react/jsx-curly-brace-presence": "error",
      "react/self-closing-comp": "error",
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
        { argsIgnorePattern: "^_" },
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
    },
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs"],
    extends: [ts.configs.disableTypeChecked],
  },
);
