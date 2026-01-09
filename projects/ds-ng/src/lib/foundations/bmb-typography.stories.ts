import { componentWrapperDecorator, Meta, StoryFn } from '@storybook/angular';
import {
  getFoundationDescriptions,
  getGeneralDescription,
  getHelpDescriptionForGeneratingVariables,
  getPageStructureForFoundationStories,
  getSandboxConsiderationsDocumentation,
  getSpecialSpecifications,
  getTypographyDetail,
  SANDBOX_TITLE,
  TYPOGRAPHY_DESCRIPTION,
} from '../utils/doc/utils';

export default {
  title: 'Foundations/Typography',
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
${getGeneralDescription(getFoundationDescriptions('fonts and sizes', TYPOGRAPHY_DESCRIPTION.concat('<br/>')), { generalDocLink: 'https://bamboo.tec.mx/latest/foundations/tipografia/descripcion-general-cJHuMZaF' })}
${getSpecialSpecifications(
  getSandboxConsiderationsDocumentation(
    'font family and size reference',
    '',
    getTypographyDetail(),
    true,
  ),
  { showAdditionalBlockquote: true },
)}`,
      },
    },
  },
  argTypes: {
    family: {
      name: 'Font family',
      control: { type: 'select' },
      options: ['light', 'regular', 'bold'],
      description: getHelpDescriptionForGeneratingVariables(
        'font family',
        true,
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
      description: getHelpDescriptionForGeneratingVariables('size', true),
      table: {
        category: SANDBOX_TITLE,
        type: { summary: 'string' },
      },
    },
  },
  args: {
    family: 'regular',
    size: '5',
  },
} as Meta;

function getClassName(object: any): any {
  const family = object.family;
  const size = object.size;
  return `class="font-${family}-${size}"`;
}

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `<div style="color: var(--general-contrasts-100);" ${getClassName(args)}>Typography</div>`,
});

export const Default = customizable();
