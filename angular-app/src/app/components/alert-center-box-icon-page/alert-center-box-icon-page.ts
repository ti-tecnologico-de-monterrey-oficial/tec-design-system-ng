import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { BmbBoxIconComponent } from 'ui-angular';
import type { IBmbDataAlert } from 'ui-angular';
import { BmbAlertCenterDetailComponent } from 'ui-angular';

@Component({
  selector: 'app-alert-center-box-icon-page',
  imports: [BmbBoxIconComponent, BmbAlertCenterDetailComponent],
  templateUrl: './alert-center-box-icon-page.html',
  styleUrl: './alert-center-box-icon-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertCenterBoxIconPage {
  readonly iconName = signal('home');
  readonly iconAlt = signal('Home icon');
  readonly boxColor = signal('semantic-success');
  readonly boxSize = signal<'small' | 'regular'>('small');
  readonly boxShape = signal<'square' | 'circle'>('square');
  readonly isIconFilled = signal(true);

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
