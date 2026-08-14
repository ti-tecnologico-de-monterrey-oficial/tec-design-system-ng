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
import { BmbCheckExternalLinkButtonComponent } from '../../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { CommonModule } from '@angular/common';
import { IBmbTargetLink } from '../../../_shared/types/utils';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { sanitizeContent } from '../../../_shared/logic/sanitizeContent';
import { BmbTooltipBaseComponent } from '../bmb-tooltip/bmb-tooltip-base/bmb-tooltip-base.component';
import { isImage } from '../../../_shared/logic/utils';
import {
  getActionIconEvent,
  IBmbActionIconEventType,
} from '../../../_shared/logic/components/action-icon';

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
  buttonPress = output<IBmbActionIconEventType>();
  buttonClick = output<IBmbActionIconEventType>();

  customActionIcon = contentChild<TemplateRef<undefined>>('customActionIcon');
  sanitizer: DomSanitizer = inject(DomSanitizer);

  getIcon(): string {
    if (this.isToggleActive() && this.toggleIconActive())
      return this.toggleIconActive() || '';
    return this.icon();
  }

  handlePress(
    event?:
      | MouseEvent
      | IBmbActionIconEventType
      | { event: MouseEvent; name: string },
  ): void {
    const sourceEvent = event ?? new MouseEvent('press');
    this.buttonPress.emit(
      getActionIconEvent(sourceEvent, this.getIcon()),
    );
  }

  handleClick(
    event?:
      | MouseEvent
      | IBmbActionIconEventType
      | { event: MouseEvent; name: string },
  ) {
    if (this.toggleIconActive()) {
      this.isToggleActive.update((value) => !value);
    }

    const sourceEvent = event ?? new MouseEvent('click');
    this.buttonClick.emit(getActionIconEvent(sourceEvent, this.getIcon()));
  }

  get safeSVG(): SafeHtml | null {
    if (
      (!this.isSVGTemplate() && this.customActionIcon()) ||
      (this.isSVGTemplate() && this.customActionIcon() === undefined)
    ) {
      return null;
    }

    const clean = sanitizeContent((this.customActionIcon() ?? '').toString());
    return this.sanitizer.bypassSecurityTrustHtml(clean); // NOSONAR Content is sanitized with DOMPurify - safe to bypass Angular sanitization
  }

  isImage(icon: string): boolean {
    return isImage(icon);
  }

  handleImageNotFoundError(): void {
    this.imageNotFoundError.emit();
  }
}
