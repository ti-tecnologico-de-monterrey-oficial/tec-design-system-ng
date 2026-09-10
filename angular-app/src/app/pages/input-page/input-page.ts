import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbInputComponent,
  type IBmbAdditionalAction,
  type IBmbInputAppearance,
  type IBmbInputType,
} from 'ui-angular';

@Component({
  selector: 'app-input-page',
  imports: [BmbInputComponent],
  templateUrl: './input-page.html',
  styleUrl: './input-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPage {
  readonly types: IBmbInputType[] = ['text', 'password', 'number', 'text-area'];
  readonly appearances: IBmbInputAppearance[] = ['main', 'normal', 'simple'];
  readonly additionalActions: IBmbAdditionalAction[] = [
    'none',
    'copy',
    'showHide',
  ];

  readonly type = signal<IBmbInputType>('text');
  readonly appearance = signal<IBmbInputAppearance>('normal');
  readonly label = signal('Nombre completo');
  readonly placeholder = signal('Escribe tu nombre');
  readonly icon = signal('');
  readonly errorMessage = signal('');
  readonly helperMessage = signal('Como aparece en tu credencial');
  readonly disabled = signal(false);
  readonly isRequired = signal(false);
  readonly tooltip = signal('');
  readonly additionalAction = signal<IBmbAdditionalAction>('none');
  readonly isClearable = signal(false);
  readonly showMaxTextLength = signal(false);
  readonly maxlength = signal<number | undefined>(undefined);
  readonly lastEvent = signal('Sin interacciones');

  setMaxlength(value: string): void {
    const parsed = Number(value);
    this.maxlength.set(value && Number.isFinite(parsed) ? parsed : undefined);
  }

  handleChange(): void {
    this.lastEvent.set('onChange emitido');
  }

  handleFocus(): void {
    this.lastEvent.set('isFocus emitido');
  }

  handleBlur(): void {
    this.lastEvent.set('isBlur emitido');
  }
}
