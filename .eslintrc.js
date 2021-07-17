module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
  },
  root: true,
  extends: [
    "eslint:recommended",
    "eslint-plugin-react",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  },
};
