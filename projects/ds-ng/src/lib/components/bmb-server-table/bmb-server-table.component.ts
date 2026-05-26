import {
  Component,
  input,
  output,
  effect,
} from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

export interface IBmbServerTableColumn {
  key: string;
  label: string;
}

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
    if (columns && columns.length > 0) {
      this.displayedColumns = columns.map((col) => col.key);
    } else {
      console.warn('Las columnas están vacías o mal configuradas.');
      this.displayedColumns = [];
    }
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
