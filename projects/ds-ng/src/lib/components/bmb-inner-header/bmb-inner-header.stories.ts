import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbInnerHeaderComponent } from './bmb-inner-header.component';
import {
  attributes,
  attributesText,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  IBmbOnEvent,
} from '../../utils/doc/utils';
import { BmbChevronTitleSelectorComponent } from '../bmb-chevron-title-selector/bmb-chevron-title-selector.component';
import {
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  getDefaultValueControl,
  getOnClickParam,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

const onSearchEvent: IBmbOnEvent = getOnEvent('search', 'searchData', 'string');
const getButtonDesc = (isCloseButton: boolean) => {
  const buttons: string[] = ['back', 'close'];

  return getPropertyParamDesc(
    `***${buttons[Number(isCloseButton)]}*** button visible`,
    'boolean',
    false,
  );
};

export default {
  title: 'Particularities/mitec app/Inner header',
  component: BmbInnerHeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbChevronTitleSelectorComponent],
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'searchForm',
          'toggleSearch',
          'getFormControl',
          'getLeftIcon',
          'handleBack',
          'handleClose',
          'handleSearch',
          'handleTrailingIconPrimary',
          'handleTrailingIconSecondary',
          'onSubmit',
          '',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'inner-header' })} to implement headers for different needs.`, 'https://bamboo.tec.mx/latest/particularities/mitec-app/inner-header-yqkTnjq6')}
${getBasicExampleBlock('BmbInnerHeaderComponent')}
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Sets the main title for the header.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    placeholderSearch: {
      control: { type: 'text' },
      description: 'Sets the placeholder text for the search input.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(''),
        type: { summary: 'string' },
      },
    },
    subTitle: DBmbGenericParamDesc.deprecated,
    trailingIconPrimary: {
      ...DBmbIconParamDesc.icon,
      description: DBmbIconParamDesc.icon.description.replace(
        'icon name',
        'name of the primary icon',
      ),
    },
    trailingIconSecondary: {
      ...DBmbIconParamDesc.icon,
      description: DBmbIconParamDesc.icon.description.replace(
        'icon name',
        'name of the secondary icon',
      ),
    },
    showClose: getButtonDesc(true),
    showReturn: getButtonDesc(false),
    showSearch: getPropertyParamDesc(
      `***search*** button visible`,
      'boolean',
      false,
      '<br/><br/>',
    ),
    onHandleBack: getOnClickParam(getOnEvent('back', 'onHandleBack')),
    onHandleClose: getOnClickParam(getOnEvent('close', 'onHandleClose')),
    onHandleTrailingPrimary: getOnClickParam(
      getOnEvent(
        'the primary trailing icon',
        'onHandleTrailingPrimary',
        'unknown',
      ),
    ),
    onHandleTrailingSecondary: getOnClickParam(
      getOnEvent(
        'the secondary trailing icon',
        'onHandleTrailingSecondary',
        'unknown',
      ),
    ),
    searchData: getOnClickParam(onSearchEvent, ``),
    isLoading: DBmbGenericParamDesc.deprecated,
    data: DBmbGenericParamDesc.deprecated,
    onValueChange: DBmbGenericParamDesc.deprecated,
  },
  args: {
    title: 'Inner Header',
    placeholderSearch: 'Search',
    showClose: true,
    trailingIconPrimary: 'lock',
    onHandleBack: () => {
      console.log('Close button clicked in Storybook');
    },
    onHandleTrailingPrimary: () => {
      console.log('Trailing Primary button clicked in Storybook');
    },
  },
} as Meta<typeof BmbInnerHeaderComponent>;

type Story = StoryObj<BmbInnerHeaderComponent>;

export const Default: Story = {
  name: 'Base variant (an icon on the left) example',
};

export const BaseVariantExample = {
  name: 'Base variant example',
  argTypes: {
    onHandleTrailingSecondary: {
      control: 'function',
    },
  },
  args: {
    trailingIconSecondary: 'home',
    onHandleTrailingSecondary: () => {
      console.log('Trailing Secondary button clicked in Storybook');
    },
  },
};

export const SearchVariantExample = {
  name: 'Search variant',
  args: {
    trailingIconPrimary: '',
    showSearch: true,
  },
};

export const ResponsiveExample = {
  name: 'Responsive example',
  argTypes: {
    ...BaseVariantExample.argTypes,
  },
  args: {
    ...BaseVariantExample.args,
  },
  render: (args: any) => ({
    template: `
    <!-- Example of how you can use this component. -->
    <div style="width: 50%; margin: 0 auto;">
      <bmb-inner-header
        ${attributes(args)}
      />
    </div>
    `,
  }),
};

export const CustomExample = {
  name: 'Custom content example',
  argTypes: {
    ...BaseVariantExample.args,
  },
  args: {
    ...BaseVariantExample.args,
    test_text: 'Custom content (Bamboo component or HTML code)',
  },
  render: (args: any) => ({
    template: `
    <!-- Example of how you can use this component. -->
    <bmb-inner-header
      ${attributes(args)}
    >
      <!-- Example of content. The content can be a bamboo component or html. -->
      <div style="padding: 4rem; text-align: center;">${attributesText(args)}</div>
    </bmb-inner-header>
    `,
  }),
};

export const AnotherCustomExample = {
  name: 'Another custom example',
  argTypes: {
    ...BaseVariantExample.args,
  },
  args: {
    ...BaseVariantExample.args,
  },
  render: (args: any) => ({
    template: `
    <!-- Example of how you can use this component. -->
    <bmb-inner-header
      ${attributes(args)}
    >
      <!-- This example implements "Chevron Title Selector" component. -->
      <bmb-chevron-title-selector
        title="Title"
        leadingIcon="chevron_left"
        trailingIcon="chevron_right"
        (onLeadingClick)="onLeadingClick($event)"
        (onTrailingClick)="onTrailingClick($event)"
      />
    </bmb-inner-header>
    `,
  }),
};
