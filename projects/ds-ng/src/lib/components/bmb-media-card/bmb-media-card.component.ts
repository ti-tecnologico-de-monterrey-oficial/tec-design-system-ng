import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeNames } from '../../types';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';

export type IBmbMediaCardType = 'inline' | 'floating' | 'author_detail';
export type IBmbMediaCardLoading = 'lazy' | 'eager';

@Component({
  selector: 'bmb-media-card',
  standalone: true,
  imports: [CommonModule, BmbUserImageComponent],
  templateUrl: './bmb-media-card.component.html',
  styleUrl: './bmb-media-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbMediaCardComponent {
  src = input<string>('');
  mobileSrc = input<string>();
  alt = input<string>('');
  width = input<string>('100%');
  ratio = input<string>();
  borderRadius = input<SizeNames>('m');
  loading = input<IBmbMediaCardLoading>('lazy');
  enableZoom = input<boolean>(false);
  isBlurredBackdrop = input<boolean>(false);
  type = input<IBmbMediaCardType>('inline');
  title = input<string>();
  subtitle = input<string>();
  content = input<string>();
  date = input<string>();
  userName = input<string>();
  userImage = input<string>();

  getClasses(): string[] {
    const classes = [];
    classes.push(`bmb_radius-${this.borderRadius()}`);
    if (this.enableZoom()) classes.push('bmb_media-card-figure-zoom');
    return classes;
  }

  getContentClasses(): string[] {
    const classes = [];
    if (this.type() === 'inline') classes.push(`bmb_radius-${this.borderRadius()}`);
    if (this.isBlurredBackdrop())
      classes.push('bmb_media-card-content-container-backdrop');
    return classes;
  }

  getUserAttribute(attribute: string | undefined): string {
    return attribute || '';
  }
}
