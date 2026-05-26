import { Component, ViewEncapsulation, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { FabSize, FabType } from './bmb-fab-.interface';

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
    this.isActive = !this.isActive;
    this.fabClick.emit(event);
  }

  get className(): string {
    if (this.mitec()) return 'bmb_fab-mitec-button';

    const baseClassName: string = 'bmb_fab-main';

    return `${baseClassName} ${baseClassName}-${this.type() === 'extended' ? 'extended' : this.size()}`;
  }

  get iconName(): string {
    if (!this.mitec() && this.type() === 'normal' && this.size() === 'large') {
      if (this.isActive) return 'close';
      return this.icon() || 'apps';
    }

    return this.icon();
  }
}
