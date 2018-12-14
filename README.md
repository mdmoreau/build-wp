# build-wp

Use with https://github.com/mdmoreau/build for WordPress theme development.

## Setup

- Add the build repository contents to the theme root
- Merge the build-wp repository contents into the theme root
- Remove `index.html`
- Set a valid proxy in `config/browsersync.config.js`
- Update `style.css` with theme information
- Add `screenshot.jpg` with dimensions of 1200x900

## Features

### Inline SVG

The `inline_svg($img, $class, $echo)` function can be used to inline an SVG file in a PHP document.

#### Parameters

- `$img`
  - Required
  - Filename (excluding `.svg` extension) of the SVG
  - Relative to the `img` directory in the theme root
- `$class`
  - Default: `''`
  - Used to add additional classes to the SVG container element
  - Core build classes that support responsiveness are always added
- `$echo`
  - Default: `true`
  - Boolean that determines whether the function should echo or return
