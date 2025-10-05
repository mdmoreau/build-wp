import accordion from '../accordion/example.js';

const common = {
  name: 'theme/common',
  innerBlocks: [
    {
      name: 'core/heading',
      attributes: {
        content: 'Lorem ipsum dolor sit',
      },
    },
    {
      name: 'core/paragraph',
      attributes: {
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta accusantium nihil repellat nemo consectetur, id ipsum!',
      },
    },
  ],
};

const buttons = {
  name: 'core/buttons',
  innerBlocks: [
    {
      name: 'core/button',
      attributes: {
        text: 'Lorem ipsum',
      },
    },
  ],
};

export default {
  accordion: {
    name: 'theme/section',
    innerBlocks: [
      common,
      accordion,
      buttons,
    ],
    viewportWidth: 1024,
  },
};
