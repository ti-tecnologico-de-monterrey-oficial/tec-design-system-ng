import { Component, input, output } from '@angular/core';
import {
  IBmbDataAlert,
  IBmbDataAlertsParsed,
} from '../../bmb-alert-center/types';
import { CommonModule } from '@angular/common';
import DOMPurify from 'dompurify';
import { DomSanitizer } from '@angular/platform-browser';
import { forbidTagsAndAttributes } from '../../../utils/utils';
import { BmbImageComponent } from '../../bmb-image/bmb-image.component';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';

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

  /**
   * Sanitizes HTML content using DOMPurify before bypassing Angular's built-in sanitization.
   * This is safe because:
   * 1. Content is pre-sanitized with DOMPurify using restrictive forbidTagsAndAttributes config
   * 2. DOMPurify removes all potentially dangerous HTML/JS content
   * 3. Only safe HTML tags and attributes are allowed through the configuration
   */
  sanitizedHtml(html: string) {
    const clean = DOMPurify.sanitize(html, forbidTagsAndAttributes);
    return this.sanitizer.bypassSecurityTrustHtml(clean); // NOSONAR: Content is sanitized with DOMPurify - safe to bypass Angular sanitization
  }

  handleAlertEvent(alert: IBmbDataAlertsParsed | IBmbDataAlert): void {
    this.alertEvent.emit(alert);
  }
}
