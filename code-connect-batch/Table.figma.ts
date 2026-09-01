// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=9087-83211
// source=ui-angular/src/lib/components/bmb-tables/bmb-tables.component.ts
// component=BmbTablesComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-table [columns]="[{ def: 'name', label: 'Name', dataKey: 'name', type: 'string' }, { def: 'lastName', label: 'Last Name', dataKey: 'lastName', type: 'string' }, { def: 'country', label: 'Country', dataKey: 'country', type: 'string' }]" [data]="[{ name: 'Romina', lastName: 'Benitez', country: 'Mexico' }, { name: 'Jesus', lastName: 'Nava', country: 'Mexico' }]" />`,
  imports: [
    "import { BmbTablesComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-table',
}
