import { Component, ViewEncapsulation, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  getFabClassName,
  getFabIconName,
  isFabActiveState,
  toggleFabActive,
} from '../../_shared/logic/components/fab';
import type { FabSize, FabType } from '../../_shared/types/components/fab';

export { FAB_SIZE, FAB_TYPE } from '../../_shared/types/components/fab';
export type { FabSize, FabType } from '../../_shared/types/components/fab';

@Component({
  selector: 'bmb-fab',
  styleUrl: './bmb-fab.component.scss',
  templateUrl: './bmb-fab.component.html',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  encapsulation: ViewEncapsulation.None,
})
export class BmbFabComponent {
  icon = input<string>('');
  size = input<FabSize>('large');
  mitec = input<boolean>(false);
  text = input<string | null>('');
  type = input<FabType>('normal');

  fabClick = output<MouseEvent>();

  isActive: boolean = false;

  handleFabClick(event: MouseEvent): void {
    if (this.activeState) {
      this.isActive = toggleFabActive(this.isActive);
    }

    this.fabClick.emit(event);
  }

  get className(): string {
    return getFabClassName({
      mitec: this.mitec(),
      type: this.type(),
      size: this.size(),
    });
  }

  get iconName(): string {
    return getFabIconName({
      icon: this.icon(),
      activeState: this.activeState,
      isActive: this.isActive,
    });
  }

  get activeState(): boolean {
    return isFabActiveState({
      mitec: this.mitec(),
      type: this.type(),
      size: this.size(),
    });
  }
}
