<?php

// theme settings
function theme_settings() {
  add_theme_support('title-tag');
  add_theme_support('editor-styles');
  add_editor_style(['/public/dist/style.css']);
}
add_action('after_setup_theme', 'theme_settings');

// theme assets
function theme_assets() {
  if (is_vite()) {
    wp_enqueue_script('vite-client', ':5173/@vite/client', [], null);
    wp_enqueue_style('vite-theme-style', ':5173/src/styles/style.css', [], null);
    wp_enqueue_script('vite-theme-script', ':5173/src/scripts/script.ts', [], null, true);
  } else {
    wp_enqueue_style('theme-style', get_theme_file_uri('/public/dist/style.css'), [], null);
    wp_enqueue_script('theme-script', get_theme_file_uri('/public/dist/script.js'), [], null, true);
  }
}
add_action('wp_enqueue_scripts', 'theme_assets');

// add script module
function add_script_module($tag, $handle, $src) {
  $modules = ['vite-client', 'vite-theme-script'];
  if (in_array($handle, $modules)) {
    $esc_src = esc_url($src);
    return "<script type='module' src='$esc_src'></script>";
   }
   return $tag;
}
add_filter('script_loader_tag', 'add_script_module', 10, 3);

// is vite
function is_vite() {
  return wp_get_environment_type() === 'local' && !is_wp_error(wp_remote_get('http://host.docker.internal:5173'));
}

// inline svg
function inline_svg($name) {
  return file_get_contents(get_theme_file_path("/public/images/$name.svg"));
}
