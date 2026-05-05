import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbColor } from '../../../types/colors';
import { getRGBColorKeyValue, isImage } from '../../../utils/utils';
import { CommonModule } from '@angular/common';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbUserImageComponent } from '../../bmb-user-image/bmb-user-image.component';
import { BmbBookmarkComponent } from '../../bmb-bookmark/bmb-bookmark.component';

@Component({
  selector: 'bmb-search-card-item',
  standalone: true,
  imports: [
    CommonModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbIconComponent,
    BmbUserImageComponent,
    BmbBookmarkComponent,
  ],
  templateUrl: './bmb-search-card-item.component.html',
  styleUrl: './bmb-search-card-item.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbSearchCardItemComponent {
  name = input<string>('');
  itemId = input<string>('');
  subtitle = input<string>('');
  icon = input<string>('crop_square');
  isService = input<boolean>(true);
  backgroundColorIcon = input<IBmbColor>('black-primary');
  isBookmarkActive = input<boolean>(false);

  triggerClick = output<void>();
  getBookmarkClick = output<void>();

  getStyles(): object {
    const bgColor = getRGBColorKeyValue(this.backgroundColorIcon() as string);
    return bgColor;
  }

  handleClick(): void {
    this.triggerClick.emit();
  }

  handleBookmarkClick(): void {
    this.getBookmarkClick.emit();
    console.log('1ra etapa');
  }

  getClassBox(): string {
    return `bmb_search-card-item-box-${this.backgroundColorIcon()}`;
  }
}
