module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended", "prettier"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  rules: {
    indent: ["error", 2],
    "react/jsx-no-target-blank": "off",
    "prettier/prettier": ["error"],
  },
};
