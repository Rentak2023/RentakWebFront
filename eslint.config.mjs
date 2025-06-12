import path from "node:path";
import { fileURLToPath } from "node:url";

import importAlias from "@dword-design/eslint-plugin-import-alias";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import react from "@eslint-react/eslint-plugin";
import tanStackQuery from "@tanstack/eslint-plugin-query";
import { defineConfig, globalIgnores } from "eslint/config";
import configPrettier from "eslint-config-prettier";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import barrellFiles from "eslint-plugin-barrel-files";
import importX from "eslint-plugin-import-x";
import promise from "eslint-plugin-promise";
import { configs as reactHooksConfigs } from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
// import tailwind from "eslint-plugin-tailwindcss";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import ts from "typescript-eslint";

const baseDirectory = path.dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory,
  resolvePluginsRelativeTo: baseDirectory,
});

export default defineConfig(
  globalIgnores(["build", ".next", ".vercel", "out", "node_modules"]),
  {
    extends: [
      js.configs.recommended,
      ts.configs.strictTypeChecked,
      ts.configs.stylisticTypeChecked,
      react.configs["recommended-type-checked"],
      // disable until it supports v4
      // ...tailwind.configs["flat/recommended"],
      unicorn.configs["recommended"],
      promise.configs["flat/recommended"],
      tanStackQuery.configs["flat/recommended"],
      configPrettier,
      reactHooksConfigs.recommended,
      compat.extends("plugin:@next/next/core-web-vitals"),
      importX.flatConfigs.recommended,
      importX.flatConfigs.react,
      importX.configs.typescript,
      comments.recommended,
      barrellFiles.configs.recommended,
      importAlias.configs.recommended,
    ],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "func-style": ["error", "declaration", { allowArrowFunctions: true }],
      "import-x/namespace": "off",
      "import-x/named": "off",
      "import-x/default": "off",
      "import-x/no-named-as-default-member": "off",
      "import-x/no-unresolved": "off",
      "prefer-arrow-callback": "error",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-null": "off",
      "unicorn/no-array-reduce": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@dword-design/import-alias/prefer-alias": [
        "error",
        {
          alias: {
            "@": "./src",
          },
        },
      ],
      // Enable explicitly until it's added to recommended
      "react-hooks/react-compiler": "error",
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
          allowList: ["motion/react-client", "remeda", "react", "valibot"],
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
      "@typescript-eslint/no-unnecessary-condition": [
        "error",
        {
          allowConstantLoopConditions: "only-allowed-literals",
        },
      ],
      "@eslint-community/eslint-comments/disable-enable-pair": [
        "error",
        { allowWholeFile: true },
      ],
      "@eslint-community/eslint-comments/no-unused-disable": "error",
      "@eslint-react/no-useless-fragment": "error",
      "@eslint-react/prefer-react-namespace-import": "error",
      // "@eslint-react/prefer-read-only-props": "warn", // enable later when ready to fix
      "@eslint-react/dom/no-unknown-property": "warn",
      "@eslint-react/naming-convention/filename": [
        "warn",
        { rule: "kebab-case" },
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
      "import-x/resolver-next": [createTypeScriptImportResolver({})],
    },
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
  },
  {
    // shadcn components
    files: ["src/components/ui/**/*.ts", "src/components/ui/**/*.tsx"],
    rules: {
      "@eslint-react/prefer-read-only-props": "off",
      "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "off",
    },
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs"],
    extends: [
      ts.configs.disableTypeChecked,
      react.configs["disable-type-checked"],
    ],
  },
);
