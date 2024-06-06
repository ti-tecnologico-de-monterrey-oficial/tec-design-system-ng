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
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatTooltipModule,
  ],
  templateUrl: './bmb-tables.component.html',
  styleUrls: ['./bmb-tables.component.scss'],
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
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  tableDisplayColumns: string[] = [];
  tableColumns: TableColum[] = [];
  expandedElement: any;
  selection = new SelectionModel<any>(true, []);
  tableConfig: TableConfig | undefined;
  paginatorSize: number | undefined;

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

  @Input() set data(data: any[]) {
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
  @ViewChild('headerCellRef') headerCellRef!: ElementRef;
  @ViewChild('cellRef') cellRef!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setTableResize(this.matTableRef!.nativeElement.clientWidth);
  }

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.setTableResize(this.matTableRef!.nativeElement.clientWidth);

    const headerHasEllipsis = this.hasEllipsis(
      this.headerCellRef?.nativeElement,
    );

    this.dataSource.data.forEach((row: any) => {
      const cellHasEllipsis = this.hasEllipsis(this.cellRef?.nativeElement);
    });
  }

  setTableResize(tableWidth: number) {
    let totWidth = 0;
    this.tableColumns.forEach((column) => {
      column.width = column.width || 50;
      totWidth += column.width!;
    });
    const scale = (tableWidth - 5) / totWidth;
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
        }
      },
    );
    this.resizableMouseup = this.renderer.listen('document', 'mouseup', () => {
      if (this.pressed) {
        this.pressed = false;
        this.currentResizeIndex = -1;
        this.resizableMousemove!();
        this.resizableMouseup!();
      }
    });
  }

  checkResizing(event: any, index: any) {
    const cellData = this.getCellData(index);
    this.isResizingRight =
      index === 0 ||
      (Math.abs(event.pageX - cellData.right) < cellData.width / 2 &&
        index !== this.tableColumns.length - 1);
  }

  getCellData(index: number) {
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.onSelect();
      return;
    }

    this.selection.select(...this.dataSource.data);
    this.onSelect();
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  isEven(rowIndex: number): boolean {
    const filteredIndex = this.dataSource.data
      .filter((row) => !row.isDetail)
      .findIndex((row, index) => index === rowIndex);
    return filteredIndex % 2 === 0;
  }

  isOdd(rowIndex: number): boolean {
    return !this.isEven(rowIndex);
  }

  hasEllipsis(element: HTMLTableCellElement | undefined): boolean {
    if (!element) {
      return false;
    }

    const elementRef = new ElementRef(element);
    return (
      elementRef.nativeElement.scrollWidth >
      elementRef.nativeElement.clientWidth
    );
  }

  getPaginationText(): string {
    if (
      !this.paginator ||
      this.paginator.length === 0 ||
      this.paginator.pageSize === 0
    ) {
      return `0 de ${this.paginator?.length || 0}`;
    }
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize + 1;
    const endIndex = Math.min(
      (this.paginator.pageIndex + 1) * this.paginator.pageSize,
      this.paginator.length,
    );
    return `${startIndex} - ${endIndex} de ${this.paginator.length}`;
  }
}
