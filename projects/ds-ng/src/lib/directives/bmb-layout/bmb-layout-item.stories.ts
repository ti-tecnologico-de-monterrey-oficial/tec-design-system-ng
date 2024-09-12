import { Meta, StoryObj } from '@storybook/angular';
import { BmbLayoutDirective } from './bmb-layout.directive';
import { BmbLayoutItemDirective } from './bmb-layout-item.directive';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../../components/bmb-card/bmb-card.component';
import { IMargin } from './bmb-layout-item.directive';
import { InputSignal } from '@angular/core';

const meta: Meta<BmbLayoutItemDirective> = {
  title: 'Micro Componentes/Layout item',
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
        defaultValue: { summary: 0 },
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
        defaultValue: { summary: 0 },
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
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
    },
  },
  args: {
    colSm: 0 as unknown as InputSignal<number>,
    colLg: 0 as unknown as InputSignal<number>,
    marginLeft: { sm: 0, lg: 0 } as unknown as InputSignal<IMargin>,
    marginRight: { sm: 0, lg: 0 } as unknown as InputSignal<IMargin>,
    isDynamicItem: false as unknown as InputSignal<boolean>,
    colGrow: 0 as unknown as InputSignal<number>,
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
        <bmb-card
          bmbLayoutItem
          [colSm]="colSm"
          [colLg]="colLg"
          [marginLeft]="marginLeft"
          [marginRight]="marginRight"
          [isDynamicItem]="isDynamicItem"
          [colGrow]="colGrow"
        >
          <bmb-card-content padding="none">
            <p [ngStyle]="{padding: '1rem'}">Element</p>
          </bmb-card-content>
        </bmb-card>
      </section>
    `,
  }),
};
