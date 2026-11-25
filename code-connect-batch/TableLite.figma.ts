// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=9252-163784
// source=ui-angular/src/lib/components/bmb-table-lite/bmb-table-lite.component.ts
// component=BmbTableLiteComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleSelect(event: Parameters<BmbTableLiteComponent['select']['emit']>[0]): void {
    console.info('select', event);
  }

  handleClickedRow(event: Parameters<BmbTableLiteComponent['clickedRow']['emit']>[0]): void {
    console.info('clickedRow', event);
  }

  handleSearchChange(event: Parameters<BmbTableLiteComponent['searchChange']['emit']>[0]): void {
    console.info('searchChange', event);
  }

  handleFiltersChange(event: Parameters<BmbTableLiteComponent['filtersChange']['emit']>[0]): void {
    console.info('filtersChange', event);
  }

  handleSearchModeChange(event: Parameters<BmbTableLiteComponent['searchModeChange']['emit']>[0]): void {
    console.info('searchModeChange', event);
  }

  handlePageChange(event: Parameters<BmbTableLiteComponent['pageChange']['emit']>[0]): void {
    console.info('pageChange', event);
  }

  columns: ReturnType<BmbTableLiteComponent['columns']> = [
    {
      def: 'first_name',
      label: 'Nombre',
      dataKey: 'first_name',
      icon: ${getIcon('face', 'typescript')},
      labelEn: 'Name',
      type: 'string',
    },
    {
      def: 'last_name',
      label: 'Apellido',
      dataKey: 'last_name',
      icon: ${getIcon('face', 'typescript')},
      labelEn: 'Last Name',
      type: 'string',
    },
    {
      def: 'email',
      label: 'Correo Electrónico',
      dataKey: 'email',
      icon: ${getIcon('email', 'typescript')},
      labelEn: 'Email',
      type: 'string',
      isFilterable: false,
    },
    {
      def: 'birthday',
      label: 'Cumpleaños',
      dataKey: 'birthday',
      labelEn: 'Birthday',
      type: 'date',
      dateFormat: 'dd/MM/yyyy',
    },
    { def: 'country', label: 'País', dataKey: 'country', labelEn: 'Country' },
    {
      def: 'balance',
      label: 'Saldo',
      dataKey: 'balance',
      labelEn: 'Balance',
      type: 'number',
    },
  ];

  config: ReturnType<BmbTableLiteComponent['config']> = {
    isSelectable: true,
    isExpandible: true,
    isPaginable: true,
    showActions: true,
  };
}
</script>

<bmb-table-lite
  (select)="handleSelect($event)"
  (clickedRow)="handleClickedRow($event)"
  (searchChange)="handleSearchChange($event)"
  (filtersChange)="handleFiltersChange($event)"
  (searchModeChange)="handleSearchModeChange($event)"
  (pageChange)="handlePageChange($event)"
  [data]="[{ id: 1, first_name: 'Mindy', last_name: 'Dengel', email: 'mdengel0@examiner.com', country: 'Latvia', birthday: '17/10/2001', balance: 9424 }, { id: 2, first_name: 'Fey', last_name: 'Burder', email: 'fburder1@nyu.edu', country: 'Japan', birthday: '06/02/1982', balance: 6427 }, { id: 3, first_name: 'Julienne', last_name: 'Gemlbett', email: 'jgemlbett2@about.com', country: 'Philippines', birthday: '14/07/1981', balance: 9064 }]"
  [columns]="columns"
  [config]="config"
  [truncate]="false"
  [showSearch]="false"
  [filtersVisible]="false"
  filtersPosition="top"
  [pageSize]="10"
  [totalItems]="3"
  [serverSide]="false"
  lang="es"
  [initialTableSelection]="[1]"
  [clearSelection]="false"
  [currentPage]="0"
  [actionTemplate]="null"
  [detailTemplate]="null"
/>`,
  imports: [
    "import { BmbTableLiteComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-table-lite',
}
