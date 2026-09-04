import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbFabComponent,
  type FabSize,
  type FabType,
} from '../../../../../ui-angular/src/lib/components/bmb-fab/bmb-fab.component';

@Component({
  selector: 'app-fab-page',
  imports: [BmbFabComponent],
  templateUrl: './fab-page.html',
  styleUrl: './fab-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabPage {
  readonly icon = signal('add');
  readonly size = signal<FabSize>('large');
  readonly mitec = signal(false);
  readonly text = signal<string | null>('Crear');
  readonly type = signal<FabType>('normal');
  readonly lastEvent = signal('Sin interacción');

  setSize(value: FabSize): void {
    this.size.set(value);
  }

  setType(value: FabType): void {
    this.type.set(value);
  }

  registerClick(event: MouseEvent): void {
    this.lastEvent.set(`fabClick: ${event.type}`);
  }
}
