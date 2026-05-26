import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbThreeColsComponent } from './bmb-three-cols.component';
import { BmbTitleComponent } from '../bmb-title/bmb-title.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import {
  attributes,
  BlockquoteType,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';

export default {
  title: 'Internals/Three column content template',
  component: BmbThreeColsComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BmbContainerComponent, BmbTitleComponent, BmbIconComponent],
    }),
  ],
  parameters: {
    controls: { exclude: ['leftContent', 'mainContent', 'rightContent'] },
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `
${getGeneralComponentDescription({ name: 'three-cols' })} organize information into columns or sections using templates with labels, as well as alignment and justification.
  `,
)}
${getSpecialSpecifications(
  `${getAlertBlockquote(
    'Please remember to always add the appropriate tag to the templates for proper organization.',
    {
      title: RELEVANT_TITLE.configuration,
      blockquoteType: BlockquoteType.important,
      isRelevantTitle: true,
    },
  )}
>The column names or tags are:
- bmbLeftContent (optional or more than one)
- bmbMainContent
  - bmbTopMainContent
  - bmbBottomMainContent
- bmbRightContent (optional or more than one)
`,
  { showAdditionalBlockquote: true },
)}
${getBasicExampleBlock('BmbThreeColsComponent')}
\`\`\`html
<bmb-three-cols>
  <ng-template #bmbLeftContent>
    <!-- Content  -->
  </ng-template>
  <ng-template #bmbMainContent>
    <!-- Content  -->
  </ng-template>
  <ng-template #bmbRightContent>
    <!-- Content  -->
  </ng-template>
</bmb-three-cols>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    gapSize: {
      control: {
        type: 'select',
      },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
      description: 'Determines the size of the space between columns.',
    },
    justify: {
      control: {
        type: 'select',
      },
      options: [
        'center',
        'end',
        'start',
        'stretch',
        'spaceAround',
        'spaceBetween',
        'spaceEvenly',
      ],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'spaceBetween' },
      },
      description: 'Set the justify content.',
    },
    alignItems: {
      control: {
        type: 'select',
      },
      options: ['center', 'end', 'start', 'stretch'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'center' },
      },
      description: 'Set the align items.',
    },
    expandMainColumn: {
      control: { type: 'boolean' },
      description:
        'This property expands the main column to the maximum width.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    gapSize: 'm',
    justify: 'spaceBetween',
    alignItems: 'center',
    expandMainColumn: false,
  },
} as Meta<typeof BmbThreeColsComponent>;

type Story = StoryObj<BmbThreeColsComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
<bmb-container>
  <bmb-three-cols style="width: 100%" ${attributes(args)}>
    <ng-template #bmbLeftContent>
      <bmb-icon
        icon="home"
        [isFill]="true"
        fontWeight="400"
        [size]="24"
      />
    </ng-template>
    <ng-template #bmbMainContent>
      <bmb-title
        componentTitle="Title"
        subtitle="Sub title"
      />
    </ng-template>
    <ng-template #bmbRightContent>
      <bmb-icon
        icon="close"
        [isFill]="true"
        fontWeight="400"
        [size]="24"
      />
    </ng-template>
  </bmb-three-cols>
</bmb-container>
    `,
  }),
};
