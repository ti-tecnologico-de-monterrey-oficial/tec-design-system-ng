import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbMediaCardComponent,
  type IBmbMediaCardLoading,
  type IBmbMediaCardType,
  type IBmbTargetLink,
  type SizeNames,
} from 'ui-angular';

@Component({
  selector: 'app-media-card-page',
  imports: [BmbMediaCardComponent],
  templateUrl: './media-card-page.html',
  styleUrl: './media-card-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaCardPage {
  readonly types: IBmbMediaCardType[] = ['inline', 'floating', 'author_detail'];
  readonly loadings: IBmbMediaCardLoading[] = ['lazy', 'eager'];
  readonly targets: IBmbTargetLink[] = ['_blank', '_self', '_parent', '_top'];
  readonly borderRadii: SizeNames[] = ['none', 's', 'm', 'l', 'xl'];
  readonly backgroundColors = [
    '',
    '--containers-main',
    '--containers-background',
    '--general-contrasts-15',
  ];

  readonly link = signal('');
  readonly target = signal<IBmbTargetLink>('_blank');
  readonly src = signal(
    'https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg',
  );
  readonly mobileSrc = signal(
    'https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg',
  );
  readonly alt = signal('Ejemplo de contenido multimedia');
  readonly width = signal('100%');
  readonly ratio = signal('16 / 9');
  readonly borderRadius = signal<SizeNames>('m');
  readonly loading = signal<IBmbMediaCardLoading>('lazy');
  readonly enableZoom = signal(true);
  readonly isBlurredBackdrop = signal(false);
  readonly type = signal<IBmbMediaCardType>('inline');
  readonly subtitle = signal('Contenido destacado');
  readonly content = signal('Descripción para validar la tarjeta multimedia.');
  readonly date = signal('2 de septiembre de 2026');
  readonly userName = signal('Usuario Bamboo');
  readonly userImage = signal('/assets/doc/status.png');
  readonly fullmediaCard = signal(false);
  readonly bgColor = signal('');
  readonly boxShadow = signal(true);
  readonly componentTitle = signal('Media card');
  readonly clickCount = signal(0);

  handleMediaCardClick(): void {
    this.clickCount.update((value) => value + 1);
  }
}
