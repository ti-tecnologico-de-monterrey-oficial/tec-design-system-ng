import type { Meta, StoryObj } from '@storybook/angular';
import { BmbImageComponent } from './bmb-image.component';
import {
  DESIGN_SYSTEM_TITLE,
  getArchitectureSection,
  getBasicExampleBlock,
  getGeneralDescription,
} from '@docs/utils/utils';
import {
  DBmbIconParamDesc,
  DBmbImageParamDesc,
} from '@docs/utils/parameterDescriptions';
import type { BmbImageItem } from '../../_shared/types/components/image';
import { Component, signal } from '@angular/core';

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

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
          src: './assets/doc/bmb-image/photo-1.svg',
          alt: 'Image 1',
        },
        {
          src: './assets/doc/bmb-image/photo-2.svg',
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
      controls: {
        exclude: [
          'getClasses',
          'currentIndex',
          'isCarousel',
          'carouselClass',
          'encodedURL',
          'imageClick',
          'autoplayTimer',
          'currentImage',
          'getImageStyle',
          'handleImageClick',
          'handleImageNotFoundError',
          'next',
          'ngOnDestroy',
          'prev',
        ],
      },
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
    borderRadius: {
      ...DBmbImageParamDesc.borderRadius,
      control: 'object',
      description:
        'Sets the border radius for all corners or configures each corner individually.',
      table: {
        ...DBmbImageParamDesc.borderRadius.table,
        type: { summary: 'SizeNames | IBmbImageBorderRadius' },
      },
    },
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
    imageNotFoundError: DBmbIconParamDesc.imageNotFoundError,
    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
      description:
        'CSS object-fit value to control how the image fits within its container.',
      table: {
        type: { summary: 'IBmbImageObjectFit' },
        defaultValue: { summary: 'cover' },
        category: 'Properties',
      },
    },
    callbackParams: {
      control: null,
      description: 'Additional parameters to emit with the imageClick event.',
      table: {
        type: { summary: 'any' },
        category: 'Properties',
      },
    },
    minHeight: {
      control: null,
      description:
        'Object specifying minimum heights for small and large screens, used for carousel mode.',
      table: {
        type: { summary: 'IBmbImageHeight' },
        defaultValue: { summary: '{ s: "auto", l: "auto" }' },
        category: 'Properties',
      },
    },
    avoidEncoding: {
      control: 'boolean',
      description: 'If true, the image URLs will not be encoded.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Properties',
      },
    },
    enableCursorPointer: {
      control: 'boolean',
      description:
        'If true, the cursor will be a pointer when hovering over the image, this property only affects the cursor style and do not apply if the carousel is enabled. Note that this does not affect the actual click behavior, which is determined by whether there are listeners for the imageClick event.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Properties',
      },
    },
    hasBackdrop: {
      control: 'boolean',
      description: 'If true, a backdrop will be displayed behind the image.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Properties',
      },
    },
  },
  args: {
    src: './assets/doc/bmb-image/photo-fruits.svg',
    mobileSrc: './assets/doc/bmb-image/photo-cats.svg',
    alt: 'Fruits',
    width: 'clamp(200px, 100%, calc(50dvw - 3rem))',
    ratio: '1/1',
    borderRadius: 'm',
    loading: 'lazy',
    enableZoom: false,
    imageClick: (event: { img: BmbImageItem; index: number }) => {
      console.log('Image clicked', event);
    },
    objectFit: 'cover',
    avoidEncoding: false,
    enableCursorPointer: false,
    hasBackdrop: false,
  },
} as Meta<typeof BmbImageComponent>;

type Story = StoryObj<BmbImageComponent>;

export const Default: Story = {};

export const Carousel: Story = {
  name: 'Carousel',
  args: {
    images: [
      {
        src: './assets/doc/bmb-image/photo-fruits.svg',
        mobileSrc: './assets/doc/bmb-image/photo-cats.svg',
        alt: 'Image 1',
      },
      {
        src: './assets/doc/bmb-image/photo-1.svg',
        mobileSrc: './assets/doc/bmb-image/photo-1.svg',
        alt: 'Image 2',
      },
      {
        src: './assets/doc/bmb-image/photo-2.svg',
        alt: 'Image 3',
      },
    ],
  },
};

export const CarouselTopCornersSquare: Story = {
  name: 'Carousel - Square top corners',
  args: {
    images: Carousel.args?.images,
    borderRadius: {
      topLeft: '0',
      topRight: '0',
      bottomRight: 'm',
      bottomLeft: 'm',
    },
  },
  parameters: {
    docs: {
      description: {
        story: `Use an object to configure the radius of each corner independently.
\`\`\`ts
borderRadius = {
  topLeft: '0',
  topRight: '0',
  bottomRight: 'm',
  bottomLeft: 'm',
};
\`\`\`

The string shorthand (for example, \`borderRadius="m"\`) remains available when all corners should use the same radius.`,
      },
    },
  },
};

export const ClickEvent: Story = {
  name: 'Carousel - Click event',
  args: {
    images: [
      {
        src: './assets/doc/bmb-image/photo-1.svg',
        alt: 'Image 1',
      },
      {
        src: './assets/doc/bmb-image/photo-2.svg',
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
        src: './assets/doc/bmb-image/photo-fruits.svg',
        alt: 'Image 1',
      },
      {
        src: './assets/doc/bmb-image/photo-1.svg',
        alt: 'Image 2',
      },
      {
        src: './assets/doc/bmb-image/photo-2.svg',
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
        src: './assets/doc/bmb-image/photo-1.svg',
        alt: 'Image 1'
      },
      {
        src: './assets/doc/bmb-image/photo-2.svg',
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

export const CarouselBackdropAndBgColor: Story = {
  name: 'Carousel - Per-image backdrop and background color',
  args: {
    images: [
      {
        src: './assets/doc/bmb-image/photo-1.svg',
        alt: 'Image 1',
      },
      {
        src: './assets/doc/bmb-image/photo-2.svg',
        alt: 'Image 2',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Each item in `images` can define its own `bgColor` (applied as the container background while that image is visible) and `hasBackdrop` (shows a blurred, covered copy of the visible image behind it).',
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
