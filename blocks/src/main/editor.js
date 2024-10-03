import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';
import block from './block.json';

const edit = () => {
  const blockProps = useBlockProps();
  const innerBlocksProps = useInnerBlocksProps(blockProps, { templateLock: false, renderAppender: InnerBlocks.ButtonBlockAppender });

  return <main {...innerBlocksProps} />;
}

const save = () => <InnerBlocks.Content />;

registerBlockType(block, { edit, save });
