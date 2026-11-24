// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=109-37785
// source=ui-angular/src/lib/components/bmb-search-input/bmb-search-input.component.ts
// component=BmbSearchInputComponent
import figma from 'figma'
import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const placeholder = instance.getString('placeholder')
const isLoading = instance.getBoolean('isLoading')

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleOnValueChange(event: Parameters<BmbSearchInputComponent['onValueChange']['emit']>[0]): void {
    console.info('onValueChange', event);
  }

  handleOnServerSideFilterEvent(event: Parameters<BmbSearchInputComponent['onServerSideFilterEvent']['emit']>[0]): void {
    console.info('onServerSideFilterEvent', event);
  }

  handleOnClearField(event: Parameters<BmbSearchInputComponent['onClearField']['emit']>[0]): void {
    console.info('onClearField', event);
  }
}
</script>

<bmb-search-input
  (onValueChange)="handleOnValueChange($event)"
  (onServerSideFilterEvent)="handleOnServerSideFilterEvent($event)"
  (onClearField)="handleOnClearField($event)"
  name=""
  [data]="['Carlee Bengochea', 'Reynard Howgate', 'Pearce Jore', 'Giacopo Mellings', 'Clyve Nerval', 'Pauletta Pavelka', 'Midge Girardot']"
  [isServerSideFilter]="false"
  placeholder="${escapeAttribute(placeholder ?? '')}"
  [isLoading]="${isLoading ?? false}"
  [searchDebounceTime]="300"
/>`,
  imports: [
    "import { BmbSearchInputComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-search-input',
}
