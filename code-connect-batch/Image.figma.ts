// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=2102-56629
// source=ui-angular/src/lib/components/bmb-image/bmb-image.component.ts
// component=BmbImageComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  images: BmbImageItem[] | null = [
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
  ];
}
</script>

<bmb-image
  [autoplay]="false"
  [autoplayInterval]="5000"
  src="./assets/doc/bmb-image/photo-fruits.svg"
  mobileSrc="./assets/doc/bmb-image/photo-cats.svg"
  width="clamp(200px, 100%, calc(50dvw - 3rem))"
  ratio="1/1"
  borderRadius="m"
  loading="lazy"
  [enableZoom]="false"
  [isBlurredBackdrop]="false"
  [images]="images"
  [animation]="animation"
  objectFit="cover"
  [avoidEncoding]="false"
  [enableCursorPointer]="false"
  [hasBackdrop]="false"
/>`,
  imports: [
    "import type { BmbImageItem } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbImageComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-image',
  metadata: { nestable: true },
}
