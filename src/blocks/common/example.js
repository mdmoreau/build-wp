export default {
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
    {
      name: 'core/buttons',
      innerBlocks: [
        {
          name: 'core/button',
          attributes: {
            text: 'Lorem ipsum',
          },
        },
      ],
    },
  ],
};
