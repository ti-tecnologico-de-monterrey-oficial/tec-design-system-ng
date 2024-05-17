import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  TemplateRef,
  HostListener,
  Renderer2,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatTableDataSource,
  MatTableModule,
  MatTable,
} from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbCheckboxComponent } from '../bmb-checkbox/bmb-checkbox.component';
import { TableColum, TableConfig } from './bmb-tables.interface';

@Component({
  selector: 'bmb-table',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbCheckboxComponent,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './bmb-tables.component.html',
  styleUrl: './bmb-tables.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
})
export class BmbTablesComponent implements AfterViewInit, OnInit {
  dataSource: MatTableDataSource<Array<any>> = new MatTableDataSource();
  tableDisplayColumns: string[] = [];
  tableColumns: TableColum[] = [];
  expandedElement: any;
  selection = new SelectionModel<any>(true, []);
  tableConfig: TableConfig | undefined;
  paginatorSize: number | undefined;

  // Resize Columns
  pressed = false;
  currentResizeIndex?: number;
  startX?: number;
  startWidth?: number;
  isResizingRight?: boolean;
  resizableMousemove?: () => void;
  resizableMouseup?: () => void;

  @Input() set pageSize(size: number) {
    this.paginatorSize = size;
  }

  @Input() set data(data: Array<any>) {
    this.dataSource = new MatTableDataSource(data);
  }

  @Input() set columns(columns: TableColum[]) {
    this.tableColumns = columns;
    this.tableDisplayColumns = this.tableColumns.map((col) => col.def);
  }

  @Input() set config(config: TableConfig) {
    this.setConfig(config);
  }

  @Input() actionTemplate?: TemplateRef<any> | null;

  @Input() detailTemplate: TemplateRef<any> | null = null;

  @Output() select: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatTable, { read: ElementRef }) private matTableRef?: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setTableResize(this.matTableRef!.nativeElement.clientWidth);
  }

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.setTableResize(this.matTableRef!.nativeElement.clientWidth);
  }

  setTableResize(tableWidth: number) {
    let totWidth = 0;
    this.tableColumns.forEach((column) => {
      if (column.width == undefined) {
        column.width = 50;
      }
      totWidth += column.width!;
    });
    const scale = (tableWidth - 5) / totWidth;
    this.tableColumns.forEach((column) => {
      column!.width! *= scale;
      this.setColumnWidth(column);
    });
  }

  setColumnWidth(column: any) {
    const columnEls = Array.from(
      document.getElementsByClassName('mat-column-' + column.def),
    );
    columnEls.forEach((el: any) => {
      el.style.width = column.width + 'px';
    });
  }

  setColumnWidthChanges(index: number, width: number) {
    const orgWidth = this.tableColumns[index].width;
    const dx = width - orgWidth!;
    if (dx !== 0) {
      const j = this.isResizingRight ? index + 1 : index - 1;
      const newWidth = this.tableColumns[j].width! - dx;
      if (newWidth > 50) {
        this.tableColumns[index].width = width;
        this.setColumnWidth(this.tableColumns[index]);
        this.tableColumns[j].width = newWidth;
        this.setColumnWidth(this.tableColumns[j]);
      }
    }
  }

  mouseMove(index: number) {
    this.resizableMousemove = this.renderer.listen(
      'document',
      'mousemove',
      (event) => {
        if (this.pressed && event.buttons) {
          const dx = this.isResizingRight
            ? event.pageX - this.startX!
            : -event.pageX + this.startX!;
          const width = this.startWidth! + dx;
          if (this.currentResizeIndex === index && width > 50) {
            this.setColumnWidthChanges(index, width);
          }
        }
      },
    );
    this.resizableMouseup = this.renderer.listen(
      'document',
      'mouseup',
      (event) => {
        if (this.pressed) {
          this.pressed = false;
          this.currentResizeIndex = -1;
          this.resizableMousemove!();
          this.resizableMouseup!();
        }
      },
    );
  }

  private checkResizing(event: any, index: any) {
    const cellData = this.getCellData(index);
    if (
      index === 0 ||
      (Math.abs(event.pageX - cellData.right) < cellData.width / 2 &&
        index !== this.tableColumns.length - 1)
    ) {
      this.isResizingRight = true;
    } else {
      this.isResizingRight = false;
    }
  }

  private getCellData(index: number) {
    const headerRow =
      this.matTableRef!.nativeElement.children[0].querySelector('tr');
    const cell = headerRow.children[index];
    return cell.getBoundingClientRect();
  }

  onResizeColumn(event: any, index: number) {
    this.checkResizing(event, index);
    this.currentResizeIndex = index;
    this.pressed = true;
    this.startX = event.pageX;
    this.startWidth = event.target.parentElement.clientWidth;
    event.preventDefault();
    this.mouseMove(index);
  }

  onSelect() {
    this.select.emit(this.selection.selected);
  }

  setConfig(config: TableConfig) {
    this.tableConfig = config;

    if (this.tableConfig.isExpandible) {
      this.tableDisplayColumns?.unshift('expand');
    }

    if (this.tableConfig.isSelectable) {
      this.tableDisplayColumns?.unshift('select');
    }

    if (this.tableConfig.showActions) {
      this.tableDisplayColumns?.push('actions');
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.onSelect();
      return;
    }

    this.selection.select(...this.dataSource.data);
    this.onSelect();
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
