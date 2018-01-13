<?php

// theme settings
function theme_settings() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_editor_style([get_theme_file_uri('/dist/css/main.min.css')]);
}
add_action('after_setup_theme', 'theme_settings');

// theme css
function theme_css() {
  wp_enqueue_style('theme-main', get_theme_file_uri('/dist/css/main.min.css'), [], null, 'screen');
}
add_action('wp_enqueue_scripts', 'theme_css');

// theme js
function theme_js() {
  wp_enqueue_script('theme-main', get_theme_file_uri('/dist/js/main.min.js'), [], null, true);
}
add_action('wp_enqueue_scripts', 'theme_js');
