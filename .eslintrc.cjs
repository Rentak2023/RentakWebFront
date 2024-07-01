/** @type {import("eslint").Linter.Config} */
const config = {
  env: {
    es2024: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@next/next/recommended",
    "plugin:import/recommended",
    "plugin:promise/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:barrel-files/recommended",
    "plugin:unicorn/recommended",
    "prettier",
  ],
  plugins: ["simple-import-sort"],
  rules: {
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
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "tailwindcss/no-custom-classname": "off",
    // Gives false positive for overflow-clip
    "tailwindcss/migration-from-tailwind-2": "off",
    "react/prop-types": "off",
    "react/jsx-no-useless-fragment": "error",
    "react/jsx-no-leaked-render": "error",
    "react/jsx-curly-brace-presence": "error",
    "react/self-closing-comp": "error",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/no-null": "off",
    "unicorn/no-array-reduce": "off",
    "barrel-files/avoid-namespace-import": [
      "error",
      {
        allowList: [
          "react",
          "@radix-ui/react-toast",
          "@radix-ui/react-label",
          "@radix-ui/react-collapsible",
          "@radix-ui/react-select",
          "@radix-ui/react-popover",
          "@radix-ui/react-checkbox",
          "@radix-ui/react-radio-group",
          "@radix-ui/react-slider",
          "@radix-ui/react-separator",
          "valibot",
        ],
      },
    ],
    // `lucid-react` is exporting barrel files. but nextjs handles it correctly
    "barrel-files/avoid-importing-barrel-files": ["off"],
  },
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "plugin:import/typescript",
      ],
      files: ["**/*.{ts,tsx}"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: true,
      },
      plugins: ["@typescript-eslint"],
      rules: {
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
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-floating-promises": "off",
      },
    },
  ],
  settings: {
    "import/resolver": {
      node: true,
      typescript: true,
    },
    react: {
      version: "detect",
    },
    linkComponents: ["Link"],
    tailwindcss: {
      callees: ["cn"],
    },
  },
};

module.exports = config;
