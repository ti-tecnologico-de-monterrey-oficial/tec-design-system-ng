import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbDividerComponent } from '../components/bmb-divider/bmb-divider.component';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../components/bmb-card/bmb-card.component';

@Component({
  standalone: true,
  selector: 'bmb-spacing-playground',
  imports: [
    CommonModule,
    BmbDividerComponent,
    BmbCardComponent,
    BmbCardContentComponent,
  ],
  template: `
    <div
      [ngStyle]="{
        padding: 'var(--bmb-padding-' + padding() + ')',
        margin: 'var(--bmb-margin-' + margin() + ')',
        gap: 'var(--bmb-gap-' + gap() + ')',
      }"
      style="border: var(--bmb-border-general_contrasts-50-1-solid); text-align: center; display: flex; flex-wrap: wrap;"
    >
      <bmb-card margin="none">
        <bmb-card-content padding="m">
          <button style="color: var(--general_contrasts-100);" (click)="handleClick('--bmb-padding-' + padding())">
            CSS variable name: <strong>--bmb-padding-{{ padding() }}</strong>
          </button>
          <bmb-divider />
          <button style="color: var(--general_contrasts-100);" (click)="handleClick('bmb_padding-' + padding())">
            Class name: <strong>bmb_padding-{{ padding() }}</strong>
          </button>
        </bmb-card-content>
      </bmb-card>

      <bmb-card margin="none">
        <bmb-card-content padding="m">
          <button style="color: var(--general_contrasts-100);" (click)="handleClick('--bmb-gap-' + gap())">
            CSS variable name: <strong>--bmb-gap-{{ gap() }}</strong>
          </button>
          <bmb-divider />
          <button style="color: var(--general_contrasts-100);" (click)="handleClick('bmb_gap-' + gap())">
            Class name: <strong>bmb_gap-{{ gap() }}</strong>
          </button>
        </bmb-card-content>
      </bmb-card>

      <bmb-card margin="none">
        <bmb-card-content padding="m">
          <button style="color: var(--general_contrasts-100);" (click)="handleClick('--bmb-margin-' + margin())">
            CSS variable name: <strong>--bmb-margin-{{ margin() }}</strong>
          </button>
          <bmb-divider />
          <button style="color: var(--general_contrasts-100);" (click)="handleClick('bmb_margin-' + margin())">
            Class name: <strong>bmb_margin-{{ margin() }}</strong>
          </button>
        </bmb-card-content>
      </bmb-card>
    </div>
  `,
})
class BmbSpacingPlaygroundComponent {
  padding = input<string>('');
  margin = input<string>('');
  gap = input<string>('');

  handleClick(text: string) {
    window.navigator.clipboard.writeText(text);
    window.alert('Color copied to clipboard: ' + text);
  }
}

const options = [
  'none',
  'xxs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  'xxl',
  'auto',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
];

export default {
  title: 'Foundations/Spacing',
  component: BmbSpacingPlaygroundComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BmbDividerComponent,
        BmbCardComponent,
        BmbCardContentComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `This is a collection of spacing styles that can be used in the application. The spacing is defined in the CSS variables and can be used in the application by using the class name or the CSS variable name.

## Class Name
The class name is defined as \`bmb_padding-{padding}\`, \`bmb_margin-{margin}\`, and \`bmb_gap-{gap}\` where {padding}, {margin}, and {gap} are the spacing size, and also set the variable \`--bmb-padding\`, \`--bmb-margin\`, and \`--bmb-gap\` for the child elements.

\`\`\`
<div style="border: var(--bmb-border-general_contrasts-50-1-solid);" class="bmb_padding-4 bmb_margin-4 bmb_gap-4">
  <div style="padding: var(--bmb-padding); margin: var(--bmb-margin); gap: var(--bmb-gap);">
    The child element has access to the padding, margin, and gap of the parent element's size through the variables --bmb-padding, --bmb-margin, and --bmb-gap.
  </div>
</div>
\`\`\`

## CSS Variable
The CSS variable name is defined as \`--bmb-padding-{padding}\`, \`--bmb-margin-{margin}\`, and \`--bmb-gap-{gap}\` where {padding}, {margin}, and {gap} are the spacing size.

\`\`\`
<div style="padding: var(--bmb-padding-4); margin: var(--bmb-margin-4); gap: var(--bmb-gap-4);">
  Content with padding, margin, and gap applied using CSS variables.
</div>
\`\`\`

## Values

The spacing size are defined on REM units, and can be used in the application by using the class name or the CSS variable name. The spacing size can be one of the following:

- none: 0px
- xxs: ≈2px
- xs: ≈4px
- s: ≈8px
- m: ≈16px
- l: ≈24px
- xl: ≈32px
- xxl: ≈64px
- auto: auto
- 1: ≈4px
- 2: ≈8px
- 3: ≈12px
- 4: ≈16px
- 5: ≈20px
- 6: ≈24px
- 7: ≈28px
- 8: ≈32px
- 9: ≈36px
- 10: ≈40px

**You should be careful when using the spacing**, as they can affect Bamboo components. Some components may override this attribute, so check the component's documentation before applying the spacing class.
`,
      },
    },
  },
  argTypes: {
    padding: {
      name: 'Padding',
      description: 'The spacing size to use.',
      control: { type: 'select' },
      options: options,
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '1' },
      },
    },
    margin: {
      name: 'Margin',
      description: 'The spacing size to use.',
      control: { type: 'select' },
      options: options,
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '1' },
      },
    },
    gap: {
      name: 'Gap',
      description: 'The spacing size to use.',
      control: { type: 'select' },
      options: options,
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '1' },
      },
    },
  },
  args: {
    padding: '1',
    margin: '1',
    gap: '1',
  },
} as Meta<typeof BmbSpacingPlaygroundComponent>;

type Story = StoryObj<typeof BmbSpacingPlaygroundComponent>;

export const Default = {};
