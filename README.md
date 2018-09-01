# build-wp

Use with https://github.com/mdmoreau/build for WordPress theme development.

## Setup

- Add the build and build-wp repository contents to the theme root
- Remove `index.html`
- Add `@import 'util/wordpress';` to utilities in `src/css/main.css`
- Update Browsersync options in `config/browsersync.config.js`
  - Change `index.html` to `**/*.php` in the `files` array
  - Change `server` to `proxy` and add a valid hostname
- Update `style.css` with theme information
- Add `screenshot.jpg` with dimensions of 1200x900
