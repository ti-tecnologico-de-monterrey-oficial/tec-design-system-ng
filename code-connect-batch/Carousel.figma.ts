// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=1933-100481
// source=ui-angular/src/lib/components/bmb-carousel/bmb-carousel.component.ts
// component=BmbCarouselComponent
import figma from 'figma'

const selectedIndex = figma.selectedInstance.getEnum('Active slide', {
  '1': 0,
  '2': 1,
  '3': 2,
})

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleSelectedIndexChange(event: ReturnType<BmbCarouselComponent['selectedIndex']>): void {
    console.info('selectedIndexChange', event);
  }
}
</script>

<bmb-carousel
  (selectedIndexChange)="handleSelectedIndexChange($event)"
  [selectedIndex]="${selectedIndex ?? 0}"
>
  <h1 #carouselItem>Slide 1</h1>
  <h1 #carouselItem>Slide 2</h1>
  <h1 #carouselItem>Slide 3</h1>
</bmb-carousel>`,
  imports: [
    "import { BmbCarouselComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-carousel',
  metadata: { nestable: true },
}
