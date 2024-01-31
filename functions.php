<?php

// theme settings
function theme_settings() {
  add_theme_support('title-tag');
}
add_action('after_setup_theme', 'theme_settings');

// theme assets
function theme_assets() {
  if (is_vite()) {
    wp_enqueue_script('vite-client-dev', 'http://localhost:5173/@vite/client', [], null);
    wp_enqueue_style('theme-style-dev', 'http://localhost:5173/src/styles/style.css', [], null);
    wp_enqueue_script('theme-script-dev', 'http://localhost:5173/src/scripts/script.ts', [], null, true);
  } else {
    wp_enqueue_style('theme-style', get_theme_file_uri('/public/dist/style.css'), [], null);
    wp_enqueue_script('theme-script', get_theme_file_uri('/public/dist/script.js'), [], null, true);
  }
}
add_action('wp_enqueue_scripts', 'theme_assets');

// add script module
function add_script_module($tag, $handle, $src) {
  $modules = ['vite-client-dev', 'theme-script-dev'];
  if (in_array($handle, $modules)) {
    $esc_src = esc_url($src);
    return "<script type='module' src='$esc_src'></script>";
   }
   return $tag;
}
add_filter('script_loader_tag', 'add_script_module', 10, 3);

// remove caption padding
function remove_caption_padding($width) {
  return $width - 10;
}
add_filter('img_caption_shortcode_width', 'remove_caption_padding');

// is vite
function is_vite() {
  $host = $_SERVER['HTTP_HOST'];
  return str_starts_with($host, 'vite') && str_ends_with($host, 'localhost');
}

// inline svg
function inline_svg($name) {
  return file_get_contents(get_theme_file_path("/public/images/$name.svg"));
}
