import { Meta, StoryFn } from '@storybook/angular';

export default {
  title: 'Foundations/Typography',
  parameters: {
    docs: {
      description: {
        component: `Explore the typographic scale with our "Poppins" font family, ranging from thin to bold variations, and a comprehensive scale of sizes to ensure flexibility and clarity in your design. We've encapsulated each font family and size into specific CSS classes to streamline the application across your projects. Here's how you can use them:

**Font Family:**
- **Poppins-Thin**: \`.font-thin\`
- **Poppins-Light**: \`.font-light\`
- **Poppins-Regular**: \`.font-regular\`
- **Poppins-Medium**: \`.font-medium\`
- **Poppins-Semibold**: \`.font-semibold\`
- **Poppins-Bold**: \`.font-bold\`

**Font Sizes:**
We provide a scale of sizes from 1 to 12, where each number corresponds to a specific size. To apply a font size, append the size number to the font family class. For example, \`.font-medium-4\` applies the medium family and the 4th size in our scale.

To use the medium family of Poppins with the 4th size, your HTML element should look like this:

\`<div class="font-medium-4">Your text here</div>\`

**Sizes Reference:**
- **Size 1**: 10px
- **Size 2**: 11px
- **Size 3**: 12px
- **Size 4**: 14px
- **Size 5**: 16px
- **Size 6**: 18px
- **Size 7**: 20px
- **Size 8**: 22px
- **Size 9**: 24px
- **Size 10**: 26px
- **Size 11**: 36px
- **Size 12**: 48px

Remember to replace \`font-medium-4\` with the appropriate class based on the family and size you intend to use. The flexibility of these classes allows for a consistent typographic hierarchy and visual coherence across your digital experiences.
`,
      },
    },
  },
  argTypes: {
    family: {
      name: 'Font Family',
      control: { type: 'select' },
      options: ['thin', 'light', 'regular', 'medium', 'semibold', 'bold'],
      description: 'Select the font family to look how works.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    size: {
      name: 'Size',
      control: { type: 'select' },
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      description: 'Select the size to look how works.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    family: 'thin',
    size: '1',
  },
} as Meta;

function attributes(object: any): any {
  const family = object.family;
  const size = object.size;
  return `class="font-${family}-${size}"`;
}

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `<div ${attributes(args)}>Typography</div>`,
});

export const Default = customizable();
