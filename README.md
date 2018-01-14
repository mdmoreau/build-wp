# build-wp

Use with https://github.com/mdmoreau/build for WordPress theme development.

## Setup

- Add the build and build-wp repository contents to the theme root
- Remove HTML imports from `src/main.js`
- Remove `src/html`
- Add `@import 'util/wordpress';` to utilities in `src/css/main.css`
- Update Browsersync options in `webpack.config.js`
  - Add `**/*.php` to `files` array
  - Change `server` to `proxy` and add a valid hostname
