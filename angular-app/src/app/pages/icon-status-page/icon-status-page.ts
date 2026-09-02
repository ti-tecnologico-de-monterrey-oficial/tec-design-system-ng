import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbIconStatusComponent,
  type IBmbStatusAppearance,
  type IBmbStatusIconColor,
} from 'ui-angular';

@Component({
  selector: 'app-icon-status-page',
  imports: [BmbIconStatusComponent],
  templateUrl: './icon-status-page.html',
  styleUrl: './icon-status-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconStatusPage {
  readonly icons = ['check', 'info', 'warning', 'close', 'school'];
  readonly appearances: IBmbStatusAppearance[] = [
    'success',
    'event',
    'warning',
    'error',
  ];
  readonly iconColors: IBmbStatusIconColor[] = ['primary', 'secondary'];
  readonly icon = signal('check');
  readonly statusAppearance = signal<IBmbStatusAppearance | undefined>(
    'success',
  );
  readonly iconColor = signal<IBmbStatusIconColor>('primary');

  setIcon(value: string): void {
    this.icon.set(value);
  }

  setStatusAppearance(value: string): void {
    this.statusAppearance.set(
      value ? (value as IBmbStatusAppearance) : undefined,
    );
  }

  setIconColor(value: IBmbStatusIconColor): void {
    this.iconColor.set(value);
  }
}
