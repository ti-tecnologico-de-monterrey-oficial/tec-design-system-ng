import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../directives/button.directive';
import { IBmbActionHeader, IBmbTargetLink, IBmbUserInfo } from '../../types';
import {
  BmbHeaderMitecComponent,
  IBmbActionHeaderLinks,
} from '../bmb-header-mitec/bmb-header-mitec.component';
import { BmbUserProfileContentComponent } from './bmb-user-profile-content/bmb-user-profile-content.component';

@Component({
  selector: 'bmb-user-profile',
  standalone: true,
  imports: [
    BmbHeaderMitecComponent,
    BmbUserProfileContentComponent,
    BmbButtonDirective,
  ],
  styleUrl: './bmb-user-profile.component.scss',
  template: `
    <bmb-header-mitec
      [headerLabel]="headerLabel()"
      [actionHeaderLinks]="actionHeaderLinks()"
    >
      <bmb-user-profile-content
        [anotherAccountLabel]="anotherAccountLabel()"
        [anotherAccountLink]="anotherAccountLink()"
        [anotherAccountTarget]="anotherAccountTarget()"
        [userInfo]="userInfo()"
      />
      <button bmbButton size="large" (click)="handleContinue()">
        {{ buttonLabel() }}
      </button>
    </bmb-header-mitec>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbUserProfileComponent {
  headerLabel = input<string>('ESTUDIANTES');
  anotherAccountLabel = input<string>('Ingresar con otra cuenta');
  anotherAccountLink = input<string>('');
  anotherAccountTarget = input<IBmbTargetLink>('_blank');
  buttonLabel = input<string>('Ingresar');
  userInfo = input.required<IBmbUserInfo>();
  actionHeaderLinks = input<IBmbActionHeaderLinks>();
  actionHeaders = input<IBmbActionHeader[]>([]); //Deprecated

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
