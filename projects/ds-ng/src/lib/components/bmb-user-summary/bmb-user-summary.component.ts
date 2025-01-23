import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbButtonDirective } from '../../directives/button.directive';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';

@Component({
  selector: 'bmb-user-summary',
  standalone: true,
  imports: [CommonModule, BmbButtonDirective, BmbUserImageComponent],
  templateUrl: './bmb-user-summary.component.html',
  styleUrl: './bmb-user-summary.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbUserSummaryComponent {
  isProfile = input<boolean>(false);
  name = input<string>('');
  id = input<string>(''); //Deprecated
  userId = input<string>('');
  image = input<string>('');
  infoCareer = input<string>('');
  noBox = input<boolean>(false);
  salutation = input<string>('Buenas tardes');

  onClick = output<void>();
  getUserId(): string {
    return (!!this.userId() && this.userId()) || this.id();
  }

  handleClick(): void {
    this.onClick.emit();
  }
}
