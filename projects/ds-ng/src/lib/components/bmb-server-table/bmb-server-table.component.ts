import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
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
    CommonModule
  ],
  templateUrl: './bmb-server-table.component.html',
  styleUrls: ['./bmb-server-table.component.scss']
})
export class BmbServerTableComponent implements OnChanges {
  @Input() columns: IBmbServerTableColumn[] = [];
  @Input() data: any[] = [];
  @Input() totalRecords: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [];
  @Input() loading: boolean = false;
  @Output() pageChange = new EventEmitter<number>();
  @Output() dataChange = new EventEmitter<any[]>();
  @Output() onClickRow = new EventEmitter<any>();
  displayedColumns: string[] = [];
  selectedRow: any = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.validateColumns();
    }
    if (changes['data']) {
      this.dataChange.emit(this.data || []);
    }
  }

  validateColumns(): void {
    if (this.columns && this.columns.length > 0) {
      this.displayedColumns = this.columns.map(col => col.key);
    } else {
      console.warn('Las columnas están vacías o mal configuradas.');
      this.displayedColumns = [];
    }
  }

  onPageChange(event: any): void {
    this.pageChange.emit(event.pageIndex + 1);
  }

  onRowClick(row: any ): void {
    this.selectedRow = row;
    this.onClickRow.emit(row);
  }

  isSelected(row: any): boolean {
    return this.selectedRow === row;
  }
}
