import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  inject,
  input,
  model,
  output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbCheckExternalLinkButtonComponent } from '../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { CommonModule } from '@angular/common';
import { IBmbTargetLink } from '../../_shared/types/utils';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BmbTooltipBaseComponent } from '../bmb-tooltip/bmb-tooltip-base/bmb-tooltip-base.component';
import { isImage } from '../../_shared/logic/utils';
import {
  getActionIcon,
  getSanitizedSvg,
} from '../../_shared/logic/components/action-icon';

@Component({
  selector: 'bmb-action-icon',
  standalone: true,
  imports: [
    CommonModule,
    BmbCheckExternalLinkButtonComponent,
    BmbIconComponent,
    BmbTooltipBaseComponent,
  ],
  templateUrl: './bmb-action-icon.component.html',
  styleUrl: './bmb-action-icon.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbActionIconComponent {
  testId = input<string>('action-icon-button');
  idElement = input<string>();
  icon = input.required<string>();
  alt = input<string>('');
  iconSize = input<number | undefined>();
  isFill = input<boolean>(true); //Deprecated
  toggleIconActive = input<string | undefined>();
  isToggleActive = model<boolean | undefined>(false);
  isAccentColor = model<boolean | undefined>(true);
  dotNotification = input<number>();
  target = input<IBmbTargetLink>();
  link = input<string>();
  disabled = input<boolean>(false);
  isSVGTemplate = input<boolean>();
  tooltipText = input<string>('');

  imageNotFoundError = output<void>();
  buttonPress = output<MouseEvent>();
  buttonClick = output<MouseEvent>();

  customActionIcon = contentChild<TemplateRef<undefined>>('customActionIcon');
  sanitizer: DomSanitizer = inject(DomSanitizer);

  getIcon(): string {
    return getActionIcon({
      icon: this.icon(),
      toggleIconActive: this.toggleIconActive(),
      isToggleActive: this.isToggleActive(),
    });
  }

  handlePress(event?: MouseEvent): void {
    this.buttonPress.emit(event || new MouseEvent('press'));
  }

  handleClick(event?: MouseEvent) {
    if (this.toggleIconActive()) {
      this.isToggleActive.update((value) => !value);
    }

    this.buttonClick.emit(event || new MouseEvent('click'));
  }

  get safeSVG(): SafeHtml | null {
    const sanitized = getSanitizedSvg({
      isSVGTemplate: this.isSVGTemplate(),
      customActionIcon: this.customActionIcon(),
    });

    if (sanitized === null) return null;

    return this.sanitizer.bypassSecurityTrustHtml(sanitized); // NOSONAR Content is sanitized with DOMPurify - safe to bypass Angular sanitization
  }

  isImage(icon: string): boolean {
    return isImage(icon);
  }

  handleImageNotFoundError(): void {
    this.imageNotFoundError.emit();
  }
}
