import { Injectable, signal } from '@angular/core';
import { BmbTableConfig, IBmbColumn } from './types';


@Injectable({
  providedIn: 'root',
})
export class BmbTableService {
  readonly tableConfig = signal<BmbTableConfig>({
    data: [],
    columns: [],
    columnOrder: '',
    orderType: 'asc',
    pageSize: 10,
    page: 1,
  });

  setTableConfig(config: BmbTableConfig): string {
    const id = config.id ?? self.crypto.randomUUID().toString();
    this.tableConfig.set({ ...config, id });

    return id;
  }

  updateTableConfig(config: BmbTableConfig): void {
    this.tableConfig.update((prev) => ({ ...prev, ...config }));
  }

  // getOrderedData(): any[] {
  //   if (!!this.columnOrder()) {
  //     return this.dataSource();
  //   }

  //   return this.dataSource().sort((a, b) => {
  //     const valueA = a[this.columnOrder()];
  //     const valueB = b[this.columnOrder()];

  //     if (valueA < valueB) {
  //       return this.orderType() === 'asc' ? -1 : 1;
  //     } else if (valueA > valueB) {
  //       return this.orderType() === 'asc' ? 1 : -1;
  //     } else {
  //       return 0;
  //     }
  //   });
  // }
}
