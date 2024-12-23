module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended", // Add TypeScript rules
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  settings: { react: { version: "detect" } },
  plugins: ["react-refresh", "simple-import-sort", "@typescript-eslint"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  parser: "@typescript-eslint/parser", // Use the TypeScript parser
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
    project: "./tsconfig.json", // Ensure this points to your TypeScript config
  },
};
