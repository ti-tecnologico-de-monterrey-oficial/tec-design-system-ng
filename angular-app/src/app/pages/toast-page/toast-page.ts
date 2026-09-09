import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbToastComponent, type BmbToastAppearance } from 'ui-angular';

@Component({
  selector: 'app-toast-page',
  imports: [BmbToastComponent],
  templateUrl: './toast-page.html',
  styleUrl: './toast-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastPage {
  readonly appearances: BmbToastAppearance[] = [
    'neutral',
    'primary',
    'warning',
    'error',
    'event',
    'successful',
    'reminder',
    'mitec_blue',
    'mitec_red',
    'mitec_green',
    'mitec_orange',
    'mitec_light_green',
    'mitec_purple',
    'creative_violet',
    'creative_indigo',
    'creative_emerald',
    'creative_licorice',
    'creative_darkteal',
    'creative_peach',
    'creative_sepia',
    'creative_softred',
    'creative_wattle',
    'creative_shipcove',
    'creative_plantation',
    'creative_rum',
    'creative_hibiscus',
    'creative_ripelemon',
  ];

  readonly appearance = signal<BmbToastAppearance>('neutral');
  readonly componentTitle = signal('Actualización disponible');
  readonly description = signal(
    'Este mensaje permite validar el toast y sus variantes.',
  );
  readonly isClosable = signal(true);
  readonly lastEvent = signal('Sin interacciones');

  handleClose(): void {
    this.lastEvent.set('onClose emitido');
  }
}
