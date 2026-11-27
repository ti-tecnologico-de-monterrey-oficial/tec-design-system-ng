// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=2640-89850
// source=ui-angular/src/lib/components/bmb-calendar/bmb-calendar.component.ts
// component=BmbCalendarComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleOnDateChange(event: Parameters<BmbCalendarComponent['onDateChange']['emit']>[0]): void {
    console.info('onDateChange', event);
  }

  handleOnClose(event: Parameters<BmbCalendarComponent['onClose']['emit']>[0]): void {
    console.info('onClose', event);
  }
}
</script>

<bmb-calendar
  (onDateChange)="handleOnDateChange($event)"
  (onClose)="handleOnClose($event)"
  height="100%"
  [showFilterButton]="false"
  [calendarTitle]="calendarTitle"
  dateFormat="iso"
  [disableMobileFilter]="false"
/>`,
  imports: [
    "import { BmbCalendarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-calendar',
}
