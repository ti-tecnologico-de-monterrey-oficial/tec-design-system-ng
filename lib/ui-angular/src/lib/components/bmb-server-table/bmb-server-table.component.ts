import { Component, effect, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import {
  IBmbServerTableColumn,
  getDisplayedColumns,
  isSelectedRow,
} from '@ti-tecnologico-de-monterrey-oficial/core/component/server-table';

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
      this.displayedColumns = getDisplayedColumns(this.columns());
    });

    effect(() => {
      this.dataChange.emit(this.data() || []);
    });
  }

  onPageChange(event: any): void {
    this.pageChange.emit(event.pageIndex + 1);
  }

  onRowClick(row: any): void {
    this.selectedRow = row;
    this.onClickRow.emit(row);
  }

  isSelected(row: any): boolean {
    return isSelectedRow(this.selectedRow, row);
  }
}