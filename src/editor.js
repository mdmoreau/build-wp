import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

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
    case 'core/group':
      settings.variations = [];
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
    case 'core/quote':
      settings.allowedBlocks = ['core/paragraph'];
      settings.parent = ['theme/common'];
      settings.styles = [];
      break;
    case 'core/table':
      settings.parent = ['theme/common'];
      settings.styles = [];
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
    const { name, attributes } = props;
    const hasInnerBlocks = !!useSelect((select) => select('core/block-editor').getBlockCount(props.clientId));

    if (name === 'core/buttons') {
      const template = [['core/button']];
      const blockProps = useBlockProps(attributes);
      const innerBlocksProps = useInnerBlocksProps(blockProps, { template, templateLock: false });

      return <div {...innerBlocksProps} />;
    }

    return <BlockEdit key="edit" {...props} hasInnerBlocks={hasInnerBlocks} />;
  };
}, 'customBlockEdit');

addFilter('editor.BlockEdit', 'theme/custom-block-edit', customBlockEdit);
