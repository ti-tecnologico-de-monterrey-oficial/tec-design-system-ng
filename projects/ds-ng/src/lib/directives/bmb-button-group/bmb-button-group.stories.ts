import { Meta, StoryFn, StoryObj } from '@storybook/angular';
import { BmbButtonGroupDirective } from './bmb-button-group.directive';
import { storiesLayoutHorizontal } from '../../utils/bambooLayout';
import { attributes } from '../../utils/utils';

export default {
  title: 'Components/Buttons/Button group',
  component: BmbButtonGroupDirective,
  decorators: [storiesLayoutHorizontal],
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
        'transparent',
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

type Story = StoryObj<typeof BmbButtonGroupDirective>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
  <section bmbButtonGroup [appearance]="appearance" [size]="size">
    <!-- IMPORTANT
    You can add the class bmb_btn-toggle-active to set a button as active and keep that state of active,
    otherwise the button will just behave as a simple button without keeping the activated state.
    The styles of the buttons group are defined by Bamboo and will be adjusted according to the appearance
    of the component.
    -->
    <button class="bmb_btn-toggle-active">Button 1</button>
    <button>Button 2</button>
    <button>Button 3</button>
  </section>`,
});

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: args,
    template: `
    <section bmbButtonGroup ${attributes(args)}>
    <!-- IMPORTANT
    You can add the class bmb_btn-toggle-active to set a button as active and keep that state of active,
    otherwise the button will just behave as a simple button without keeping the activated state.
    The styles of the buttons group are defined by Bamboo and will be adjusted according to the appearance
    of the component.
    -->
    <button class="bmb_btn-toggle-active">Button 1</button>
    <button>Button 2</button>
    <button>Button 3</button>
  </section>
  `,
  }),
};
