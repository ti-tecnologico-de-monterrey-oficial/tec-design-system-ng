import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { TableColum } from './bmb-tables.interface';

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
  columns = input<TableColum[]>([]);
  columnOrder = input<string[]>([]);
  columnPinning = input<IBmbColumnPinning>({
    left: [],
    right: [],
  });
  enableResizing = input<boolean>(false);
  columnVisibility = input<{ [key: string]: boolean }>({});

  columnFilteringChange = output<{ [key: string]: string }>();
}
