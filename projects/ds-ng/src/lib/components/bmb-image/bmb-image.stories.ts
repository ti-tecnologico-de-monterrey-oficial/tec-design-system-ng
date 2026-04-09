import type { Meta, StoryObj } from '@storybook/angular';
import { BmbImageComponent } from './bmb-image.component';
import {
  DESIGN_SYSTEM_TITLE,
  getArchitectureSection,
  getBasicExampleBlock,
  getGeneralDescription,
} from '../../utils/doc/utils';
import { DBmbImageParamDesc } from '../../utils/doc/parameterDescriptions';
import { BmbImageItem } from './types';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'storybook-bmb-image-signal-host',
  standalone: true,
  imports: [BmbImageComponent],
  template: `
    <bmb-image
      [images]="images()"
      alt="Dynamic images example"
      [width]="'clamp(200px, 100%, calc(50dvw - 3rem))'"
      [ratio]="'1/1'"
      (imageClick)="handleImageClick($event)"
    />
  `,
})
class StorybookBmbImageSignalHostComponent {
  images = signal<BmbImageItem[]>([]);

  constructor() {
    setTimeout(() => {
      this.images.set([
        {
          src: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d',
          alt: 'Image 1',
        },
        {
          src: 'https://images.unsplash.com/photo-1507149833265-60c372daea22',
          alt: 'Image 2',
        },
      ]);
    }, 2000);
  }

  handleImageClick(event: { img: BmbImageItem; index: number }) {
    console.log('Image clicked', event);
  }
}

export default {
  title: 'Components/Images/Image',
  component: BmbImageComponent,
  parameters: {
    docs: {
      controls: { exclude: ['getClasses'] },
      description: {
        component: `
${getGeneralDescription(
  `\`bmb-media-card\` is a ${DESIGN_SYSTEM_TITLE} component that displays an image with configurable properties.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/componentes/image/descripcion-general-1o8OTusS',
  },
)}
${getArchitectureSection(`<section class="bmb_image"> <!-- Conditional classes and tyles based on radius and width inputs ->
  <figure class="bmb_image-figure">
    <picture>
      <source />
      <img class="bmb_image-figure-image" />
    </picture>
  </figure>
</section>`)}
${getBasicExampleBlock('BmbImageComponent')}
        `,
      },
    },
  },
  argTypes: {
    autoplay: DBmbImageParamDesc.autoplay,
    autoplayInterval: DBmbImageParamDesc.autoplayInterval,
    src: DBmbImageParamDesc.src,
    mobileSrc: DBmbImageParamDesc.mobileSrc,
    alt: DBmbImageParamDesc.alt,
    width: DBmbImageParamDesc.width,
    ratio: DBmbImageParamDesc.ratio,
    borderRadius: DBmbImageParamDesc.borderRadius,
    loading: DBmbImageParamDesc.loading,
    enableZoom: DBmbImageParamDesc.enableZoom,
    isBlurredBackdrop: DBmbImageParamDesc.isBlurredBackdrop,
    images: DBmbImageParamDesc.images,
    animation: DBmbImageParamDesc.animation,
    imageClick: {
      control: null,
      description: 'Event emitted when an image is clicked.',
      table: {
        type: { summary: 'EventEmitter<{ img: BmbImageItem; index: number }>' },
      },
    },
    callbackParams: {
      control: null,
      description: 'Additional parameters to emit with the imageClick event.',
      table: {
        type: { summary: 'any' },
      },
    },
  },
  args: {
    src: 'https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg',
    mobileSrc:
      'https://2.bp.blogspot.com/-YkNDZEbKt_g/TYzcbF2_tkI/AAAAAAAAalk/Vt_MHS60Xv8/s1600/www.JoseLuisAvilaHerrera.BLOGSPOT.com%2B-%2BFunny%2BCats%2B-%2BGatitos%2Bmuy%2Btiernos%2B8.jpg',
    alt: 'Fruits',
    width: 'clamp(200px, 100%, calc(50dvw - 3rem))',
    ratio: '1/1',
    borderRadius: 'm',
    loading: 'lazy',
    enableZoom: false,
    isBlurredBackdrop: false,
    imageClick: (event: { img: BmbImageItem; index: number }) => {
      console.log('Image clicked', event);
    },
  },
} as Meta<typeof BmbImageComponent>;

type Story = StoryObj<BmbImageComponent>;

export const Default: Story = {};

export const Carousel: Story = {
  name: 'Carousel',
  args: {
    images: [
      {
        src: 'https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg',
        mobileSrc:
          'https://2.bp.blogspot.com/-YkNDZEbKt_g/TYzcbF2_tkI/AAAAAAAAalk/Vt_MHS60Xv8/s1600/www.JoseLuisAvilaHerrera.BLOGSPOT.com%2B-%2BFunny%2BCats%2B-%2BGatitos%2Bmuy%2Btiernos%2B8.jpg',
        alt: 'Image 1',
      },
      {
        src: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d',
        mobileSrc:
          'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=60',
        alt: 'Image 2',
      },
      {
        src: 'https://images.unsplash.com/photo-1507149833265-60c372daea22',
        alt: 'Image 3',
      },
    ],
  },
};

export const ClickEvent: Story = {
  name: 'Carousel - Click event',
  args: {
    images: [
      {
        src: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d',
        alt: 'Image 1',
      },
      {
        src: 'https://images.unsplash.com/photo-1507149833265-60c372daea22',
        alt: 'Image 2',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Clicking on an image should emit the `imageClick` event so consumers can implement custom logic. In this example, the event is logged to the console.',
      },
    },
  },
};

export const CarouselAutoplay: Story = {
  name: 'Carousel - Autoplay',
  args: {
    autoplay: true,
    autoplayInterval: 2000,
    images: [
      {
        src: 'https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg',
        alt: 'Image 1',
      },
      {
        src: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d',
        alt: 'Image 2',
      },
      {
        src: 'https://images.unsplash.com/photo-1507149833265-60c372daea22',
        alt: 'Image 3',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'The carousel automatically transitions between images using the autoplay feature.',
      },
    },
  },
};

export const DynamicImagesWithSignal: Story = {
  name: 'Carousel - Dynamic images with signal',
  render: () => ({
    moduleMetadata: {
      imports: [StorybookBmbImageSignalHostComponent],
    },
    template: `<storybook-bmb-image-signal-host></storybook-bmb-image-signal-host>`,
  }),
  parameters: {
    docs: {
      description: {
        story: `
Example showing how **bmb-image** can receive images from an Angular **signal**.

### HTML

\`\`\`html
<bmb-image
  [images]="images()"
  alt="Dynamic images example"
  ratio="1/1"
  borderRadius="m"
  (imageClick)="handleImageClick($event)"
></bmb-image>
\`\`\`

### TypeScript

\`\`\`ts
import { signal } from '@angular/core';
import { BmbImageItem } from './types';

images = signal<BmbImageItem[]>([]);

constructor() {
  setTimeout(() => {
    this.images.set([
      {
        src: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d',
        alt: 'Image 1'
      },
      {
        src: 'https://images.unsplash.com/photo-1507149833265-60c372daea22',
        alt: 'Image 2'
      }
    ]);
  }, 2000);
}

handleImageClick(event: { img: BmbImageItem; index: number }) {
  console.log('Image clicked', event);
}
\`\`\`
        `,
      },
    },
  },
};

export const CarouselFade: Story = {
  name: 'Carousel - Fade animation',
  args: {
    animation: 'fade',
    images: Carousel.args?.images,
  },
};

export const CarouselParallax: Story = {
  name: 'Carousel - Parallax animation',
  args: {
    animation: 'parallax',
    images: Carousel.args?.images,
  },
};

export const CarouselParallaxFade: Story = {
  name: 'Carousel - Parallax + Fade animation',
  args: {
    animation: 'parallax-fade',
    images: Carousel.args?.images,
  },
};
