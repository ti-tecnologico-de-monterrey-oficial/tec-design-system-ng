import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbNavigationIconComponent } from '../bmb-navigation-bar/bmb-navigation-icon/bmb-navigation-icon.component';

@Component({
  selector: 'bmb-button-icon',
  standalone: true,
  imports: [CommonModule, BmbNavigationIconComponent],
  templateUrl: './bmb-button-icon.component.html',
  styleUrl: './bmb-button-icon.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbButtonIconComponent {
  idElement = input<string>();
  icon = input.required<string>();
  showContainer = input<boolean>(true);
  disabled = input<boolean>(false);
  active = model<boolean>(false);

  onButtonClick = output<void>();

  handlePress(): void {
    this.active.update(value => !value);
  }

  handleClick(): void {
    this.onButtonClick.emit();
  }
}
