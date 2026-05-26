import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { IBmbActionHeader, IBmbTargetLink, IBmbUserInfo } from '../../types';
import {
  BmbHeaderMitecComponent,
  IBmbActionHeaderLinks,
} from '../bmb-header-mitec/bmb-header-mitec.component';
import { BmbUserProfileContentComponent } from './bmb-user-profile-content/bmb-user-profile-content.component';
import { TranslatePipe } from '../../pipes/translations';

@Component({
  selector: 'bmb-user-profile',
  standalone: true,
  imports: [
    BmbHeaderMitecComponent,
    BmbUserProfileContentComponent,
    BmbButtonDirective,
    TranslatePipe,
  ],
  styleUrl: './bmb-user-profile.component.scss',
  template: `
    <bmb-header-mitec
      [headerLabel]="headerLabel() || ('user_profile.header' | translate)"
      [actionHeaderLinks]="actionHeaderLinks()"
    >
      <bmb-user-profile-content
        [anotherAccountLabel]="
          anotherAccountLabel() || ('user_profile.another_account' | translate)
        "
        [anotherAccountLink]="anotherAccountLink()"
        [anotherAccountTarget]="anotherAccountTarget()"
        [userInfo]="userInfo()"
      />
      <button bmbButton size="large" (click)="handleContinue()">
        {{ buttonLabel() || ('user_profile.button_label' | translate) }}
      </button>
    </bmb-header-mitec>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbUserProfileComponent {
  headerLabel = input<string>();
  anotherAccountLabel = input<string>();
  anotherAccountLink = input<string>('');
  anotherAccountTarget = input<IBmbTargetLink>('_blank');
  buttonLabel = input<string>();
  userInfo = input.required<IBmbUserInfo>();
  actionHeaderLinks = input<IBmbActionHeaderLinks>();

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
