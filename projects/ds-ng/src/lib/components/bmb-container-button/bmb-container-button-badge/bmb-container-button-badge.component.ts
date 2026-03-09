import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbContainerButtonBaseComponent } from '../bmb-container-button-base/bmb-container-button-base.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';
import { BmbBadgeComponent } from '../../bmb-badge/bmb-badge.component';
import { IBmbBadgeInfo } from '../../../types';

@Component({
  selector: 'bmb-container-button-badge',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerButtonBaseComponent,
    BmbIconComponent,
    BmbTitleComponent,
    BmbBadgeComponent,
  ],
  templateUrl: './bmb-container-button-badge.component.html',
  styleUrl: './bmb-container-button-badge.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbContainerButtonBadgeComponent {
  componentTitle = input.required<string>();
  subtitle = input<string>('');
  leftIconName = input.required<string>();
  iconImageAlt = input<string>('');
  badge = input.required<IBmbBadgeInfo>();
  isDisable = input<boolean>(false);
  isError = input<boolean>(false);

  getClickButton = output<MouseEvent>();

  handleClick(event: any): void {
    this.getClickButton.emit(event);
  }
}
