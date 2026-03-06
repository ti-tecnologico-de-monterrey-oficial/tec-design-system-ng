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
import { BmbActionIconComponent } from '../../bmb-action-icon/bmb-action-icon.component';

@Component({
  selector: 'bmb-container-button-complex',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerButtonBaseComponent,
    BmbIconComponent,
    BmbTitleComponent,
    BmbActionIconComponent,
  ],
  templateUrl: './bmb-container-button-complex.component.html',
  styleUrl: './bmb-container-button-complex.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbContainerButtonComplexComponent {
  componentTitle = input.required<string>();
  subtitle = input<string>('');
  leftIconName = input<string>('');
  iconImageAlt = input<string>('');
  actionIconName = input<string>();
  actionIconImageAlt = input<string>('');
  isDisabled = input<boolean>(false);
  isError = input<boolean>(false);

  getClickButton = output<MouseEvent>();
  getClickTrailingContent = output<MouseEvent>();

  handleClick(event: any): void {
    this.getClickButton.emit(event);
  }

  handleTrailingContent(event: any): void {
    this.getClickTrailingContent.emit(event);
  }
}
