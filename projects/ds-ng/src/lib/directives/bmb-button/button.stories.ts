import { Meta, StoryFn } from '@storybook/angular';
import { BmbButtonDirective } from './button.directive';
import { BmbIconComponent } from '../../components/bmb-icon/bmb-icon.component';
import { attributes, attributesText } from '../../utils/utils';

export default {
  title: 'Micro Componentes/Button',
  component: BmbButtonDirective,
  imports: [BmbButtonDirective, BmbIconComponent],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbButtonDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbButtonDirective ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

## Architecture

\`\`\`HTML
<button class="bmb_btn-{appearance} bmb_btn-rounded">
  <!-- if icon is defined -->
  < icon content >

  {content}
</section>
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
      description:
        'Sets the appearance of the button, affecting its visual style.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'primary' },
        type: { summary: 'string' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Sets the name of the icon to use. Please use Material icons: https://fonts.google.com/icons. Do not use the image property if you want to use an icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    iconSize: {
      name: 'Icon size',
      control: { type: 'number' },
      description:
        'Sets size of the icon to use. Note: <= 0 will be inherited. Icon size is only recommended when no text or content is added.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    size: {
      name: 'Size',
      control: 'radio',
      options: ['small', 'large', 'micro'],
      table: {
        category: 'Properties',
        defaultValue: { summary: 'small' },
        type: { summary: 'string' },
      },
      description: 'Sets the size of the button, affecting its visual size.',
    },
    position: {
      name: 'Position',
      control: 'radio',
      options: ['left', 'right'],
      table: {
        category: 'Properties',
        defaultValue: { summary: 'left' },
        type: { summary: 'string' },
      },
      description: 'Sets the position of the icon.',
    },
    case: {
      name: 'Case',
      control: { type: 'boolean' },
      description:
        'Sets the icon at the end of the button, away from the text. Only visible when the button size is large.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    test_text: {
      name: 'Text',
      description: 'Button content example.',
      table: {
        category: 'Example',
        type: { summary: 'string' },
      },
    },
    isToggleActive: {
      name: 'Is toggle active',
      control: { type: 'boolean' },
      description: 'This is the active button state',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    enableButtonToggle: {
      name: 'Enable button toggle',
      control: { type: 'boolean' },
      description: 'This property enable the active button state',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    isRounded: {
      name: 'Is rounded',
      control: { type: 'boolean' },
      description:
        'This property is deprecated and will be removed in future versions.',
      table: {
        category: 'deprecated',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    isMobile: {
      name: 'Is mobile',
      control: { type: 'boolean' },
      description:
        'This property enables the mobile button state, which is a rounded button and width is 100%.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    appearance: 'primary',
    icon: 'home',
    iconSize: 0,
    size: 'small',
    position: 'left',
    case: false,
    test_text: 'Button text',
    isToggleActive: false,
    enableButtonToggle: false,
    isRounded: false,
    isMobile: false,
  },
} as Meta<typeof BmbButtonDirective>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
    <button
      bmbButton
      ${attributes(args)}
    >
      ${attributesText(args)}
    </button>`,
});

export const Default = customizable();
