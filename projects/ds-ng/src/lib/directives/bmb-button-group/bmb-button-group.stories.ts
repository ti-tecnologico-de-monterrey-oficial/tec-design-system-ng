import { Meta, StoryFn } from '@storybook/angular';
import { BmbButtonGroupDirective } from './bmb-button-group.directive';

export default {
  title: 'Micro Componentes/Button group',
  component: BmbButtonGroupDirective,
  imports: [BmbButtonGroupDirective],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbButtonGroupDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbButtonGroupDirective ],
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
    appearance: {
      name: 'Appearance',
      control: { type: 'select' },
      options: [
        'primary',
        'secondary-filled',
        'secondary-outlined',
        'destructive',
      ],
      description: 'The appearance of the buttons, affecting its visual style.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'primary' },
        type: { summary: 'string' },
      },
    },
    size: {
      name: 'Size',
      control: 'radio',
      options: ['small', 'large'],
      table: {
        category: 'Properties',
        defaultValue: { summary: 'small' },
        type: { summary: 'string' },
      },
      description: 'The size of the button, affecting its visual size.',
    },
  },
  args: {
    appearance: 'primary',
    size: 'small',
  },
} as Meta<typeof BmbButtonGroupDirective>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `<button bmbButtonGroup [appearance]="appearance" [size]="size">
    <button>Button 1</button>
    <button>Button 2</button>
    <button>Button 3</button>
  </button>`,
});

export const Default = customizable();
