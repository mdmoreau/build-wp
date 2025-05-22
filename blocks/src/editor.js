import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';

const customBlockClassName = (className, blockName) => {
  switch (blockName) {
    case 'core/image':
      return `${className} Image`;
    default:
      return className;
  }
};

addFilter('blocks.getBlockDefaultClassName', 'theme/custom-block-class-name', customBlockClassName);

const customBlockSettings = (settings, name) => {
  const allowedBlocks = [];
  const disallowedBlocks = ['core/nextpage'];

  switch (name) {
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
    const { clientId } = props;
    props.hasInnerBlocks = !!useSelect((select) => select('core/block-editor').getBlockCount(clientId));
    return <BlockEdit key="edit" {...props} />;
  };
}, 'customBlockEdit');

addFilter('editor.BlockEdit', 'theme/custom-block-edit', customBlockEdit);
