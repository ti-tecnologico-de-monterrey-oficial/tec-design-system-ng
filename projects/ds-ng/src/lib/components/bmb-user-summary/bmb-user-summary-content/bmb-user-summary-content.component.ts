import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbUserImageComponent } from '../../bmb-user-image/bmb-user-image.component';
import { CommonModule } from '@angular/common';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import {
  IBmbLinkConfiguration,
  IBmbUserImageSize,
  SizeNames,
} from '../../../types';
import { BmbTextLinkComponent } from '../../bmb-text-link/bmb-text-link.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';

export type IBmbContentLayoutSummary = 'column' | 'row';

@Component({
  selector: 'bmb-user-summary-content',
  standalone: true,
  imports: [
    CommonModule,
    BmbUserImageComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbTextLinkComponent,
    BmbIconComponent
  ],
  templateUrl: './bmb-user-summary-content.component.html',
  styleUrl: './bmb-user-summary-content.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbUserSummaryContentComponent {
  isProfile = input<boolean>(false);
  name = input<string>('');
  userId = input<string>('');
  image = input<string>('');
  isImageBordered = input<boolean>(true);
  altImage = input<string>('Alt image description');
  imageSize = input<IBmbUserImageSize>('mobile-large');
  infoCareer = input<string>('');
  campus = input<string>('');
  role = input<string>('');
  email = input<string | IBmbLinkConfiguration>('');
  salutation = input<string>('Buenas tardes');
  contentLayout = input<IBmbContentLayoutSummary>('column');
  gapSize = input<SizeNames>('none');
  CURP = input<string>();
  additionalInfo = input<string>();
  idDigital = input<string>();

  onUserClick = output<MouseEvent>();

  getClass(mainClassName: string): string[] {
    const classes: string[] = [];
    if (!!this.name()) classes.push(`${mainClassName}-${this.contentLayout()}`);

    return classes;
  }

  getSalutationClasses(
    mainClassName: string,
    isRole: boolean = false,
  ): string[] {
    const classes: string[] = this.getClass(mainClassName);

    if (!this.isProfile() && this.contentLayout() === 'column')
      classes.push(`${mainClassName}-salutation`);
    if (isRole && this.contentLayout() === 'row') {
      classes.push('bmb_top-bar-user-section-role');
      classes.push('bmb_user-summary_content-wrapper-role');
    }
    return classes;
  }

  getName(): string {
    if (!!this.salutation() && !this.isProfile())
      return `¡${this.salutation()}${!!this.name() ? ' '.concat(this.name()) : ''}!`;
    return this.name();
  }

  handleUserClick(event: MouseEvent) {
    this.onUserClick.emit(event);
  }

  get emailAsLink(): IBmbLinkConfiguration | null {
    const value = this.email();
    return typeof value === 'object' && value !== null ? value : null;
  }
}
