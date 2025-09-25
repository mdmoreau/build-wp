import './style.css';

import { useBlockProps, useInnerBlocksProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import block from './block.json';
import example from './example.json';

const edit = ({ attributes, setAttributes }) => {
  const { heading } = attributes;
  const template = [['theme/common']];
  const blockProps = useBlockProps({ className: 'AccordionItem' });
  const innerBlocksProps = useInnerBlocksProps({ className: 'AccordionItem__interior' }, { template, templateLock: 'all' });

  return (
    <div {...blockProps}>
      <h3 className="AccordionItem__heading">
        <button className="AccordionItem__toggle" aria-expanded="true">
          <RichText
            value={heading}
            onChange={(value) => setAttributes({ heading: value })}
            placeholder="Heading"
            allowedFormats={[]}
          />
        </button>
      </h3>
      <div className="AccordionItem__content">
        <div {...innerBlocksProps} />
      </div>
    </div>
  );
};

const save = () => <InnerBlocks.Content />;

registerBlockType(block, { example, edit, save });
