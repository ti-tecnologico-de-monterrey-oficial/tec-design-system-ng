import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  model,
  output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbNativeColumn } from './bmb-tables.interface';

export interface IBmbColumnPinning {
  left: string[];
  right: string[];
}

@Component({
  selector: 'bmb-native-tables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-native-tables.component.html',
  styleUrl: './bmb-native-tables.component.scss',
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
export class BmbNativeTablesComponent {
  data = input<any[]>([]);
  columns = input<IBmbNativeColumn[]>([]);
  columnOrder = input<string[]>([]);
  columnPinning = input<IBmbColumnPinning>({
    left: [],
    right: [],
  });
  enableResizing = input<boolean>(false);
  pageSize = input<number>();
  alwaysShowPaginator = input<boolean>(false);
  lazyActions = input<boolean>(false);
  enableSelection = input<boolean>(false);

  filters = model<{ [key: string]: string }>({});
  sorting = model<{ column: string; desc: boolean }>();
  frozenColumns = model<string[]>([]);
  loading = model<boolean>(false);
  selection = model<any[]>([]);
  selectAll = model<boolean>(false);
  activePage = model<number>(0);
  columnVisibility = model<{ [key: string]: boolean }>({});

  columnFilteringChange = output<{ [key: string]: string }>();
  selectionChange = output<any[]>();
  selectAllChange = output<boolean>();
  onFilterChange = output<{ [key: string]: string }>();
  onColumnResize = output<{
    column: string;
    width: number;
    event: MouseEvent;
  }>();
  onSortChange = output<{ column: string; desc: boolean }>();
  onColumnReorder = output<{ previousIndex: number; currentIndex: number }>();

  @ViewChild('selectColumnTemplate')
  selectColumnTemplate!: TemplateRef<unknown>;

  parsedData = computed(() => {
    const pages = [];
    if (this.pageSize()) {
      const pageSize = this.pageSize() ?? 1;
      for (let i = 0; i < this.data().length; i += pageSize) {
        pages.push(this.data().slice(i, i + pageSize));
      }
    } else {
      pages.push(this.data());
    }

    return pages;
  });

  parsedColumns = computed<IBmbNativeColumn[]>(() => {
    const visibleColumnsKeys = Object.keys(this.columnVisibility());
    const visibleColumns = !!visibleColumnsKeys.length
      ? this.columns().filter((col) => {
          if (visibleColumnsKeys.includes(col.dataKey)) {
            return this.columnVisibility()[col.dataKey];
          }

          return true;
        })
      : [...this.columns()];
    if (this.enableSelection()) {
      const selectColumn: IBmbNativeColumn = {
        label: 'Select',
        def: 'select',
        dataKey: 'select',
        isResizable: false,
        isSortable: false,
        isFilterable: false,
        isPinned: false,
        templateRef: this.selectColumnTemplate,
      };
      visibleColumns.unshift(selectColumn);
    }

    return visibleColumns;
  });

  isTemplateRef(column: IBmbNativeColumn): boolean {
    return !!column.templateRef;
  }
}
