import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbTooltipComponent } from 'ui-angular';

@Component({
  selector: 'app-tooltip-page',
  imports: [BmbTooltipComponent],
  templateUrl: './tooltip-page.html',
  styleUrl: './tooltip-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipPage {
  readonly componentTitle = signal('Ayuda');
  readonly text = signal('Este texto explica para qué sirve el campo.');
  readonly icon = signal('help');
  readonly size = signal(24);
}
