import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';

const customBlockSettings = (settings, name) => {
  const allowedBlocks = [];
  const disallowedBlocks = ['core/nextpage'];

  switch (name) {
    case 'core/button':
      settings.styles = [];
      break;
    case 'core/buttons':
      settings.parent = ['theme/common'];
      break;
    case 'core/heading':
      settings.parent = ['theme/common'];
      break;
    case 'core/image':
      settings.parent = ['theme/common'];
      settings.styles = [];
      break;
    case 'core/list':
      settings.parent = ['theme/common'];
      break;
    case 'core/paragraph':
      settings.parent = ['theme/common'];
      break;
  }

  if (!(name.startsWith('theme/') || allowedBlocks.includes(name)) && (!settings.parent || disallowedBlocks.includes(name))) {
    settings.supports = { ...settings.supports, inserter: false };
  }

  return settings;
};

addFilter('blocks.registerBlockType', 'theme/custom-block-settings', customBlockSettings);

const customBlockEdit = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    const hasInnerBlocks = !!useSelect((select) => select('core/block-editor').getBlockCount(props.clientId));
    return <BlockEdit key="edit" {...props} hasInnerBlocks={hasInnerBlocks} />;
  };
}, 'customBlockEdit');

addFilter('editor.BlockEdit', 'theme/custom-block-edit', customBlockEdit);
