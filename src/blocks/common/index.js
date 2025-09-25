import './style.css';

import { useBlockProps, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import block from './block.json';
import example from './example.json';

const edit = () => {
  const template = [['core/paragraph']];
  const blockProps = useBlockProps({ className: 'Common' });
  const innerBlocksProps = useInnerBlocksProps(blockProps, { template, templateLock: false });

  return <div {...innerBlocksProps} />;
};

const save = () => <InnerBlocks.Content />;

registerBlockType(block, { example, edit, save });
