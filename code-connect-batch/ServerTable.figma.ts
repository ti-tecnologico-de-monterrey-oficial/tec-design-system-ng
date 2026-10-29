// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=9329-99012
// source=ui-angular/src/lib/components/bmb-server-table/bmb-server-table.component.ts
// component=BmbServerTableComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  columns: IBmbServerTableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'birthday', label: 'Birthday' },
    { key: 'country', label: 'Country' },
  ];
}
</script>

<bmb-server-table
  [data]="[{ lastName: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum', name: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum', birthday: '02/02/2000', country: 'Mexico' }, { lastName: 'Nava', name: 'Jesus', birthday: '03/04/1998', country: 'Mexico', detail: 'Detail text' }]"
  [columns]="columns"
  [totalRecords]="2"
  [pageSize]="10"
  [pageSizeOptions]="[5,10,15]"
  [loading]="false"
/>`,
  imports: [
    "import type { IBmbServerTableColumn } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbServerTableComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-server-table',
}
