import { Component, input, output } from '@angular/core';
import {
  IBmbDataAlert,
  IBmbDataAlertsParsed,
} from '../../bmb-alert-center/types';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { BmbImageComponent } from '../../bmb-image/bmb-image.component';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { sanitizeContent } from '../../../utils/sanitizeContent';

@Component({
  selector: 'bmb-alert-center-detail',
  standalone: true,
  imports: [CommonModule, BmbImageComponent, BmbButtonDirective],
  templateUrl: './bmb-alert-center-detail.component.html',
  styleUrl: './bmb-alert-center-detail.component.scss',
})
export class BmbAlertCenterDetailComponent {
  alert = input.required<IBmbDataAlertsParsed | IBmbDataAlert>();

  alertEvent = output<IBmbDataAlertsParsed | IBmbDataAlert>();

  constructor(private readonly sanitizer: DomSanitizer) {}


  sanitizedHtml(html: string) {
    const clean = sanitizeContent(html);
    return this.sanitizer.bypassSecurityTrustHtml(clean); // NOSONAR Content is sanitized with DOMPurify - safe to bypass Angular sanitization
  }

  handleAlertEvent(alert: IBmbDataAlertsParsed | IBmbDataAlert): void {
    this.alertEvent.emit(alert);
  }
}
