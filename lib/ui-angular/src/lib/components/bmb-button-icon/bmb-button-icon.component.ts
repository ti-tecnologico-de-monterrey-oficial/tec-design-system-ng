import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { IBmbContrast } from '../../types/colors';

import { getButtonIconClasses } from '@ti-tecnologico-de-monterrey-oficial/core/component/button-icon';

@Component({
  selector: 'bmb-button-icon',
  standalone: true,
  imports: [CommonModule, BmbActionIconComponent],
  templateUrl: './bmb-button-icon.component.html',
  styleUrl: './bmb-button-icon.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbButtonIconComponent {
  appearanceContrast = input<IBmbContrast>('default');
  idElement = input<string>();
  icon = input.required<string>();
  showContainer = input<boolean>(true);
  disabled = input<boolean>(false);
  active = model<boolean>(false);
  isOutline = model<boolean>(false);
  alt = input<string>('');

  onButtonClick = output<MouseEvent>();

  getClasses(): Record<string, boolean> {
    return getButtonIconClasses({
      active: this.active(),
      showContainer: this.showContainer(),
      disabled: this.disabled(),
      isOutline: this.isOutline(),
      appearanceContrast: this.appearanceContrast(),
    });
  }

  handlePress(): void {
    this.active.update((value) => !value);
  }

  handleClick(event: MouseEvent): void {
    this.onButtonClick.emit(event);
  }
}