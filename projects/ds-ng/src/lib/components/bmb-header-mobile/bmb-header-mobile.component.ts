import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { BmbLogoComponent } from '../bmb-logo/bmb-logo.component';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
@Component({
  selector: 'bmb-header-mobile',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbLogoComponent,
    BmbContainerComponent,
    BmbUserImageComponent,
  ],
  styleUrl: './bmb-header-mobile.component.scss',
  templateUrl: './bmb-header-mobile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbHeaderMobileComponent {
  @Input() text: string = '';

  @Input() userImage: string = '';
  @Input() userAltImage: string = '';
  @Input() userLink: string = '';
  @Input() userTarget: string = '';

  @Input() logo: string = '';
  @Input() altLogo: string = '';
  @Input() logoLink: string = '';
  @Input() logoTarget: string = '';

  @Input() iconLeft: string = '';
  @Input() iconRight: string = '';
  @Input() iconRight2: string = '';

  // Event handlers
  @Output() onIconLeftClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() onIconRightClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() onIconRight2Click: EventEmitter<void> = new EventEmitter<void>();

  handleIconLeftClick() {
    this.onIconLeftClick.emit();
  }

  handleIconRightClick() {
    this.onIconRightClick.emit();
  }

  handleIconRight2Click() {
    this.onIconRight2Click.emit();
  }
}
