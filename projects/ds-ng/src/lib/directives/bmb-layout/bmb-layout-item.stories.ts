import { Meta, StoryObj } from '@storybook/angular';
import { BmbLayoutDirective } from './bmb-layout.directive';
import { BmbLayoutItemDirective } from './bmb-layout-item.directive';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../../components/bmb-card/bmb-card.component';
import { attributes } from '../../utils/utils';

const meta: Meta<BmbLayoutItemDirective> = {
  title: 'Components/Containers/Helpers/Layout item',
  component: BmbLayoutItemDirective,
  subcomponents: { BmbLayoutDirective },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        BmbLayoutDirective,
        BmbLayoutItemDirective,
        BmbCardComponent,
        BmbCardContentComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbLayoutDirective, BmbLayoutItemDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbLayoutDirective, BmbLayoutItemDirective ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

This component is used to create a layout for your application. It allows you to define the size of the columns for different screen sizes (mobile and full resolution). You can also set margins for the left and right sides of the columns. The \`isDynamicItem\` property allows you to enable dynamic sizing for the columns, and the \`colGrow\` property sets how much of the flex container positive free space should be assigned to the flex item main size.

The \`colSm\` and \`colLg\` properties determine the size of the columns for mobile and full resolution devices, respectively. The \`marginLeft\` and \`marginRight\` properties set the margin areas on the left and right sides of the columns.

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    colSm: {
      name: 'Column size for mobile devices',
      control: {
        type: 'select',
      },
      options: [0, 1, 2, 3, 4],
      table: {
        type: { summary: 'number' },
        category: 'Properties',
        defaultValue: { summary: '0' },
      },
      description: 'Determines the size of the space between elements.',
    },
    colLg: {
      name: 'Column size for full resolution devices',
      control: {
        type: 'select',
      },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      table: {
        type: { summary: 'number' },
        category: 'Properties',
        defaultValue: { summary: '0' },
      },
      description: 'Determines the size of the space between elements.',
    },
    marginLeft: {
      name: 'Margin left',
      control: 'object',
      table: {
        type: { summary: 'IMargin' },
        category: 'Properties',
        defaultValue: { summary: 'optional' },
      },
      description:
        'Sets the margin area on the left side of an column. The SM value support 3 as top and LG supports 11 as top',
    },
    marginRight: {
      name: 'Margin right',
      control: 'object',
      table: {
        type: { summary: 'IMargin' },
        category: 'Properties',
        defaultValue: { summary: 'optional' },
      },
      description:
        'Sets the margin area on the right side of an column. The SM value support 3 as top and LG supports 11 as top',
    },
    isDynamicItem: {
      name: 'Is dinamyc item',
      control: { type: 'boolean' },
      description:
        'Enable dinamyc size for the column, if you enable this property the colLg and colSm will be disabled',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    colGrow: {
      name: 'Col grow',
      control: 'number',
      description:
        'Sets how much of the flex container positive free space, if any, should be assigned to the flex item main size. (this property will only be enabled when the isDynamicItem property is enabled)',
      table: {
        category: 'Properties',
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
  },
  args: {
    colSm: 1,
    colLg: 1,
    marginLeft: { sm: 0, lg: 0 },
    marginRight: { sm: 0, lg: 0 },
    isDynamicItem: false,
    colGrow: 0,
  },
};

export default meta;

type Story = StoryObj<BmbLayoutItemDirective>;

export const OneItem: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <section bmbLayout>
        <bmb-card bmbLayoutItem margin="none" [colSm]="1" [colLg]="2">
          <bmb-card-content padding="m">
            <span>Column</span>
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colSm]="1" [colLg]="2">
          <bmb-card-content padding="m">
            <span>Column</span>
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" type="primary" ${attributes(args)}>
          <bmb-card-content padding="m">
            <span>Column</span>
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colSm]="1" [colLg]="2">
          <bmb-card-content padding="m">
            <span>Column</span>
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colSm]="1" [colLg]="2">
          <bmb-card-content padding="m">
            <span>Column</span>
          </bmb-card-content>
        </bmb-card>
      </section>
    `,
  }),
};
