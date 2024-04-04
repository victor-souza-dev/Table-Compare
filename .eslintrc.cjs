module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "node_modules",
    "dev-list",
    ".husky/_",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "import"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "{react,react-dom/**}",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "{src/**, ./src/**}",
            group: "internal",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["src/**"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "prettier/prettier": [
      "error",
      {
        printWidth: 80,
        tabWidth: 2,
        trailingComma: "all",
        semi: true,
        endOfLine: "auto",
      },
    ],
  },
};
