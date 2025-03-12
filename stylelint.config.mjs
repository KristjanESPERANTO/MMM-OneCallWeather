const config = {
  "extends": ["stylelint-config-standard", "stylelint-prettier/recommended"],
  "root": true,
  "rules": {
    "selector-class-pattern": "^(MMM-OneCallWeather|[a-z][a-z\\d]*(-[a-z\\d]+)*)$"
  }
};

export default config;
