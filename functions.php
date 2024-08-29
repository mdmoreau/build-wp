<?php

// theme settings
function theme_settings() {
  add_theme_support('title-tag');
  add_theme_support('editor-styles');
  add_editor_style(['/assets/style.css']);
}
add_action('after_setup_theme', 'theme_settings');

// theme assets
function theme_assets() {
  wp_enqueue_style('theme-style', get_theme_file_uri('/assets/style.css'), [], null);
  wp_enqueue_script('theme-script', get_theme_file_uri('/assets/script.js'), [], null, true);
}
add_action('wp_enqueue_scripts', 'theme_assets');

// theme blocks
function theme_blocks() {
  $blocks = glob(get_template_directory() . '/blocks/build/*');
  foreach ($blocks as $block) {
    register_block_type($block);
  }
}
add_action('init', 'theme_blocks');

// inline svg
function inline_svg($name) {
  return file_get_contents(get_theme_file_path("/assets/$name.svg"));
}
