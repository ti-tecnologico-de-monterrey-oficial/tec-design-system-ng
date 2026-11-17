import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { getAlertCenterDetailClass } from '../../../_shared/logic/components/alert-center-detail';
import { sanitizeContent } from '../../../_shared/logic/sanitizeContent';
import type {
  IBmbDataAlert,
  IBmbDataAlertsParsed,
} from '../../../_shared/types/components/alert-center';
import type { IBmbAlertCenterDetailTextStyle } from '../../../_shared/types/components/alert-center-detail';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { TranslatePipe } from '../../../pipes/translations';
import { BmbImageComponent } from '../../bmb-image/bmb-image.component';

@Component({
  selector: 'bmb-alert-center-detail',
  standalone: true,
  imports: [CommonModule, BmbImageComponent, BmbButtonDirective, TranslatePipe],
  templateUrl: './bmb-alert-center-detail.component.html',
  styleUrl: './bmb-alert-center-detail.component.scss',
})
export class BmbAlertCenterDetailComponent {
  alert = input.required<IBmbDataAlertsParsed | IBmbDataAlert>();

  alertEvent = output<IBmbDataAlertsParsed | IBmbDataAlert>();

  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);

  sanitizedHtml(html: string) {
    const clean = sanitizeContent(html);
    return this.sanitizer.bypassSecurityTrustHtml(clean); // NOSONAR Content is sanitized with DOMPurify - safe to bypass Angular sanitization
  }

  getAlertContentClass(style?: IBmbAlertCenterDetailTextStyle): string {
    return getAlertCenterDetailClass(style);
  }

  handleAlertEvent(alert: IBmbDataAlertsParsed | IBmbDataAlert): void {
    this.alertEvent.emit(alert);
  }
}
