import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbUserImageComponent,
  type IBmbTargetLink,
  type IBmbUserImageSize,
} from 'ui-angular';

@Component({
  selector: 'app-user-image-page',
  imports: [BmbUserImageComponent],
  templateUrl: './user-image-page.html',
  styleUrl: './user-image-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserImagePage {
  readonly sizes: IBmbUserImageSize[] = [
    'desktop-small',
    'desktop-large',
    'mobile-small',
    'mobile-medium',
    'mobile-large',
    'mobile-xlarge',
  ];
  readonly targets: IBmbTargetLink[] = ['_blank', '_self', '_parent', '_top'];
  readonly size = signal<IBmbUserImageSize>('desktop-large');
  readonly image = signal('/assets/images/placeholders/user-icon-test.svg');
  readonly altImage = signal('Imagen de usuario');
  readonly link = signal('');
  readonly target = signal<IBmbTargetLink>('_self');
  readonly bordered = signal(true);
  readonly lastEvent = signal('Sin interaccion');

  setSize(value: IBmbUserImageSize): void {
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
  setBordered(value: boolean): void {
    this.bordered.set(value);
  }
  registerEvent(eventName: string): void {
    this.lastEvent.set(eventName);
  }
}
