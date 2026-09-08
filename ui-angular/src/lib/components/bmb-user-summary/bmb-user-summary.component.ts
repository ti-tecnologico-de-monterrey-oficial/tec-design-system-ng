import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { BmbUserSummaryContentComponent } from './bmb-user-summary-content/bmb-user-summary-content.component';
import { TranslatePipe } from '../../pipes/translations';

@Component({
  selector: 'bmb-user-summary',
  standalone: true,
  imports: [
    CommonModule,
    BmbUserSummaryContentComponent,
    BmbButtonDirective,
    TranslatePipe,
  ],
  templateUrl: './bmb-user-summary.component.html',
  styleUrl: './bmb-user-summary.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbUserSummaryComponent {
  isProfile = input<boolean>(false);
  name = input<string>('');
  id = input<string>('');
  image = input<string>('');
  infoCareer = input<string>('');
  noBox = input<boolean>(false);
  salutation = input<string>();

  onClick = output<MouseEvent>();

  handleClick(event: MouseEvent): void {
    this.onClick.emit(event);
  }
}
