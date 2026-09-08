import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbSimpleHeaderComponent } from 'ui-angular';

@Component({
  selector: 'app-simple-header-page',
  imports: [BmbSimpleHeaderComponent],
  templateUrl: './simple-header-page.html',
  styleUrl: './simple-header-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleHeaderPage {
  readonly icons = ['', 'apps', 'settings', 'notifications', 'more_vert'];
  readonly componentTitle = signal('Simple header');
  readonly deprecatedTitle = signal('');
  readonly icon = signal('apps');
  readonly iconAlternativeColor = signal(false);
  readonly lastEvent = signal('Sin interacciones');

  handleIconClick(event: MouseEvent | any): void {
    this.lastEvent.set(`onIconClick: ${event.type ?? 'evento'}`);
  }
}
