<?php

// theme setup
add_action('after_setup_theme', function () {
  add_theme_support('title-tag');
  add_theme_support('editor-styles');
  add_editor_style(['/assets/style.css']);
});

// theme assets
remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
add_action('wp_enqueue_scripts', function () {
  wp_dequeue_style('wp-block-library');
  wp_enqueue_style('theme-style', get_theme_file_uri('/assets/style.css'), [], null);
  wp_enqueue_script('theme-script', get_theme_file_uri('/assets/script.js'), [], null, true);
});

add_action('init', function () {
  // register blocks
  $blocks = glob(get_template_directory() . '/blocks/build/*');
  foreach ($blocks as $block) {
    register_block_type($block);
  }

  // restrict blocks
  $types = ['post', 'page'];
  foreach ($types as $type) {
    $post_type_object = get_post_type_object($type);
    $post_type_object->template = [['theme/main']];
    $post_type_object->template_lock = 'insert';
  }
});

// theme editor
add_action('enqueue_block_assets', function () {
  if (is_admin()) {
    $asset = include(get_theme_file_path('/blocks/build/editor.asset.php'));
    wp_enqueue_style('theme-editor', get_theme_file_uri('/blocks/build/editor.css'));
    wp_enqueue_script('theme-editor', get_theme_file_uri('/blocks/build/editor.js'), $asset['dependencies']);
  }
});

// inline svg
function inline_svg($name) {
  return file_get_contents(get_theme_file_path("/assets/{$name}.svg"));
}
