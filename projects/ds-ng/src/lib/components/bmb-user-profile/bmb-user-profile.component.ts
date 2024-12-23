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
  styleUrl: './bmb-user-profile.component.scss',
  template: `
    <bmb-header-mitec [headerLabel]="headerLabel()">
      <section class="bmb_user-profile">
        <bmb-user-summary
          [image]="userInfo().profilePicture"
          [name]="userInfo().fullName"
          [id]="userInfo().id"
        />
        <p class="bmb_user-profile-sublabel">{{ anotherAccountLabel() }}</p>
      </section>
      <button bmbButton size="large" (click)="handleContinue()">
        {{ buttonLabel() }}
      </button>
    </bmb-header-mitec>
  `,
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
