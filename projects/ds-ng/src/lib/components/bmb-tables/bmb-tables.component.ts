import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../directives/button.directive';
import { BmbTableService } from './bmb-tables.service';
import { IBmbColumn } from './types';

@Component({
  selector: 'bmb-tables',
  templateUrl: './bmb-tables.component.html',
  styleUrls: ['./bmb-tables.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [BmbButtonDirective],
  providers: [BmbTableService],
})
export class BmbTablesComponent {
  dataSource = input<any[]>([]);
  columnDefinition = input<IBmbColumn[]>([]);
  loading = model<boolean>(false);
  currentPage = model<number>(1);
  pageSize = model<number>(10);
  columnOrder = model<string | number>('');
  orderType = input<'asc' | 'desc'>('asc');

  tableState = model({});
  constOrderedData: any[] = [];

  constructor(
    private tableService: BmbTableService,
  ) {}

  ngOnInit() {
    this.tableService.setTableConfig({
      data: this.dataSource(),
      columns: this.columnDefinition(),
      columnOrder: this.columnOrder(),
      orderType: this.orderType(),
      pageSize: this.pageSize(),
      page: this.currentPage(),
    });
  }

  getOrderedData(): any[] {
    if (!!this.columnOrder()) {
      return this.dataSource();
    }

    return this.dataSource().sort((a, b) => {
      const valueA = a[this.columnOrder()];
      const valueB = b[this.columnOrder()];

      if (valueA < valueB) {
        return this.orderType() === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.orderType() === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  setColumnOrder(column: string | number) {
    this.columnOrder.set(column);
  }

  getContent(column: IBmbColumn, row: any): string {
    return row[column.name as string] ?? '';
  }
}


// import { Component, Input, Output, EventEmitter } from '@angular/core';

// @Component({
//   selector: 'app-tabla',
//   templateUrl: './bmb-tables.component.html',
//   styleUrls: ['./bmb-tables.component.css']
// })
// export class TablaComponent {
//

//   get datosPaginados() {
//     const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
//     const fin = inicio + this.elementosPorPagina;
//     return this.datosOrdenados.slice(inicio, fin);
//   }


//   cambiarOrden(columna: string) {
//     if (this.ordenColumna === columna) {
//       this.ordenDireccion = this.ordenDireccion === 'asc' ? 'desc' : 'asc';
//     } else {
//       this.ordenColumna = columna;
//       this.ordenDireccion = 'asc';
//     }
//   }

//   cambiarPagina(pagina: number) {
//     this.paginaActual = pagina;
//     this.paginaCambiada.emit(pagina);
//   }

//   get paginas() {
//     const totalPaginas = Math.ceil(this.datos.length / this.elementosPorPagina);
//     return Array.from({ length: totalPaginas }, (_, i) => i + 1);
//   }
// }
