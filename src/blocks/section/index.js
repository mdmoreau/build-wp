import './style.css';

import { useBlockProps, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import block from './block.json';

const edit = () => {
  const blockProps = useBlockProps({ className: 'Section' });
  const innerBlocksProps = useInnerBlocksProps(blockProps, { templateLock: 'all' });

  return <section {...innerBlocksProps} />;
};

const save = () => <InnerBlocks.Content />;

registerBlockType(block, { edit, save });
