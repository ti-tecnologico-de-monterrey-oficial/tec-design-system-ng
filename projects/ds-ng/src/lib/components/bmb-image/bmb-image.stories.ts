import type { Meta, StoryObj } from '@storybook/angular';
import { BmbImageComponent } from './bmb-image.component';

export default {
  title: 'Micro Componentes/Image',
  component: BmbImageComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbImageComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbImageComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

## Architecture

\`\`\`html
<section class="bmb_badge"> <!-- conditional classes bmb_badge-{appearance} bmb_badge-container ->
  <span class="bmb_badge-bullet"></span>
  <span class="bmb_badge-content"></span>
</section>
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    src: {
      name: 'Image source URL',
      control: {
        type: 'text',
      },
      description: 'Set the Hi-res image source URL',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    mobileSrc: {
      name: 'Mobile image source URL',
      control: {
        type: 'text',
      },
      description: 'Set the low-res image source URL',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    alt: {
      name: 'Alternative text',
      control: {
        type: 'text',
      },
      description: 'Set a description for the images',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    width: {
      name: 'Width',
      control: {
        type: 'text',
      },
      description: 'You can set any CSS valid value for the width style',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '100%' },
      },
    },
    ratio: {
      name: 'Ratio',
      control: {
        type: 'text',
      },
      description:
        'Allow to the developer change the aspect ratio of the image',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    borderRadius: {
      name: 'Border radius',
      control: {
        type: 'select',
      },
      options: ['xs', 's', 'm', 'l', 'xl', 'none'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
      description: 'Determines the corner radius size',
    },
    loading: {
      name: 'Loading',
      control: {
        type: 'radio',
      },
      options: ['lazy', 'eager'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'lazy' },
      },
      description:
        'Configure the loading behavior, if you set "eager", the browser will load the image immediately, if you set "lazy", the browser will wait until the viewport is close to the image to load it.',
    },
    enableZoom: {
      name: 'Enable Zoom',
      control: { type: 'boolean' },
      description:
        'When set to true, it groups multiple interactive icons into a parent element. By default, it is false, and you do not need to explicitly set it. The badge should always have a parent element.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    isBlurredBackdrop: {
      name: 'Is blurred backdrop',
      control: { type: 'boolean' },
      description: 'Set a blurred imageset blurred image as box shadow.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    src: 'https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg',
    mobileSrc:
      'https://2.bp.blogspot.com/-YkNDZEbKt_g/TYzcbF2_tkI/AAAAAAAAalk/Vt_MHS60Xv8/s1600/www.JoseLuisAvilaHerrera.BLOGSPOT.com%2B-%2BFunny%2BCats%2B-%2BGatitos%2Bmuy%2Btiernos%2B8.jpg',
    alt: 'Fruits',
    width: 'clamp(200px, 100%, calc(50vw - 3rem))',
    ratio: '1/1',
    borderRadius: 'm',
    loading: 'lazy',
    enableZoom: false,
    isBlurredBackdrop: false,
  },
} as Meta<typeof BmbImageComponent>;

type Story = StoryObj<BmbImageComponent>;

export const Default: Story = {};
