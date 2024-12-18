import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../directives/button.directive';
import { BmbUserSummaryComponent } from '../bmb-user-summary/bmb-user-summary.component';
import { IBmbUserInfo } from '../../types';
import { BmbHeaderMitecComponent } from '../bmb-header-mitec/bmb-header-mitec.component';

@Component({
  selector: 'bmb-user-profile',
  standalone: true,
  imports: [
    BmbHeaderMitecComponent,
    BmbButtonDirective,
    BmbUserSummaryComponent,
  ],
  templateUrl: './bmb-user-profile.component.html',
  styleUrl: './bmb-user-profile.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbUserProfileComponent {
  headerLabel = input<string>();
  anotherAccountLabel = input<string>('Ingresar con otra cuenta');
  buttonLabel = input<string>('Ingresar');
  userInfo = input.required<IBmbUserInfo>();

  onRequest = output<any>();
  onContinue = output();

  isLoading: boolean = false;

  handleContinue(): void {
    this.isLoading = true;
    this.onRequest.emit({
      action: 'profile',
      callback: () => {
        this.isLoading = false;
        this.onContinue.emit();
      },
    });
  }
}
