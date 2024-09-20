import { Meta, StoryObj } from '@storybook/angular';
import {
  BmbLayoutDirective,
  IAlignItemsOptions,
  IJustifyOptions,
} from './bmb-layout.directive';
import { BmbLayoutItemDirective } from './bmb-layout-item.directive';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../../components/bmb-card/bmb-card.component';
import { InputSignal } from '@angular/core';
import { SizeNames } from '../../types';

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
    gapSize: {
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
    dynamicCols: {
      name: 'Enable dinamyc cols',
      control: { type: 'boolean' },
      description: 'This property enable the dinamic size for bmbLayoutItem',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    justify: {
      name: 'Justify content',
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
        defaultValue: { summary: 'start' },
      },
      description: 'Set the justify content.',
    },
    alignItems: {
      name: 'Align items',
      control: {
        type: 'select',
      },
      options: ['center', 'end', 'start', 'stretch'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'start' },
      },
      description: 'Set the align items.',
    },
  },
  args: {
    gapSize: 'm' as unknown as InputSignal<SizeNames>,
    margin: 'm' as unknown as InputSignal<SizeNames>,
    dynamicCols: false as unknown as InputSignal<boolean>,
    justify: 'start' as unknown as InputSignal<IJustifyOptions>,
    alignItems: 'start' as unknown as InputSignal<IAlignItemsOptions>,
  },
};

export default meta;

type Story = StoryObj<BmbLayoutDirective>;

export const OneItem: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <section bmbLayout [gapSize]="gapSize" [margin]="margin" [justify]="justify" [alignItems]="alignItems">
        <bmb-card bmbLayoutItem margin="none" [colLg]="4">
          <bmb-card-content padding="none">
            <p [ngStyle]="{padding: '1rem'}">Element</p>
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colLg]="4">
          <bmb-card-content padding="none">
            <p [ngStyle]="{padding: '1rem'}">Element</p>
          </bmb-card-content>
        </bmb-card>
        <bmb-card bmbLayoutItem margin="none" [colGrow]="12">
          <bmb-card-content padding="none">
            <p [ngStyle]="{padding: '1rem'}">Element</p>
            <p [ngStyle]="{padding: '1rem'}">Element</p>
            <p [ngStyle]="{padding: '1rem'}">Element</p>
          </bmb-card-content>
        </bmb-card>
      </section>
    `,
  }),
};
