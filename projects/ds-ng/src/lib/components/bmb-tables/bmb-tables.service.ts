import { Injectable, signal } from '@angular/core';

export interface BmbTableConfig {
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class BmbTableService {
  readonly tableConfig = signal<BmbTableConfig>({});

  setTableConfig(config: BmbTableConfig): string {
    const id = config.id ?? self.crypto.randomUUID().toString();
    this.tableConfig.set({...config, id });

    return id;
  }

  updateTableConfig(config: BmbTableConfig): void {
    this.tableConfig.update((prev) => ({ ...prev, ...config }));
  }
}
