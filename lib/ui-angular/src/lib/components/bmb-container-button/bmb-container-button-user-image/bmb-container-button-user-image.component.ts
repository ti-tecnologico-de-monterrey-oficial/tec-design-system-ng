import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbUserImageComponent } from '../../bmb-user-image/bmb-user-image.component';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbContainerButtonBaseComponent } from '../bmb-container-button-base/bmb-container-button-base.component';

@Component({
  selector: 'bmb-container-button-user-image',
  standalone: true,
  imports: [
    BmbContainerButtonBaseComponent,
    BmbUserImageComponent,
    BmbTitleComponent,
    BmbIconComponent,
  ],
  templateUrl: './bmb-container-button-user-image.component.html',
  styleUrl: './bmb-container-button-user-image.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbContainerButtonUserImageComponent {
  fullName = input.required<string>();
  email = input<string>('');
  avatarURL = input<string>('');
  avatarAlt = input<string>('');
  rightIconName = input.required<string>();
  iconImageAlt = input<string>('');
  isDisabled = input<boolean>(false);
  isError = input<boolean>(false);

  getClickButton = output<MouseEvent>();

  handleClick(event: any): void {
    this.getClickButton.emit(event);
  }
}
