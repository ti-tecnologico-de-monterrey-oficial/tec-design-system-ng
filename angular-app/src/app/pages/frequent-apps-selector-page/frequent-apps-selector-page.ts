import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import {
  BmbFrequentAppsSelectorComponent,
  IBmbApp,
  IBmbInteractiveIconType,
} from 'ui-angular';

const APPS: IBmbApp[] = [
  {
    icon: 'home',
    title: 'Home',
    appearance: 'red',
    callbackParam: { customData: 'Home Data' },
  },
  {
    icon: 'settings',
    title: 'My Page',
    appearance: 'yellow',
    callbackParam: { customData: 'My Page Data' },
  },
  {
    icon: 'settings',
    title: 'School Calendar',
    appearance: 'yellow',
    callbackParam: { customData: 'School Calendar Data' },
  },
  {
    icon: 'settings',
    title: 'Configuration',
    appearance: 'yellow',
    callbackParam: { customData: 'Configuration Data' },
  },
  {
    icon: 'home',
    title: 'Home',
    appearance: 'red',
    callbackParam: { customData: 'Home Data' },
  },
  {
    icon: 'settings',
    title: 'My Page',
    appearance: 'yellow',
    callbackParam: { customData: 'My Page Data' },
  },
  {
    icon: 'settings',
    title: 'School Calendar',
    appearance: 'yellow',
    callbackParam: { customData: 'School Calendar Data' },
  },
  {
    icon: 'settings',
    title: 'Configuration',
    appearance: 'yellow',
    callbackParam: { customData: 'Configuration Data' },
  },
];

@Component({
  selector: 'app-frequent-apps-selector-page',
  imports: [BmbFrequentAppsSelectorComponent],
  templateUrl: './frequent-apps-selector-page.html',
  styleUrl: './frequent-apps-selector-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrequentAppsSelectorPage {
  readonly layouts: IBmbInteractiveIconType[] = [
    'regular',
    'button',
    'app_drawer',
  ];
  readonly apps = signal(APPS);
  readonly layout = signal<IBmbInteractiveIconType>('regular');
  readonly componentTitle = signal('Services');
  readonly lastClickedApp = signal('');

  selectLayout(layout: IBmbInteractiveIconType): void {
    this.layout.set(layout);
  }

  setComponentTitle(value: string): void {
    this.componentTitle.set(value);
  }

  handleAppClick(app: unknown): void {
    this.lastClickedApp.set((app as IBmbApp).title);
  }
}
