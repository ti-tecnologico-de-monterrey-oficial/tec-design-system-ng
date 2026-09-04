import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { IBmbTargetLink } from 'ui-angular';
import { BmbCheckExternalLinkButtonComponent } from '../../../../../ui-angular/src/lib/components/bmb-check-external-link-button/bmb-check-external-link-button.component';

@Component({
  selector: 'app-check-external-link-button-page',
  imports: [BmbCheckExternalLinkButtonComponent],
  templateUrl: './check-external-link-button-page.html',
  styleUrl: './check-external-link-button-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckExternalLinkButtonPage {
  readonly modes = ['button', 'internal', 'external'] as const;
  readonly targets: IBmbTargetLink[] = ['_blank', '_self', '_parent', '_top'];
  readonly mode = signal<(typeof this.modes)[number]>('button');
  readonly id = signal('dashboard-link-button');
  readonly target = signal<IBmbTargetLink>('_blank');
  readonly disabled = signal(false);
  readonly buttonName = signal('dashboard-action');
  readonly lastEvent = signal('Sin interaccion');

  readonly link = (): string => {
    if (this.mode() === 'external') return 'https://tec.mx/';
    if (this.mode() === 'internal') return '/pages/card';
    return '';
  };

  setMode(value: (typeof this.modes)[number]): void {
    this.mode.set(value);
  }
  setId(value: string): void {
    this.id.set(value);
  }
  setTarget(value: IBmbTargetLink): void {
    this.target.set(value);
  }
  setDisabled(value: boolean): void {
    this.disabled.set(value);
  }
  setButtonName(value: string): void {
    this.buttonName.set(value);
  }
  registerEvent(name: string): void {
    this.lastEvent.set(name);
  }
}
