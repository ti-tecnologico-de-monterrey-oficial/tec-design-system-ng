import { Meta, StoryObj } from '@storybook/angular';
import { BmbIconComponent } from './bmb-icon.component';
import { storiesLayoutHorizontal } from '../../utils/bambooLayout';

export default {
  title: 'Micro Componentes/Icon',
  component: BmbIconComponent,
  decorators: [
    storiesLayoutHorizontal,
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbIconComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class Component {}
\`\`\`

## Architecture

\`\`\`html
<i class="bmb_icon-container-i material-symbols-rounded">
  < icon />
</i>
\`\`\`

Below is an example of how you can use this component in HTML:
\`\`\`html
<bmb-icon icon="home" styleIcon="material-symbols-rounded" [size]="24"></bmb-icon>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons. The color of the icon depends on the parent. You can also place an image here.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    styleIcon: {
      name: 'Style Icon',
      control: { type: 'radio' },
      options: ['material-symbols-rounded'],
      description: `
    ### Available Icon Styles

    - **Rounded**
      - **Description:** Icons with rounded edges. They feel softer and more friendly.
      - **Visual Features:** Rounded corners. The design is more approachable and less technical.
      - **Class Name:** \`material-symbols-rounded\`
    `,
      table: {
        category: 'Deprecated',
        defaultValue: { summary: 'material-symbols-rounded' },
        type: { summary: 'string' },
      },
    },
    isFill: {
      name: 'Is Fill',
      control: { type: 'boolean' },
      description:
        'Determines whether the icon is filled (`true`) or outlined (`false`).',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    materialIcon: {
      name: 'Material Icon',
      description: 'Deprecated',
      table: {
        category: 'Deprecated',
      },
    },
    fontWeight: {
      name: 'Font Weight',
      control: { type: 'text' },
      description:
        'Specifies the weight of the font. Common values are `400` (normal) or `700` (bold).',
      table: {
        category: 'Properties',
        defaultValue: { summary: '400' },
        type: { summary: 'string' },
      },
    },
    size: {
      name: 'Size',
      control: { type: 'number' },
      description:
        'Size of the icon or width of the image to use. Note: <= 0 will be inherited.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    dotNotification: {
      name: 'Dot Notification',
      control: { type: 'number' },
      description:
        'Set a dot with the number of notifications in the bottom right of the icon.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    alt: {
      name: 'Alt',
      control: { type: 'text' },
      description:
        'Alternative text for the icon when it is an image. This improves accessibility.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '""' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    icon: 'home',
    styleIcon: 'material-symbols-rounded',
    isFill: true,
    fontWeight: '400',
    size: 24,
    dotNotification: 0,
    alt: 'Default alt text for image',
  },
} as Meta<typeof BmbIconComponent>;

type Story = StoryObj<BmbIconComponent>;

export const Default: Story = {};
