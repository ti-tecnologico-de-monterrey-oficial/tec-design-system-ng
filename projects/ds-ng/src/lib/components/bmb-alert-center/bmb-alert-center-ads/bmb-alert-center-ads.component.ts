import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IBmbAlertEmptyState, IBmbDataAlert } from '../types';
import { CommonModule } from '@angular/common';
import { BmbImageComponent } from '../../bmb-image/bmb-image.component';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { BmbCarouselComponent } from '../../bmb-carousel/bmb-carousel.component';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbAlertCenterEmptyComponent } from '../bmb-alert-center-empty/bmb-alert-center-empty.component';
import DOMPurify from 'dompurify';

@Component({
  selector: 'bmb-alert-center-ads',
  standalone: true,
  imports: [
    CommonModule,
    BmbImageComponent,
    BmbButtonDirective,
    BmbCarouselComponent,
    BmbLayoutItemDirective,
    BmbAlertCenterEmptyComponent,
  ],
  templateUrl: './bmb-alert-center-ads.component.html',
  styleUrl: './bmb-alert-center-ads.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAlertCenterAdsComponent {
  advertisements = input.required<IBmbDataAlert[]>();
  emptyStateData = input<IBmbAlertEmptyState>({
    primaryText: 'No tienes notificaciones para mostrar',
    secondaryText: '',
    tertiaryText: '',
    buttonText: '',
    size: 'large',
    showButton: false,
  });

  alertEvent = output<IBmbDataAlert>();

  constructor(private sanitizer: DomSanitizer) {}

  handleAlertEvent(alert: IBmbDataAlert) {
    this.alertEvent.emit(alert);
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
