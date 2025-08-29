import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BmbStudentActivitySelectorComponent } from './bmb-student-activity-selector.component';
import { BmbTabStudentActivityComponent } from './bmb-student-activity-tab/bmb-student-activity-tab.component';
import { BmbCardComponent } from '../bmb-card/bmb-card.component';
import {
  getAppearanceParam,
  getDefaultValueControl,
} from '../../utils/doc/parameterDescriptions';
import { getBasicExampleBlock, getGeneralComponentDescription, getGeneralDescription } from '../../utils/doc/utils';

export default {
  title: 'Components/Menus/Student activity selector',
  component: BmbStudentActivitySelectorComponent,
  subcomponents: { BmbTabStudentActivityComponent, BmbCardComponent },
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BmbStudentActivitySelectorComponent,
        BmbTabStudentActivityComponent,
        BmbCardComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      controls: { exclude: ['selectTab', 'tabs','ngAfterContentInit'] },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('student-activity-selector')} to organize the information in three types of selectors (3 is the limit).`, 'https://bamboo.tec.mx/latest/components/student-activity-selector/descripcion-general-77DLiLfG')}
${getBasicExampleBlock('BmbStudentActivitySelectorComponent, BmbTabStudentActivityComponent')}
\`\`\`html
<bmb-student-activity-selector>
  <bmb-student-activity-tab title="1"
                           subtitle="item 1">
  </bmb-student-activity-tab>
  <bmb-student-activity-tab title="2"
                           subtitle="item 2">
  </bmb-student-activity-tab>
  <bmb-student-activity-tab title="3"
                           subtitle="item 3">
  </bmb-student-activity-tab>
</bmb-student-activity-selector>

\`\`\`
        `,
      },
    },
  },
  argTypes: {
    appearance: getAppearanceParam(
      'student activity selector',
      ['academic', 'life', 'events'],
      'academic',
    ),
    title: {
      control: { type: 'text' },
      description: 'Sets the tab name.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl(),
      },
    },
    subtitle: {
      control: {
        type: 'text',
      },
      description: 'Sets the tab subtitle.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl(),
      },
    },
  },

  args: {
    title: 'Tab 1',
    subtitle: 'Subtitulo 1',
    appearance: 'academic',
  },
} as Meta<typeof BmbStudentActivitySelectorComponent>;

type Story = StoryObj<BmbStudentActivitySelectorComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <bmb-student-activity-selector [appearance]="appearance">
        <bmb-student-activity-tab title="1" subtitle="item 1">
          <bmb-card>Content 1</bmb-card>
        </bmb-student-activity-tab>
        <bmb-student-activity-tab title="2" subtitle="item 2">
          <bmb-card>Content 2</bmb-card>
        </bmb-student-activity-tab>
        <bmb-student-activity-tab title="3" subtitle="item 3">
          <bmb-card>Content 3</bmb-card>
        </bmb-student-activity-tab>
      </bmb-student-activity-selector>
    `,
  }),
};
