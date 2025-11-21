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

  constructor(private sanitizer: DomSanitizer) {}

  sanitizedHtml(html: string) {
    const clean = DOMPurify.sanitize(html, forbidTagsAndAttributes);
    return this.sanitizer.bypassSecurityTrustHtml(clean);
  }

  handleAlertEvent(alert: IBmbDataAlertsParsed | IBmbDataAlert): void {
    this.alertEvent.emit(alert);
  }
}
