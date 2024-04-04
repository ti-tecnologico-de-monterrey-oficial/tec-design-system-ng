import type { Meta, StoryObj } from '@storybook/angular';
import { BmbUserImageComponent } from './bmb-user-image.component';

export default {
  title: 'Micro Componentes/User Image',
  component: BmbUserImageComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbUserImageComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbUserImageComponent ],
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
    image: {
      name: 'Image Source',
      control: {
        type: 'text',
      },
      description:
        'The source of the image to display, either from your application or a URL.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    altImage: {
      name: 'Image Alt Text',
      control: {
        type: 'text',
      },
      description:
        'The alternative text for the image. Refer to https://www.w3.org/WAI/alt/ for more information.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    size: {
      name: 'Size',
      control: {
        type: 'radio',
      },
      options: [
        'desktop-small',
        'desktop-large',
        'mobile-small',
        'mobile-medium',
        'mobile-large',
        'mobile-xlarge',
      ],
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
      description: 'The size of the user image, affecting its visual size.',
    },
    link: {
      name: 'Link',
      control: {
        type: 'text',
      },
      description: 'The link for redirection to another page.',
      table: {
        category: 'Events',
        type: { summary: 'string' },
      },
    },
    target: {
      name: 'Target',
      control: {
        type: 'radio',
      },
      options: ['_blank', '_self', '_parent', '_top'],
      description:
        'The target attribute for the link. Refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a for more information.',
      table: {
        category: 'Events',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    image:
      'https://i0.wp.com/gershenson.mx/wp-content/uploads/2020/08/logo-tec-de-monterrey-e1484853084274.png?ssl=1',
    altImage: 'Alt image description',
    size: 'desktop-small',
    target: '_blank',
    link: 'https://www.youtube.com/',
  },
} as Meta<typeof BmbUserImageComponent>;

type Story = StoryObj<BmbUserImageComponent>;

export const Default: Story = {};
