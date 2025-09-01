import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { CommonModule } from '@angular/common';
import { BmbUserSummaryContentComponent } from '../bmb-user-summary/bmb-user-summary-content/bmb-user-summary-content.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbImageComponent } from '../bmb-image/bmb-image.component';

@Component({
  selector: 'bmb-digital-id',
  standalone: true,
  imports: [
    CommonModule,
    BmbUserSummaryContentComponent,
    BmbActionIconComponent,
    BmbImageComponent,
    BmbButtonDirective,
  ],
  templateUrl: './bmb-digital-id.component.html',
  styleUrl: './bmb-digital-id.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbDigitalIdComponent {
  name = input.required<string>();
  surname = input.required<string>();
  registration = input.required<string>();
  campus = input.required<string>();
  career = input.required<string>();
  role = input.required<string>();
  textButton = input<string>();
  icon = input<string>('qr_code_scanner');
  imgProfile = input.required<string>();
  imgBackground = input.required<string>();
  hideButton = input<boolean>(false);
  secondaryTextButton = input<string>('Descargar ID a PDF');
  secondaryIconButton = input<string>('download_2');

  logoSrc = 'assets/images/tec-logo.svg';

  close = output<MouseEvent>();
  access = output<MouseEvent>();
  onSecondaryClick = output<MouseEvent>();

  handleSecondaryClick(event: MouseEvent) {
    this.onSecondaryClick.emit(event);
  }

  closeDigitalId(event?: MouseEvent) {
    this.close.emit(event || new MouseEvent('click'));
  }

  clickAccess(event?: MouseEvent) {
    this.access.emit(event || new MouseEvent('click'));
  }

  getFullName(): string {
    return this.name().concat(' ').concat(this.surname());
  }
}
