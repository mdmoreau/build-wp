<?php

// theme setup
add_action('after_setup_theme', function () {
  remove_theme_support('core-block-patterns');
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('disable-layout-styles');
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

  // dynamic block anchors
  WP_Block_Supports::get_instance()->register('anchor', [
    'register_attribute' => function ($block_type) {
      $has_anchor_support = _wp_array_get($block_type->supports, ['anchor'], true);
      if (!$has_anchor_support) {
        return;
      }
      if (!$block_type->attributes) {
        $block_type->attributes = [];
      }
      if (!array_key_exists('anchor', $block_type->attributes)) {
        $block_type->attributes['anchor'] = ['type' => 'string'];
      }
    },
    'apply' => function ($block_type, $block_attributes) {
      if (!$block_attributes) {
        return [];
      }
      if (wp_should_skip_block_supports_serialization($block_type, 'anchor')) {
        return [];
      }
      $has_anchor_support = _wp_array_get($block_type->supports, ['anchor'], true);
      if (!$has_anchor_support) {
        return [];
      }
      $has_anchor = array_key_exists('anchor', $block_attributes);
      if (!$has_anchor) {
        return [];
      }
      return ['id' => $block_attributes['anchor']];
    },
  ]);
});

// editor assets
remove_action('enqueue_block_editor_assets', 'wp_enqueue_editor_block_directory_assets');
remove_action('enqueue_block_editor_assets', 'gutenberg_enqueue_block_editor_assets_block_directory');
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
