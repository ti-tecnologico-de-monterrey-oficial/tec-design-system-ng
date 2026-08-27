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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-container-button-default',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerButtonBaseComponent,
    BmbIconComponent,
    BmbTitleComponent,
  ],
  templateUrl: './bmb-container-button-default.component.html',
  styleUrl: './bmb-container-button-default.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbContainerButtonDefaultComponent {
  componentTitle = input.required<string>();
  subtitle = input<string>('');
  leftIconName = input<string>('');
  iconImageAlt = input<string>('');
  hideChevron = input<boolean>(false);
  isDisabled = input<boolean>(false);
  isError = input<boolean>(false);

  getClickButton = output<MouseEvent>();

  handleClick(event: any): void {
    this.getClickButton.emit(event);
  }
}
