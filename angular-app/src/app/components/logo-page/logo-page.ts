import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbLogoComponent, type IBmbTargetLink } from 'ui-angular';

type LogoSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-logo-page',
  imports: [BmbLogoComponent],
  templateUrl: './logo-page.html',
  styleUrl: './logo-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoPage {
  readonly sizes: LogoSize[] = ['small', 'medium', 'large'];
  readonly targets: IBmbTargetLink[] = ['_blank', '_self', '_parent', '_top'];
  readonly size = signal<LogoSize>('medium');
  readonly image = signal('/assets/images/tec-logo.svg');
  readonly altImage = signal('Tecnologico de Monterrey');
  readonly link = signal('');
  readonly target = signal<IBmbTargetLink>('_self');
  readonly buttonName = signal('migration-logo');
  readonly lastEvent = signal('Sin interacción');

  setSize(value: LogoSize): void {
    this.size.set(value);
  }

  setImage(value: string): void {
    this.image.set(value);
  }

  setAltImage(value: string): void {
    this.altImage.set(value);
  }

  setLink(value: string): void {
    this.link.set(value);
  }

  setTarget(value: IBmbTargetLink): void {
    this.target.set(value);
  }

  setButtonName(value: string): void {
    this.buttonName.set(value);
  }

  registerEvent(eventName: string): void {
    this.lastEvent.set(eventName);
  }
}
