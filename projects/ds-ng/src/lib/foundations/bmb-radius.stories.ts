import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbDividerComponent } from '../components/bmb-divider/bmb-divider.component';

@Component({
  standalone: true,
  selector: 'bmb-radius-playground',
  imports: [CommonModule, BmbDividerComponent],
  template: `
    <div
      [ngStyle]="{ borderRadius: 'var(--bmb-radius-' + radius() + ')' }"
      style="border: var(--bmb-border-general_contrasts-50-1-solid); padding: 1rem; text-align: center;"
    >
      <button (click)="handleClick('--bmb-radius-' + radius())">
        CSS variable name: <strong>--bmb-radius-{{ radius() }}</strong>
      </button>
      <bmb-divider />
      <button>
        Class name: <strong>bmb_radius-{{ radius() }}</strong>
      </button>
    </div>
  `,
})
class BmbRadiusPlaygroundComponent {
  radius = input<string>('');

  handleClick(text: string) {
    window.navigator.clipboard.writeText(text);
    window.alert('Color copied to clipboard: ' + text);
  }
}

export default {
  title: 'Foundations/Radius',
  component: BmbRadiusPlaygroundComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BmbDividerComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `This is a collection of border radius styles that can be used in the application. The border radius is defined in the CSS variables and can be used in the application by using the class name or the CSS variable name.

## Class Name

The class name is defined as \`bmb_radius-{radius}\` where {radius} is the radius size, and also set the variable \`--bmb-radius\` for the child elements.

\`\`\`
<div style="border: var(--bmb-border-general_contrasts-50-1-solid);" class="bmb-radius-m">
  <div style="border-radius: var(--bmb-radius);">
    The child element has access to the border radius of the parent element's size through the variable --bmb-radius.
  </div>
</div>
\`\`\`

## CSS Variable

The CSS variable name is defined as \`--bmb-radius-{radius}\` where {radius} is the radius size.

\`\`\`
<div style="border: var(--bmb-border-general_contrasts-50-1-solid); border-radius: var(--bmb-radius-4)">
  Content with border radius applied using CSS variables.
</div>
\`\`\`

## Values

The radius size are defined on REM units, and can be used in the application by using the class name or the CSS variable name. The radius size can be one of the following:

- none: 0px
- xxs: ≈2px
- xs: ≈4px
- s: ≈8px
- m: ≈16px
- l: ≈24px
- xl: ≈32px
- xxl: ≈64px
- auto: auto
- full: 50%
- 0: 0px
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
- 12: ≈48px
- 16: ≈64px
- 20: ≈80px
- 24: ≈96px
`,
      },
    },
  },
  argTypes: {
    radius: {
      name: 'Radius',
      control: { type: 'select' },
      options: [
        'none',
        'xxs',
        'xs',
        's',
        'm',
        'l',
        'xl',
        'xxl',
        'auto',
        'full',
        '0',
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
        '12',
        '16',
      ],
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
  },
  args: {
    radius: 'none',
  },
} as Meta<typeof BmbRadiusPlaygroundComponent>;

type Story = StoryObj<typeof BmbRadiusPlaygroundComponent>;

export const Default: Story = {};
