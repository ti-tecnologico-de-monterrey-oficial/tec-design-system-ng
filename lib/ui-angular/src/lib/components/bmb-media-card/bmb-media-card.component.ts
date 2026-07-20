import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeNames, IBmbTargetLink } from '../types';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
import { logDeprecatedInput } from '../utils/logDeprecatedInput';
import {
  getMediaCardBackgroundColor,
  getMediaCardClasses,
  getMediaCardContentClasses,
  getMediaCardUserAttribute,
  getMediaCardWrapperClasses,
  isMediaCardExternalLink,
} from '../../_core/logic/components/media-card/media-card';

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
        { name: 'componentTitle', hasValue: !!newTitle },
      );
    });
  }

    isExternalLink(link: string): boolean {
    return isMediaCardExternalLink(link);
  }

  getClasses(): string[] {
    return getMediaCardClasses({
      borderRadius: this.borderRadius(),
      enableZoom: this.enableZoom(),
    });
  }

  getContentClasses(): string[] {
    return getMediaCardContentClasses({
      type: this.type(),
      borderRadius: this.borderRadius(),
      isBlurredBackdrop: this.isBlurredBackdrop(),
      fullMediaCard: this.fullmediaCard(),
    });
  }

  getBackgroundColor(): Record<string, string> {
    return getMediaCardBackgroundColor({
      type: this.type(),
      bgColor: this.bgColor(),
    });
  }

  getUserAttribute(attribute: string | undefined): string {
    return getMediaCardUserAttribute(attribute);
  }

  getMediaCardClasses(isLink: boolean): string[] {
    return getMediaCardWrapperClasses({
      boxShadow: this.boxShadow(),
      isLink,
      type: this.type(),
      ratio: this.ratio(),
    });
  }
}
