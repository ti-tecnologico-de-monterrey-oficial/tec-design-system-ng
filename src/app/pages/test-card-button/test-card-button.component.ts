import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbActionIconComponent,
  BmbCardButtonComponent,
  BmbIconComponent,
  IDropdownItem,
} from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'bmb-test-card-button',
  standalone: true,
  imports: [
    BmbActionIconComponent,
    BmbCardButtonComponent,
    BmbIconComponent,
  ],
  templateUrl: './test-card-button.component.html',
  styleUrl: './test-card-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestCardButtonComponent {
  readonly lastEvent = signal('Aún no se ha interactuado con un CardButton.');
  readonly chatTecImage = {
    src: 'https://tecgpt0grl0prod0stg.blob.core.windows.net/gpt-portal-public/ICONOS/icon_modelo_CHAT_GPT.svg',
    alt: 'Chat Tec',
  };

  readonly menuItems: IDropdownItem[] = [
    {
      icon: 'visibility',
      text: 'Ver detalle',
      action: () => this.registerEvent('Menú: Ver detalle'),
    },
    {
      icon: 'edit',
      text: 'Editar',
      action: () => this.registerEvent('Menú: Editar'),
    },
    {
      icon: 'delete',
      text: 'Eliminar',
      action: () => this.registerEvent('Menú: Eliminar'),
    },
  ];

  registerEvent(message: string): void {
    this.lastEvent.set(message);
  }
}
