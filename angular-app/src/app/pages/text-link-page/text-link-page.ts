import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbTextLinkComponent,
  type IBmbIconPosition,
  type IBmbTextLinkStyle,
} from 'ui-angular';

@Component({
  selector: 'app-text-link-page',
  imports: [BmbTextLinkComponent],
  templateUrl: './text-link-page.html',
  styleUrl: './text-link-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextLinkPage {
  readonly textLinkStyles: IBmbTextLinkStyle[] = ['icon', 'underlined'];
  readonly iconPositions: IBmbIconPosition[] = ['left', 'right'];

  readonly textLink = signal('Ver más información');
  readonly textLinkStyle = signal<IBmbTextLinkStyle>('icon');
  readonly link = signal('https://bamboo.tec.mx');
  readonly icon = signal('arrow_forward');
  readonly iconPosition = signal<IBmbIconPosition>('right');
  readonly disabled = signal(false);
}
