const config = {
  "extends": ["stylelint-config-standard"],
  "plugins": ["stylelint-prettier"],
  "root": true,
  "rules": {
    "prettier/prettier": true,
    "selector-class-pattern": "^(MMM-OneCallWeather|[a-z][a-z\\d]*(-[a-z\\d]+)*)$"
  }
};

export default config;
