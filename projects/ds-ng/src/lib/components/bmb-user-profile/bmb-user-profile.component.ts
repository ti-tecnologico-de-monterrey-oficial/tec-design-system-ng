import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../directives/button.directive';
import { BmbUserSummaryComponent } from '../bmb-user-summary/bmb-user-summary.component';
import { IBmbActionHeader, IBmbTargetLink, IBmbUserInfo } from '../../types';
import { BmbHeaderMitecComponent } from '../bmb-header-mitec/bmb-header-mitec.component';
import { BmbTextLinkComponent } from '../bmb-text-link/bmb-text-link.component';

@Component({
  selector: 'bmb-user-profile',
  standalone: true,
  imports: [
    BmbHeaderMitecComponent,
    BmbButtonDirective,
    BmbUserSummaryComponent,
    BmbTextLinkComponent,
  ],
  styleUrl: './bmb-user-profile.component.scss',
  template: `
    <bmb-header-mitec [actionHeaders]="actionHeaders()">
      <section class="bmb_user-profile">
        <bmb-user-summary
          [image]="userInfo().profilePicture"
          [name]="userInfo().fullName"
          [id]="userInfo().id"
        />
        <section class="bmb_user-profile-sublabel">
          <bmb-text-link
            [textLink]="anotherAccountLabel()"
            icon=""
            [link]="'https://www.youtube.com'"
            [target]="'_blank'"
          />
        </section>
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
  anotherAccountLink = input<string>('');
  anotherAccountTarget = input<IBmbTargetLink>('_blank');
  buttonLabel = input<string>('Ingresar');
  userInfo = input.required<IBmbUserInfo>();
  actionHeaders = input<IBmbActionHeader[]>([
    {
      icon: '../assets/images/social-icons/icon_Apple.svg',
      link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-user-profile--documentation',
      action: () => {},
    },
    {
      icon: '../assets/images/social-icons/icon_Android.svg',
      link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-user-profile--documentation',
      action: () => {},
    },
    {
      icon: '../assets/images/social-icons/icon_Twitter.svg',
      link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-user-profile--documentation',
      action: () => {},
    },
    {
      icon: '../assets/images/social-icons/icon_Facebook.svg',
      link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-user-profile--documentation',
      action: () => {},
    },
    {
      icon: '../assets/images/social-icons/icon_Instagram.svg',
      link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-user-profile--documentation',
      action: () => {},
    },
    {
      icon: '../assets/images/social-icons/icon_Youtube.svg',
      link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-user-profile--documentation',
      action: () => {},
    },
  ]);

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
