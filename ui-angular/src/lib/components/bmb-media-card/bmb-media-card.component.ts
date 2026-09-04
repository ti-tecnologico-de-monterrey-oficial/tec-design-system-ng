import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type {
  IBmbMediaCardLoading,
  IBmbMediaCardType,
  IBmbTargetLink,
  SizeNames,
} from '../../_shared/types';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
import { isExternalLink } from '../../_shared/logic/utils';
import { logDeprecatedInput } from '../../_shared/logic/logDeprecatedInput';
import {
  getMediaCardBackgroundColor,
  getMediaCardClasses,
  getMediaCardContentClasses,
  getMediaCardFigureClasses,
  normalizeMediaCardText,
} from '../../_shared/logic/components/media-card';

export type {
  IBmbMediaCardLoading,
  IBmbMediaCardType,
} from '../../_shared/types';

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
    return (!!link && isExternalLink(link)) || false;
  }

  getClasses(): string[] {
    return getMediaCardFigureClasses(this.borderRadius(), this.enableZoom());
  }

  getContentClasses(): string[] {
    return getMediaCardContentClasses(
      this.type(),
      this.borderRadius(),
      this.isBlurredBackdrop(),
      this.fullmediaCard(),
    );
  }

  getBackgroundColor(): Record<string, string> {
    return getMediaCardBackgroundColor(this.type(), this.bgColor());
  }

  getUserAttribute(attribute: string | undefined): string {
    return normalizeMediaCardText(attribute);
  }

  getMediaCardClasses(isLink: boolean): string[] {
    return getMediaCardClasses({
      boxShadow: this.boxShadow(),
      isLink,
      ratio: this.ratio(),
      type: this.type(),
    });
  }
}
