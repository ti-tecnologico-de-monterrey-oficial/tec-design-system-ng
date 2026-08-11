import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  effect,
} from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

import { getServerTableDisplayedColumns } from '../../_shared/logic/components/server-table';
import type { IBmbServerTableColumn } from '../../_shared/types/components/server-table';

export type { IBmbServerTableColumn } from '../../_shared/types/components/server-table';

@Component({
  selector: 'bmb-server-table',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './bmb-server-table.component.html',
  styleUrl: './bmb-server-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbServerTableComponent {
  columns = input<IBmbServerTableColumn[]>([]);
  data = input<any[]>([]);
  totalRecords = input<number>(0);
  pageSize = input<number>(10);
  pageSizeOptions = input<number[]>([]);
  loading = input<boolean>(false);

  pageChange = output<number>();
  dataChange = output<any[]>();
  onClickRow = output<any>();
  displayedColumns: string[] = [];
  selectedRow: any = null;

  constructor() {
    effect(() => {
      const columns = this.columns();

      if (columns) {
        this.validateColumns();
      }
    });

    effect(() => {
      this.dataChange.emit(this.data() || []);
    });
  }

  validateColumns(): void {
    const columns = this.columns();
    this.displayedColumns = getServerTableDisplayedColumns(columns);
  }

  onPageChange(event: any): void {
    this.pageChange.emit(event.pageIndex + 1);
  }

  onRowClick(row: any): void {
    this.selectedRow = row;
    this.onClickRow.emit(row);
  }

  isSelected(row: any): boolean {
    return this.selectedRow === row;
  }
}
