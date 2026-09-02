// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=9329-99012
// source=ui-angular/src/lib/components/bmb-server-table/bmb-server-table.component.ts
// component=BmbServerTableComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-server-table [columns]="[{ key: 'name', label: 'Name' }, { key: 'lastName', label: 'Last Name' }, { key: 'birthday', label: 'Birthday' }, { key: 'country', label: 'Country' }]" [data]="[{ name: 'Jesus', lastName: 'Nava', birthday: '03/04/1998', country: 'Mexico' }]" [totalRecords]="1" [pageSize]="10" [pageSizeOptions]="[5, 10, 15]" />`,
  imports: [
    "import { BmbServerTableComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-server-table',
}
