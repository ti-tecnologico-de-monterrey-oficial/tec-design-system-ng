import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbBoxIconComponent } from 'ui-angular';

@Component({
  selector: 'app-box-icon-page',
  imports: [BmbBoxIconComponent],
  templateUrl: './box-icon-page.html',
  styleUrl: './box-icon-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxIconPage {
  readonly iconName = signal('home');
  readonly iconAlt = signal('Home icon');
  readonly boxColor = signal('semantic-success');
  readonly boxSize = signal<'small' | 'regular'>('small');
  readonly boxShape = signal<'square' | 'circle'>('square');
  readonly isIconFilled = signal(true);
}
