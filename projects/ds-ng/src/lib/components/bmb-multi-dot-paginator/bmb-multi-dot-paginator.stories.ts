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
  RELEVANT_TITLE_LEVEL,
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
          'selectedIndex',
          'selectItem',
          'setClassActive',
          'setNextItem',
          'contentChildren',
          'ngAfterContentInit',
        ],
      },
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription('multi-dot-paginator')} to view up to three elements, such as images (JPG), videos, or cards, simultaneously, offering agile and simplified navigation. This design minimizes clicks and improves interaction efficiency, allowing users to explore and select content quickly and effortlessly.`,
  'https://bamboo.tec.mx/latest/components/multi-dot-paginator/descripcion-general-QaYRw63C',
)}
${getSpecialSpecifications(`
${RELEVANT_TITLE_LEVEL[3]}
${getGeneralComponentDescription('bmb-multi-dot-paginator-item')} to add whether HTML content or ${DESIGN_SYSTEM_TITLE} component to ***Multi dot paginator***.<br/><br/>
  ${RELEVANT_TITLE_LEVEL[2]}When you click on fullscreen icon, in Storybook doesn’t look the best due to the many elements, but in your project, it should display correctly.
`)}
${getBasicExampleBlock('BmbMultiDotPaginatorItemComponent, BmbMultiDotPaginatorItemComponent')}
        `,
      },
    },
  },
  argTypes: {
    title: getPropertyParamDesc('paginator'),
    subtitle: getPropertyParamDesc('paginator', 'text', '', '', '', 'subtitle'),
  },
  args: {
    title: 'Example Title',
    subtitle: 'Example Subtitle',
  },
} as Meta<typeof BmbMultiDotPaginatorComponent>;

type Story = StoryObj<BmbMultiDotPaginatorComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
<bmb-multi-dot-paginator [title]="title" [subtitle]="subtitle">
  <bmb-multi-dot-paginator-item>Custom component</bmb-multi-dot-paginator-item>
  <bmb-multi-dot-paginator-item>
    <bmb-home-card title="Some title">Custom content</bmb-home-card>
  </bmb-multi-dot-paginator-item>
  <bmb-multi-dot-paginator-item>Custom component</bmb-multi-dot-paginator-item>
  <bmb-multi-dot-paginator-item>
    <bmb-home-card title="Some title">Custom content</bmb-home-card>
  </bmb-multi-dot-paginator-item>
  <bmb-multi-dot-paginator-item>Custom component</bmb-multi-dot-paginator-item>
  <bmb-multi-dot-paginator-item>
    <bmb-home-card title="Some title">Custom content</bmb-home-card>
  </bmb-multi-dot-paginator-item>
  <!-- Add more elements -->
</bmb-multi-dot-paginator>
  `,
  }),
};
