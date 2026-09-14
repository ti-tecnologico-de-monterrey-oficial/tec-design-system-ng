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
} from '../../../_shared/types/index';
import { BmbTextLinkComponent } from '../../bmb-text-link/bmb-text-link.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { IBmbContentLayoutSummary } from '../../../_shared/types/components/user-summary';
import {
  getUserSummaryContentClass,
  getUserSummaryEmailAsLink,
  getUserSummaryName,
  getUserSummarySalutationClasses,
} from '../../../_shared/logic/components/user-summary';

export type { IBmbContentLayoutSummary };

@Component({
  selector: 'bmb-user-summary-content',
  standalone: true,
  imports: [
    CommonModule,
    BmbUserImageComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbTextLinkComponent,
    BmbIconComponent,
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
    return getUserSummaryContentClass(
      mainClassName,
      this.name(),
      this.contentLayout(),
    );
  }

  getSalutationClasses(
    mainClassName: string,
    isRole: boolean = false,
  ): string[] {
    return getUserSummarySalutationClasses({
      mainClassName,
      name: this.name(),
      contentLayout: this.contentLayout(),
      isProfile: this.isProfile(),
      isRole,
    });
  }

  getName(): string {
    return getUserSummaryName(this.name(), this.salutation(), this.isProfile());
  }

  handleUserClick(event: MouseEvent) {
    this.onUserClick.emit(event);
  }

  get emailAsLink(): IBmbLinkConfiguration | null {
    return getUserSummaryEmailAsLink(this.email());
  }
}
