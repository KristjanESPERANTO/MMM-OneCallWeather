# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [3.1.0](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v3.0.0...v3.1.0) (2026-01-25)

### Added

- add unit test setup with node:test ([591e708](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/591e708eff95777fda17e661793fc37e36962d2f))
- add weather alerts to current block ([#29](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/issues/29)) ([e7538a2](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/e7538a2ba843abd54574b6fdac4847ae4247cd8c))
- enable alerts display in weather module ([4c376e3](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/4c376e3cbf862714291e4ecba9b8b4d6b53e20d8))

### Fixed

- add existence check for daily rain/snow data ([3eaa4be](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/3eaa4be59565d767b38e61cf8e7b9c4834d9e00a))
- add safety check for empty forecast data ([3ec44a6](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/3ec44a67a10982b5097128ea782e8720a5888389))
- correct API key validation check ([ff71900](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/ff71900091b76ebc7110a0d253ca43651fc6507b))
- correct mph2Beaufort algorithm ([16844f9](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/16844f9c780186e434155e404e6d0899374aee16))
- correct precipitation calculation for current weather ([0c963d4](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/0c963d435c5d77df7875cedb796552fb79ff6ce9))
- prevent data bleeding between multiple module instances ([04a26c1](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/04a26c1eab9b478697764ab9047aae2fe52fe5db))
- remove global data variable to prevent instance conflicts ([f3e3603](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/f3e3603da830e36044bfdcf58b419ae9ba5d5fa9))

### Chores

- add demo config and script ([a37535e](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/a37535e60d616a3857689286471e475304020816))
- add Oklahoma for testing alerts to demo config ([2cd2214](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/2cd22144d252031f46b7ec4506a926720a6a07c0))
- add release script ([28390ac](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/28390ac9805767052ed0720604fdee5432772664))
- change runner from ubuntu-latest to ubuntu-slim in automated tests ([8506945](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/8506945121835a6e196255576ecf05b8c887b049))
- handle linter issues ([f76e280](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/f76e280c9a281d02461a3ede51085050a4b14475))
- replace husky with simple-git-hooks for pre-commit hooks ([16f9ca1](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/16f9ca18211621094b6eb7717403fc281251c782))
- update actions/checkout to version 6 ([7a40b2f](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/7a40b2f7047b73a1b23ad5d4d49a29ea80066ce7))
- update devDependencies ([b12fddb](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/b12fddbb28a64382b618e80b1d497930f0dc5685))

### Code Refactoring

- extract utility functions to separate module ([9694c3c](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/9694c3ca59e27b0998f6a51d8b72e5dbb2057a6d))
- improve weather alerts implementation ([22f2b29](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/22f2b2947012c3db9a1ff49dd6ade994c3ed4be1))
- remove unused convertOpenWeatherIdToIcon function ([f5fb875](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/commit/f5fb8755a74c952b34112b2677313091f27aac6d))

## [3.0.0](https://github.com/KristjanESPERANTO/MMM-OneCallWeather/compare/v2.7.3...v3.0.0) - 2025-11-09

### Added

- feat: new configuration options for explicit layout control:
  - `showCurrent` (boolean): Show/hide current weather section (default: `true`)
  - `showForecast` (boolean): Show/hide forecast section (default: `true`)
  - `forecastLayout` ("columns" | "rows"): Days as table columns or rows (default: `"columns"`)
  - `arrangement` ("vertical" | "horizontal"): Position forecast below or next to current weather (default: `"vertical"`)

### Changed

- chore: update actions/checkout to v5 in automated tests workflow
- chore: update actions/setup-node to v6 in automated tests workflow
- chore: update devDependencies
- docs: update README with new screenshots for all layout combinations
- refactor: extract current weather block to helper method
- refactor: implement native CSS nesting
- refactor: modernize CSS with custom properties and improved organization
- refactor: remove unused WeatherObject class
- refactor: replace SVG wind icon with pure CSS compass design

### Removed

- **BREAKING**: removed `layout` configuration option
  - Migration: `layout: "vertical"` → `forecastLayout: "rows"`
  - Migration: `layout: "horizontal"` → not directly mapped, was legacy option
  - Migration: `layout: "default"` → `forecastLayout: "columns"` (default)

### Fixed

- fix: center wind speed within direction icon for all resolutions
- fix: colored temperature option now works for both column and row layouts

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
