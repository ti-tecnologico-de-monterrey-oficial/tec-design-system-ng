import {
  ChangeDetectionStrategy,
  Component,
  effect,
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
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface IBmbCardNoticeDescription {
  pageOne?: string | SafeHtml;
  pageTwo?: string | SafeHtml;
}

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

  onClose = output<void>();
  onClickBtn = output<void>();

  activeIndex = 0;

  constructor(private readonly sanitizer: DomSanitizer) {
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
      ? this.sanitizer.bypassSecurityTrustHtml(value as string)
      : undefined; // NOSONAR Content is sanitized with DOMPurify - safe to bypass
  }
}
