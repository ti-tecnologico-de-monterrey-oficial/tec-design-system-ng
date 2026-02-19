import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeNames, IBmbTargetLink } from '../../types';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
import { isExternalLink } from '../../utils/utils';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';

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
  link = input<string>('');
  target = input<IBmbTargetLink>('_blank');
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
  subtitle = input<string>();
  content = input<string>();
  date = input<string>();
  userName = input<string>();
  userImage = input<string>();
  fullmediaCard = input<boolean>(false);
  bgColor = input<string>();
  boxShadow = input<boolean>(false);
  componentTitle = input<string>();

  title = input<string>(); // deprecated

  mediaCardClicked = output<MouseEvent | KeyboardEvent>();

  constructor() {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle }
      );
    });
  }

  isExternalLink(link: string): boolean {
    return (!!link && isExternalLink(link)) || false;
  }

  getClasses(): string[] {
    const classes = [];
    classes.push(`bmb_radius-${this.borderRadius()}`);
    if (this.enableZoom()) classes.push('bmb_media-card-figure-zoom');
    return classes;
  }

  getContentClasses(): string[] {
    const classes = [];
    if (this.type() === 'inline')
      classes.push(`bmb_radius-${this.borderRadius()}`);
    if (this.isBlurredBackdrop())
      classes.push('bmb_media-card-content-container-backdrop');
    if (this.fullmediaCard()) classes.push('bmb_media-card-content-full');
    return classes;
  }

  getBackgroundColor(): Record<string, string> {
    if (this.type() === 'inline') return {};
    return this.bgColor()
      ? { 'background-color': `rgb(var(${this.bgColor()}))` }
      : { 'background-color': 'transparent' };
  }

  getUserAttribute(attribute: string | undefined): string {
    return attribute || '';
  }

  getMediaCardClasses(isLink: boolean): string[] {
    const classes = [];
    if (this.boxShadow()) classes.push('bmb_media-card-box-shadow');
    if (isLink) classes.push(`bmb_media-card-${this.type()}`);
    if (!isLink && !this.ratio()) {
      classes.push('bmb_media-card-auto-layout');
    }
    return classes;
  }
}
