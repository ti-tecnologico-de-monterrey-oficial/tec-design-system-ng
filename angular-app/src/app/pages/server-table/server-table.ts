import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbServerTableComponent,
  type IBmbServerTableColumn,
} from 'ui-angular';

@Component({
  selector: 'app-server-table-page',
  imports: [BmbServerTableComponent],
  templateUrl: './server-table.html',
  styleUrl: './server-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerTablePage {
  readonly columns: IBmbServerTableColumn[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'role', label: 'Rol' },
    { key: 'status', label: 'Estado' },
  ];
  readonly data = [
    { name: 'Ana Torres', role: 'Diseño', status: 'Activo' },
    { name: 'Luis Pérez', role: 'Desarrollo', status: 'Pendiente' },
  ];
  readonly loading = signal(false);
  readonly page = signal(1);
  readonly selectedName = signal('Ninguna');
  setLoading(value: boolean): void {
    this.loading.set(value);
  }
  handlePageChange(page: number): void {
    this.page.set(page);
  }
  handleRowClick(row: { name: string }): void {
    this.selectedName.set(row.name);
  }
}
