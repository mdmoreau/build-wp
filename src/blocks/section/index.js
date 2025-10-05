import './style.css';

import { useBlockProps, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import block from './block.json';
import example from './example.js';

const edit = () => {
  const blockProps = useBlockProps({ className: 'Section' });
  const innerBlocksProps = useInnerBlocksProps(blockProps, { templateLock: 'all' });

  return <section {...innerBlocksProps} />;
};

const save = () => <InnerBlocks.Content />;

registerBlockType(block, { edit, save });

registerBlockVariation('theme/section', {
  name: 'accordion',
  title: 'Accordion',
  attributes: {
    metadata: {
      name: 'Section: Accordion',
    },
  },
  innerBlocks: [
    ['theme/common', {}, [
      ['core/heading'],
      ['core/paragraph'],
    ]],
    ['theme/accordion'],
    ['core/buttons'],
  ],
  example: example.accordion,
  isDefault: true,
});
