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

// disable automatic media links
function disable_automatic_media_links() {
  $image_set = get_option('image_default_link_type');
  if ($image_set !== 'none') {
    update_option('image_default_link_type', 'none');
  }
}
add_action('admin_init', 'disable_automatic_media_links');

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

// inline svg function
function svg($img, $class = '', $echo = true) {
  $html = "<span class='svg svg--$img $class'>";
  $html .= file_get_contents(get_theme_file_path("/img/$img.svg"));
  $html .= '</span>';
  if ($echo) {
    echo $html;
  } else {
    return $html;
  }
}
