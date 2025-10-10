import { componentWrapperDecorator, Meta, StoryFn } from '@storybook/angular';
import {
  DESIGN_SYSTEM_TITLE,
  FONT_FAMILY_DESCRIPTION,
  getFoundationDescriptions,
  getGeneralDescription,
  getPageStructureForFoundationStories,
  getSandboxConsiderationsDocumentation,
  getSpecialSpecifications,
  getTypographyDetail,
  SANDBOX_TITLE,
  SPACING_DESCRIPTION,
} from '../utils/doc/utils';

export default {
  title: 'Foundations/Variables',
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `
          <h1>${SANDBOX_TITLE}</h1>
          <br/>
          ${story}`;
    }),
  ],
  parameters: {
    docs: {
      page: () => getPageStructureForFoundationStories(),
      description: {
        component: `
${getGeneralDescription(getFoundationDescriptions('CSS'))}
${getSpecialSpecifications(
  getSandboxConsiderationsDocumentation(
    'spacing, border radius, fonts, and size',
    `
>There are rules in ${DESIGN_SYSTEM_TITLE} for CSS variable names, it is important to use them appropriately.
>- The class name variables have the following structure: \`bmb_{type}-{size}\`.
>   - ***Font Family*** is an exception.
>- The style name variables have the following structure: \`--bmb-{type}-{inherit / size}\`.
>   - ***Colors*** are an exception.
>
><br/><br/>`,
    `
###Spacing:
${SPACING_DESCRIPTION}
- **--bmb-spacing-none**: \`none = 0\`
- **--bmb-spacing-xxs**: \`2px = 0.125rem \`
- **--bmb-spacing-xs**: \`4px = 0.25rem\`
- **--bmb-spacing-s**: \`8px = 0.5rem\`
- **--bmb-spacing-m**: \`16px = 1rem\`
- **--bmb-spacing-l**: \`24px = 1.5rem\`
- **--bmb-spacing-xl**: \`32px = 2rem\`
- **--bmb-spacing-xxl**: \`64px = 4rem\`
- **--bmb-spacing-auto**: \`auto\`
>
\`\`\`css
.your-class {
  margin: var(--bmb-spacing-m);
} \`\`\`
><br/>
###Border radius
- **--bmb-radius-none**: \`none = 0\`
- **--bmb-radius-xxs**: \`2px = 0.125rem \`
- **--bmb-radius-xs**: \`4px = 0.25rem\`
- **--bmb-radius-s**: \`8px = 0.5rem\`
- **--bmb-radius-m**: \`16px = 1rem\`
- **--bmb-radius-l**: \`24px = 1.5rem\`
- **--bmb-radius-xl**: \`32px = 2rem\`
- **--bmb-radius-xxl**: \`64px = 4rem\`
- **--bmb-radius-full**: \`50%\`
>
\`\`\`css
.your-class {
  margin: var(--bmb-radius-m);
} \`\`\`
><br/>
>${getTypographyDetail(false)}
>`,
    true,
    [],
    '',
    false,
    false,
    true,
  ),
  { showAdditionalBlockquote: true },
)}`,
      },
    },
  },
  argTypes: {
    padding: {
      name: 'Padding',
      control: { type: 'select' },
      options: ['none', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'auto'],
      description: 'Sets the padding area on all sides of an element at once.',
      table: {
        category: SANDBOX_TITLE,
        type: { summary: 'string' },
      },
    },
    margin: {
      name: 'Margin',
      control: { type: 'select' },
      options: ['none', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'auto'],
      description: 'Sets the margin area on all sides of an element.',
      table: {
        category: SANDBOX_TITLE,
        type: { summary: 'string' },
      },
    },
    radius: {
      name: 'Border radius',
      control: { type: 'select' },
      options: ['none', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'full'],
      description: 'Rounds the corners of an element on the outer border edge.',
      table: {
        category: SANDBOX_TITLE,
        type: { summary: 'string' },
      },
    },
    family: {
      name: 'Font family',
      control: { type: 'select' },
      options: ['thin', 'light', 'regular', 'medium', 'semibold', 'bold'],
      description: FONT_FAMILY_DESCRIPTION.replace('Explore', 'Sets').concat(
        '.',
      ),
      table: {
        category: SANDBOX_TITLE,
        type: { summary: 'string' },
      },
    },
    size: {
      name: 'Size',
      control: { type: 'select' },
      options: [
        '1',
        '2',
        '3',
        '4',
        '4_5',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
      ],
      description: '',
      table: {
        category: SANDBOX_TITLE,
        type: { summary: 'string' },
      },
    },
  },
  args: {
    family: 'regular',
    size: '5',
    padding: 'm',
    radius: 'm',
    margin: 'm',
  },
} as Meta;

function getStyle(args: any): any {
  const classList = `
    margin: var(--bmb-spacing-${args.margin});
    padding: var(--bmb-spacing-${args.padding});
    border-radius: var(--bmb-radius-${args.radius});
    background-color: rgb(var(--color-blue-tint));
  `;
  return `style="${classList}"`;
}

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `<div class="font-${args['family']}-${args['size']}" ${getStyle(args)}>Typography</div>`,
});

export const Default = customizable();
