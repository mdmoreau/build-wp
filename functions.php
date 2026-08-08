<?php

function theme_setup() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('editor-styles');
  add_theme_support('disable-layout-styles');
  remove_theme_support('core-block-patterns');
  add_editor_style(['/build/main.css', '/build/editor.css']);
};

add_action('after_setup_theme', 'theme_setup');

function theme_init() {
  $blocks = glob(get_theme_file_path('/build/blocks/*'));
  foreach ($blocks as $block) {
    register_block_type($block);
  }
};

add_action('init', 'theme_init');

function theme_scripts() {
  $main = include(get_theme_file_path('/build/main.asset.php'));
  wp_enqueue_style('theme-main', get_theme_file_uri('/build/main.css'));
  wp_enqueue_script('theme-main', get_theme_file_uri('/build/main.js'), $main['dependencies']);
  wp_dequeue_style('wp-block-library');
};

add_action('wp_enqueue_scripts', 'theme_scripts');
remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');

function theme_editor() {
  $editor = include(get_theme_file_path('/build/editor.asset.php'));
  wp_enqueue_script('theme-editor', get_theme_file_uri('/build/editor.js'), $editor['dependencies']);
};

add_action('enqueue_block_editor_assets', 'theme_editor');
remove_action('enqueue_block_editor_assets', 'wp_enqueue_editor_block_directory_assets');
remove_action('enqueue_block_editor_assets', 'gutenberg_enqueue_block_editor_assets_block_directory');

add_filter('styles_inline_size_limit', '__return_zero');
remove_filter('render_block', 'wp_render_layout_support_flag', 10, 2);

function inline_svg($name) {
  return file_get_contents(get_theme_file_path("/assets/{$name}.svg"));
}
