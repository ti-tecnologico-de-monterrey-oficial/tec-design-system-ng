import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbDataAlertsParsed } from '../../../types';
import { CommonModule } from '@angular/common';
import { BmbImageComponent } from '../../bmb-image/bmb-image.component';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import DOMPurify from 'dompurify';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'bmb-notification-card-modal',
  templateUrl: './bmb-notification-card-modal.component.html',
  styleUrl: './bmb-notification-card-modal.component.scss',
  standalone: true,
  imports: [CommonModule, BmbImageComponent, BmbButtonDirective],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbNotificationCardModalComponent {
  visibleAlert = input<IBmbDataAlertsParsed | null>(null);

  constructor(private sanitizer: DomSanitizer) {}

  handleAlertEvent(alert: IBmbDataAlertsParsed | null): void {
    console.warn('unhandled event', alert);
  }

  sanitizedHtml(html: string) {
      const clean = DOMPurify.sanitize(html, {
        FORBID_TAGS: [
          'script',
          'style',
          'iframe',
          'object',
          'embed',
          'base',
          'meta',
          'form',
        ],
        FORBID_ATTR: [
          'style',
          'onerror',
          'onclick',
          'onkeyup',
          'onload',
          'onmouseover',
          'onfocus',
          'onkeydown',
          'onchange',
          'onblur',
          'onsubmit',
        ],
      });
      return this.sanitizer.bypassSecurityTrustHtml(clean);
    }
}
