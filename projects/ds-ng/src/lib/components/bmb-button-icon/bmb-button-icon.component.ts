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
import { BmbTooltipComponent } from '../bmb-tooltip/bmb-tooltip.component';

@Component({
  selector: 'bmb-button-icon',
  standalone: true,
  imports: [CommonModule, BmbActionIconComponent, BmbTooltipComponent],
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
  tooltipTitle = input<string>('');
  tooltipText = input<string>('');

  onButtonClick = output<MouseEvent>();

  handlePress(): void {
    this.active.update((value) => !value);
  }

  handleClick(event: MouseEvent): void {
    this.onButtonClick.emit(event);
  }
}
