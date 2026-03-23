import { Meta, StoryObj } from '@storybook/angular';
import { BmbMultiDotPaginatorComponent } from './bmb-multi-dot-paginator.component';
import { BmbMultiDotPaginatorItemComponent } from './bmb-multi-dot-paginator-item/bmb-multi-dot-paginator-item.component';
import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import {
  DESIGN_SYSTEM_TITLE,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import { getPropertyParamDesc } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Status indicators/Multi dot paginator',
  component: BmbMultiDotPaginatorComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        BmbMultiDotPaginatorComponent,
        BmbMultiDotPaginatorItemComponent,
        BmbHomeCardComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'numberOfElements',
          'selectItem',
          'setClassActive',
          'setNextItem',
          'contentChildren',
          'ngAfterContentInit',
          'prevItem',
          'nextItem',
          'childrenItems',
        ],
      },
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({ name: 'multi-dot-paginator' })} to view up to three elements, such as images (JPG), videos, or cards, simultaneously, offering agile and simplified navigation. This design minimizes clicks and improves interaction efficiency, allowing users to explore and select content quickly and effortlessly.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/components/multi-dot-paginator/descripcion-general-QaYRw63C',
  },
)}
${getSpecialSpecifications(`
${RELEVANT_TITLE.configuration}
${getGeneralComponentDescription({ name: 'bmb-multi-dot-paginator-item' })} to add whether HTML content or ${DESIGN_SYSTEM_TITLE} component to ***Multi dot paginator***.<br/><br/>
  ${RELEVANT_TITLE.note}When you click on fullscreen icon, in Storybook doesn’t look the best due to the many elements, but in your project, it should display correctly.
`)}
${getBasicExampleBlock('BmbMultiDotPaginatorItemComponent, BmbMultiDotPaginatorItemComponent')}
        `,
      },
    },
  },
  argTypes: {
    componentTitle: getPropertyParamDesc('paginator'),
    subtitle: getPropertyParamDesc('paginator', {
      alternativePropName: 'subtitle',
    }),
    title: {
      control: null,
      description:
        'Please use `componentTitle` instead of `title` to set the component title.',
      table: {
        category: 'Deprecated',
        type: { summary: 'string' },
        defaultValue: '',
      },
    },
    selectedIndex: {
      control: { type: 'number' },
      description:
        'Index of the currently selected item. This is a model that can be used to set the selected item programmatically.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: 0,
      },
    },
  },
  args: {
    componentTitle: 'Example Title',
    subtitle: 'Example Subtitle',
    selectedIndex: 0,
  },
} as Meta<typeof BmbMultiDotPaginatorComponent>;

type Story = StoryObj<BmbMultiDotPaginatorComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
<bmb-multi-dot-paginator [componentTitle]="componentTitle" [subtitle]="subtitle">
  <bmb-multi-dot-paginator-item>Custom component</bmb-multi-dot-paginator-item>
  <bmb-multi-dot-paginator-item>
    <bmb-home-card componentTitle="Some title">Custom content</bmb-home-card>
  </bmb-multi-dot-paginator-item>
  <bmb-multi-dot-paginator-item>Custom component</bmb-multi-dot-paginator-item>
  <bmb-multi-dot-paginator-item>
    <bmb-home-card componentTitle="Some title">Custom content</bmb-home-card>
  </bmb-multi-dot-paginator-item>
  <bmb-multi-dot-paginator-item>Custom component</bmb-multi-dot-paginator-item>
  <bmb-multi-dot-paginator-item>
    <bmb-home-card componentTitle="Some title">Custom content</bmb-home-card>
  </bmb-multi-dot-paginator-item>
  <!-- Add more elements -->
</bmb-multi-dot-paginator>
  `,
  }),
};
