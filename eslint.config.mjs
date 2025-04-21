import eslintPluginJs from "@eslint/js";
import eslintPluginMarkdown from "@eslint/markdown";
import eslintPluginStylistic from "@stylistic/eslint-plugin";
import globals from "globals";
import {flatConfigs as importConfigs} from "eslint-plugin-import-x";

const config = [
  eslintPluginJs.configs.all,
  importConfigs.recommended,
  ...eslintPluginMarkdown.configs.recommended,
  {
    "files": ["**/*.md"],
    "language": "markdown/gfm",
    "plugins": {
      eslintPluginMarkdown
    },
    "rules": {
      "logical-assignment-operators": "off",
      "max-lines-per-function": "off",
      "no-irregular-whitespace": "off"
    }
  },
  {
    "files": ["**/*.js"],
    "languageOptions": {
      "globals": {
        ...globals.browser,
        ...globals.node,
        "Log": "readonly",
        "Module": "readonly",
        "WeatherObject": "readonly",
        "config": "readonly"
      },
      "sourceType": "commonjs"
    },
    "plugins": {
      ...eslintPluginStylistic.configs.all.plugins
    },
    "rules": {
      ...eslintPluginStylistic.configs.all.rules,
      "@stylistic/array-element-newline": ["error", "consistent"],
      "@stylistic/dot-location": ["error", "property"],
      "@stylistic/function-call-argument-newline": ["error", "consistent"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/lines-around-comment": "off",
      "@stylistic/padded-blocks": ["error", "never"],
      "@stylistic/quote-props": ["error", "as-needed"],
      "capitalized-comments": "off",
      "complexity": "off",
      "consistent-this": "off",
      "id-length": "off",
      "init-declarations": "off",
      "line-comment-position": "off",
      "max-lines": ["warn", 1000],
      "max-lines-per-function": ["warn", 500],
      "max-params": ["warn", 4],
      "max-statements": ["warn", 200],
      "multiline-comment-style": "off",
      "no-inline-comments": "off",
      "no-magic-numbers": "off",
      "no-negated-condition": "off",
      "no-ternary": "off",
      "one-var": "off",
      "sort-keys": "off",
      "strict": "off"
    }
  },
  {
    "files": ["**/*.mjs"],
    "languageOptions": {
      "ecmaVersion": "latest",
      "globals": {
        ...globals.node
      },
      "sourceType": "module"
    },
    "plugins": {
      ...eslintPluginStylistic.configs.all.plugins
    },
    "rules": {
      ...eslintPluginStylistic.configs.all.rules,
      "@stylistic/array-element-newline": "off",
      "@stylistic/indent": ["error", 2],
      "@stylistic/padded-blocks": ["error", "never"],
      "func-style": "off",
      "max-lines-per-function": ["error", 100],
      "no-magic-numbers": "off",
      "one-var": "off",
      "prefer-destructuring": "off"
    }
  }
];

export default config;
