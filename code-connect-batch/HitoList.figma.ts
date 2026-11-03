// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=472-20602
// source=ui-angular/src/lib/components/bmb-hito-list/bmb-hito-list.component.ts
// component=BmbHitoListComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  now: DateTime = DateTime.now();

  events: IBmbHitoListEvents = {
    January: {
      name: 'January',
      year: 2025,
      selected: true,
      orderedEvents: ['01', '15'],
      events: {
        '01': {
          date: DateTime.fromISO('2025-01-01'),
          selected: true,
          events: [
            { type: 'meeting' },
            { type: 'task' },
            { type: 'holiday' },
            { type: 'reminder' },
          ],
        },
        '15': {
          date: DateTime.fromISO('2025-01-15'),
          selected: false,
          events: [{ type: 'holiday' }, { type: 'meeting' }],
        },
      },
    },
    February: {
      name: 'February',
      year: 2025,
      selected: false,
      orderedEvents: ['01', '20'],
      events: {
        '01': {
          date: DateTime.fromISO('2025-02-01'),
          selected: false,
          events: [{ type: 'task' }, { type: 'holiday' }],
        },
        '20': {
          date: DateTime.fromISO('2025-02-20'),
          selected: false,
          events: [{ type: 'meeting' }, { type: 'reminder' }, { type: 'task' }],
        },
      },
    },
  };
}
</script>

<bmb-hito-list
  dateFormat="dd/MM/yyyy"
  lang="es"
  [events]="events"
  [now]="now"
  [orderedMonths]="['January', 'February']"
/>`,
  imports: [
    "import { DateTime } from 'luxon'",
    "import type { IBmbHitoListEvents } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbHitoListComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-hito-list',
}
