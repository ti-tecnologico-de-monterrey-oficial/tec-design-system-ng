import { Meta, StoryFn } from '@storybook/angular';

export default {
  title: 'Foundations/Variables',
  parameters: {
    docs: {
      description: {
        component: `Explore the CSS variables:

**Spacing:**
- **--bmb-spacing-none**: \`none = 0\`
- **--bmb-spacing-xxs**: \`2px = 0.125rem \`
- **--bmb-spacing-xs**: \`4px = 0.25rem\`
- **--bmb-spacing-s**: \`8px = 0.5rem\`
- **--bmb-spacing-m**: \`16px = 1rem\`
- **--bmb-spacing-l**: \`24px = 1.5rem\`
- **--bmb-spacing-xl**: \`32px = 2rem\`
- **--bmb-spacing-xxl**: \`64px = 4rem\`
- **--bmb-spacing-auto**: \`auto\`

\`.your-class {
  margin: var(--bmb-spacing-m);
} \`

**Border radius:**
- **--bmb-radius-none**: \`none = 0\`
- **--bmb-radius-xxs**: \`2px = 0.125rem \`
- **--bmb-radius-xs**: \`4px = 0.25rem\`
- **--bmb-radius-s**: \`8px = 0.5rem\`
- **--bmb-radius-m**: \`16px = 1rem\`
- **--bmb-radius-l**: \`24px = 1.5rem\`
- **--bmb-radius-xl**: \`32px = 2rem\`
- **--bmb-radius-xxl**: \`64px = 4rem\`
- **--bmb-radius-full**: \`50%\`

\`.your-class {
  margin: var(--bmb-radius-m);
} \`

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

`,
      },
    },
  },
  argTypes: {
    padding: {
      name: 'Padding',
      control: { type: 'select' },
      options: ['none', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'auto'],
      description: 'Sets the padding area on all sides of an element at once',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    margin: {
      name: 'Margin',
      control: { type: 'select' },
      options: ['none', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'auto'],
      description: 'Sets the margin area on all sides of an element.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    radius: {
      name: 'Border radius',
      control: { type: 'select' },
      options: ['none', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'full'],
      description: 'Rounds the corners of an element on the outer border edge.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    }
  },
  args: {
    padding: 'm',
    radius: 'm',
    margin: 'm'
  },
} as Meta;

function attributes(args: any): any {
  const classList = `
    margin: var(--bmb-spacing-${args.margin});
    padding: var(--bmb-spacing-${args.padding});
    border-radius: var(--bmb-radius-${args.radius});
    background-color: rgb(var(--color-blue-tint));
  `
  return `style="${classList}"`;
}

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `<div class="font-regular-5" ${attributes(args)}>Typography</div>`,
});

export const Default = customizable();
