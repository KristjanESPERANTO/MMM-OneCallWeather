# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.7.3](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v2.7.2...v2.7.3) - 2025-06-10

### Changed

- chore: add missing "type" field in `package.json`
- chore: update devDependencies
- docs: add missing description about `windUnits` option to README

## [2.7.2](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v2.7.1...v2.7.2) - 2025-05-17

### Changed

- chore: review linter setup
- chore: setup `husky` and `lint-staged`
- chore: update devDependencies
- refactor: update scripts to use `node --run`

## [2.7.1](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v2.7.0...v2.7.1) - 2025-04-21

### Changed

- chore: clean up ESLint rules by removing unnecessary settings and improving consistency
- chore: update devDependencies
- chore: update ESLint configuration to use new import plugin structure
- docs: add 'npm install' command to developer commands section
- refactor: invert negated conditions
- refactor: replace 'self' with 'that' for consistency in context binding

## [2.7.0](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v2.6.0...v2.7.0) - 2025-03-18

### Changed

- Replace translations by translations from MagicMirror core. With that we increase the amount of available languages from 6 to 47.
- chore: Update devDependencies

## [2.6.0](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v2.5.0...v2.6.0) - 2025-03-17

### Added

- Esperanto translation
- Swedish translation

### Changed

- chore: Update devDependencies

## [2.5.0](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v2.4.3...v2.5.0) - 2025-03-12

### Added

- Russian translation

### Changed

- Replace `dayjs` by built-in Date API. With this, the module doesn't need a dependency to run anymore.

## [2.4.3](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v2.4.2...v2.4.3) - 2025-03-12

### Changed

- Add CHANGELOG
- chore: Update devDependencies
- chore: Simplify stylelint-prettier config
- chore: Update lockfileVersion to 3
- chore: Add @eslint/markdown

## [2.4.2](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v2.4.1...v2.4.2) - 2025-03-02

### Changed

- chore: Optimize logging (Log.debug -> Log.error)
- chore: Add moduleName in CSS to avoid impact other module
- chore: Add stylelint

## [2.4.1](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v2.4.0...v2.4.1) - 2025-02-26

### Fixed

- chore: Fix linter and spelling issues

### Changed

- Replace "moment" by "dayjs"
- chore: Update screenshot
- chore: README: Add example icons to icon sets
- chore: README: Add iconsetFormat to example config
- chore: README: Several improvements
- chore: Simplify ESLint call
- chore: Update devDependencies
- chore: Replace eslint-plugin-import by eslint-plugin-import-x
- chore: Optimize @stylistic/eslint-plugin config
- chore: Remove release script
- chore: Add workflow for automated tests

## [2.4.0](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v2.3.0...v2.4.0) - 2025-02-17

### Changed

- Add Weather Icons
- Rework icon-preview
- Refactor and CSS fixes

## [2.3.0](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v2.2.3...v2.3.0) - 2025-02-16

### Fixed

- Add missing DOCTYPE to HTML file

### Changed

- Add Open Weather Icons
- Replace PNG with SVG for wind symbols
- chore: Update devDependencies

## [2.2.3](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v2.2.2...v2.2.3) - 2024-12-10

### Changed

- Add Code of Conduct
- chore: Add release script
- chore: Add Developer commands to README
- chore: Update devDependencies

## [2.2.2](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v2.2.1...v2.2.2) - 2024-11-04

### Fixed

- Fix translation #12

### Changed

- Use `npm ci` in installation instructions and add update section to README
- chore: Update devDependencies
- chore: Upgrade ESlint to v9
- chore: Handle linter issues
- chore: Add dependabot
- chore: Change LICENSE file to markdown format
- chore: Add spell check
- chore: Fix typos and remove comments

## [2.2.1](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v2.1.1...v2.2.1) - 2024-01-28

### Fixed

- Fix not working colored option

### Changed

- Optimize logging
- chore: Update devDependencies

## [2.1.1](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v2.1.0...v2.1.1) - 2024-01-01

### Changed

- chore: Remove unused css and images
- chore: Update devDependencies
- chore: Update URLs in README
- chore: Review lint process

## [2.1.0](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v2.0.0...v2.1.0) - 2023-11-04

### Fixed

- Fix apiVersion handling

### Changed

- Replace axios by internal fetch API
- Remove unused entries and set apiVersion default to 3.0
- chore: Optimize README
- chore: Update devDependencies
- chore: Install linters and update dependencies
- chore: Handle linter issues

## [2.0.0](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v1.0.0...v2.0.0) - 2023-03-11 - Fork Release

This is the first release of the fork maintained by KristjanESPERANTO. The fork is based on the original module from Captsi.

The fork was announced in an issue on the original repository: <https://github.com/Captsi/MMM-OneCallWeather/issues/4>.

## Fixed

- Fix installation by adding `package.json`and adapt installation instructions in README
- Fix CSS syntax issues

### Changed

- chore: Add `.gitignore` to exclude `node_modules` from the repository
- chore: Format code with prettier

## [1.0.0](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/releases/tag/v1.0.0) - 2021-04-16

Initial release
