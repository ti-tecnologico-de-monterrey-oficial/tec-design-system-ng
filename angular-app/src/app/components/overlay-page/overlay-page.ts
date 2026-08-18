import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbOverlayComponent } from 'ui-angular';

@Component({
  selector: 'app-overlay-page',
  imports: [BmbOverlayComponent],
  templateUrl: './overlay-page.html',
  styleUrl: './overlay-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayPage {
  readonly active = signal(false);
  readonly uid = signal('dashboard-overlay');
  readonly lastClick = signal('Sin interacción');

  open(): void {
    this.active.set(true);
  }

  close(uid: string): void {
    this.lastClick.set(`Overlay seleccionado: ${uid}`);
    this.active.set(false);
  }

  setUid(uid: string): void {
    this.uid.set(uid);
  }
}
