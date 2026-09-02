import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import { BmbDotPaginatorComponent } from '../bmb-dot-paginator/bmb-dot-paginator.component';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translations';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { logDeprecatedInput } from '../../_shared/logic/logDeprecatedInput';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { sanitizeContent } from '../../_shared/logic/sanitizeContent';

export interface IBmbCardNoticeDescription {
  pageOne?: string | SafeHtml;
  pageTwo?: string | SafeHtml;
}

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

@Component({
  selector: 'bmb-notice-card',
  standalone: true,
  imports: [
    CommonModule,
    BmbActionIconComponent,
    BmbDividerComponent,
    BmbDotPaginatorComponent,
    BmbButtonDirective,
    TranslatePipe,
    BmbIconComponent,
  ],
  templateUrl: './bmb-notice-card.component.html',
  styleUrl: './bmb-notice-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbNoticeCardComponent {
  src = input<string>('');
  icon = input<string>('');
  iconSize = input<number>(24);
  description = input<IBmbCardNoticeDescription>();
  buttonText = input<string>();
  link = input<string>('');
  closeBtnColor = input<'white' | 'black'>('white');
  componentTitle = input<string>();

  title = input<string>(); // deprecated

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onClose = output<void>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onClickBtn = output<void>();

  activeIndex = 0;

  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);

  constructor() {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );
    });
  }

  onDotPress(index: number): void {
    this.activeIndex = index;
  }

  handleClose() {
    this.onClose.emit();
  }

  handleClickBtn() {
    this.onClickBtn.emit();
  }

  getPage(page: keyof IBmbCardNoticeDescription): SafeHtml | undefined {
    const value = this.description()?.[page];
    return value
      ? this.sanitizer.bypassSecurityTrustHtml(sanitizeContent(value as string)) // NOSONAR Content is sanitized with DOMPurify - safe to bypass
      : undefined;
  }
}
