import { Injectable, signal } from '@angular/core';

export interface IBmbListGroupServiceConfig {
  isMultipleSelection: boolean;
  showControls: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BmbListGroupStatusService {
  readonly listGroupStatus = signal<string[]>([]);
  readonly listGroupConfiguration = signal<IBmbListGroupServiceConfig>({
    isMultipleSelection: false,
    showControls: true,
  });
  listGroupId: string = '';

  getListGroupStatus() {
    return this.listGroupStatus();
  }

  updateListGroupStatus(id: string) {
    const newList = new Set(this.listGroupStatus());

    if (this.listGroupConfiguration().isMultipleSelection) {
      if (newList.has(id)) newList.delete(id);
      else newList.add(id);
    } else {
      if (newList.has(id)) newList.delete(id);
      else {
        newList.clear();
        newList.add(id);
      }
    }
    const newData: string[] = [...newList];
    this.listGroupStatus.set(newData);
  }

  setListGroupConfiguration(config: IBmbListGroupServiceConfig) {
    this.listGroupConfiguration.set(config);
  }

  setListGroupId(id: string) {
    this.listGroupId = id;
  }

  getListGroupConfiguration() {
    return this.listGroupConfiguration();
  }

  getListGroupId() {
    return this.listGroupId;
  }
}
