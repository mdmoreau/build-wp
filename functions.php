<?php

// theme settings
function theme_settings() {
  add_theme_support('title-tag');
  add_editor_style([get_theme_file_uri('/dist/css/main.css')]);
}
add_action('after_setup_theme', 'theme_settings');

// theme css
function theme_css() {
  wp_enqueue_style('theme-main', get_theme_file_uri('/dist/css/main.css'), [], null, 'screen');
}
add_action('wp_enqueue_scripts', 'theme_css');

// theme js
function theme_js() {
  wp_enqueue_script('theme-main', get_theme_file_uri('/dist/js/main.js'), [], null, true);
}
add_action('wp_enqueue_scripts', 'theme_js');

// remove caption padding
function remove_caption_padding($width) {
  return $width - 10;
}
add_filter('img_caption_shortcode_width', 'remove_caption_padding');

// customize oembed
function customize_oembed($return, $data) {
  if (is_object($data) && property_exists($data, 'type') && $data->type === 'video') {
    return "<div class='video'>$return</div>";
  }
  return $return;
}
add_filter('oembed_dataparse', 'customize_oembed', 10, 2);

// inline svg
function inline_svg($name) {
  return file_get_contents(get_theme_file_path("/dist/img/$name.svg"));
}
