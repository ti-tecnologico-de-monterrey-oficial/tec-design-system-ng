import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbHomeSectionComponent } from 'ui-angular';

@Component({
  selector: 'app-home-section-test-component',
  imports: [BmbHomeSectionComponent],
  templateUrl: './home-section-test.component.html',
  styleUrl: './home-section-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSectionTestComponent {
  readonly componentTitle = signal('Section name');
  readonly icon = signal('chevron_right');
  readonly target = signal('_blank');
  readonly link = signal('https://www.youtube.com/');
}