import { Meta, StoryObj } from '@storybook/angular';
import { BmbLayoutDirective } from './bmb-layout.directive';
import { BmbLayoutItemDirective } from './bmb-layout-item.directive';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../../components/bmb-card/bmb-card.component';

const meta: Meta<BmbLayoutDirective> = {
  title: 'Micro Componentes/Layout',
  component: BmbLayoutDirective,
  subcomponents: { BmbLayoutItemDirective },
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
    // @Input() gapSise: SizeNames = 'm';
    // @Input() margin: SizeNames = 'm';
    // @Input() dinamycCols: boolean = false;

    gapSise: {
      name: 'Gap size',
      control: {
        type: 'select',
      },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
      description: 'Determines the size of the space between elements.',
    },
    margin: {
      name: 'Margin',
      control: {
        type: 'select',
      },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
      description: 'Set the margin size',
    },
    dinamycCols: {
      name: 'Enable dinamyc cols',
      control: { type: 'boolean' },
      description: 'This property enable the dinamic size for bmbLayoutItem',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    gapSise: 'm',
    margin: 'm',
    dinamycCols: false,
  },
};

export default meta;

type Story = StoryObj<BmbLayoutDirective>;

export const OneItem: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <section bmbLayout [gapSise]="gapSise" [margin]="margin">
        <bmb-card bmbLayoutItem margin="none" [colSm]="2" [colLg]="4">
          <bmb-card-content padding="none">
            <p [ngStyle]="{padding: '1rem'}">Element</p>
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colSm]="2" [colLg]="4">
          <bmb-card-content padding="none">
            <p [ngStyle]="{padding: '1rem'}">Element</p>
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [isDinamycItem]="true" [colGrow]="1">
          <bmb-card-content padding="none">
            <p [ngStyle]="{padding: '1rem'}">Element</p>
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [isDinamycItem]="true">
          <bmb-card-content padding="none">
            <p [ngStyle]="{padding: '1rem'}">Element</p>
          </bmb-card-content>
        </bmb-card>
      </section>
    `,
  }),
};
