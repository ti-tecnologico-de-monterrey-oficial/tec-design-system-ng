import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { BmbAlertCenterDetailComponent } from 'ui-angular';
import type { IBmbDataAlert } from 'ui-angular';

@Component({
  selector: 'app-alert-center-detail-page',
  imports: [BmbAlertCenterDetailComponent],
  templateUrl: './alert-center-detail-page.html',
  styleUrl: './alert-center-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertCenterDetailPage {
  readonly title = signal('Alert title');
  readonly textStyle = signal<'normal' | 'bold' | 'italic' | 'underline'>('normal');
  readonly linkHref = signal('https://tec.mx');
  readonly showHtml = signal(true);

  readonly alert = computed<IBmbDataAlert>(() => ({
    id: 'alert-demo',
    title: this.title(),
    description: [
      {
        type: 'paragraph',
        text: 'This is a paragraph example with a normal style and dynamic content.',
        style: this.textStyle(),
      },
      {
        type: 'title',
        text: 'Example title',
        style: this.textStyle(),
      },
      {
        type: 'link',
        text: 'Tecnológico de Monterrey',
        href: this.linkHref(),
        style: this.textStyle(),
      },
      {
        type: 'html',
        text: this.showHtml()
          ? '<div><strong>HTML</strong> content rendered safely.</div>'
          : '<p>Hidden HTML block</p>',
      },
    ],
    date: 'today',
    isRead: false,
    time: '09:00',
    type: 'normal',
    isFavorite: false,
    isArchived: false,
  }));
}
