import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';
import { BmbContainerButtonBaseComponent } from '../bmb-container-button-base/bmb-container-button-base.component';

@Component({
  selector: 'bmb-container-button-square',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerButtonBaseComponent,
    BmbIconComponent,
    BmbTitleComponent,
  ],
  templateUrl: './bmb-container-button-square.component.html',
  styleUrl: './bmb-container-button-square.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbContainerButtonSquareComponent {
  componentTitle = input.required<string>();
  subtitle = input<string>('');
  iconName = input.required<string>();
  iconImageAlt = input<string>('');
  isDisabled = input<boolean>(false);
  isError = input<boolean>(false);

  getClickButton = output<MouseEvent>();

  handleClick(event: any): void {
    this.getClickButton.emit(event);
  }
}
