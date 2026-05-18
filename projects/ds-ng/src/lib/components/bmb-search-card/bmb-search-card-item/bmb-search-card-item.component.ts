import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { getRGBColorKeyValue } from '../../../utils/utils';
import { CommonModule } from '@angular/common';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbUserImageComponent } from '../../bmb-user-image/bmb-user-image.component';
import { BmbBookmarkComponent } from '../../bmb-bookmark/bmb-bookmark.component';
import { BmbBoxIconComponent } from '../../bmb-box-icon/bmb-box-icon.component';
import { IBmbInteractiveIconAppearance } from '../../bmb-interactive-icon/bmb-interactive-icon.component';

@Component({
  selector: 'bmb-search-card-item',
  standalone: true,
  imports: [
    CommonModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbUserImageComponent,
    BmbBookmarkComponent,
    BmbBoxIconComponent,
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
  backgroundColorIcon = input<IBmbInteractiveIconAppearance>('white_primary');
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
  }

  getClassBox(): string {
    return `bmb_search-card-item-box-${this.backgroundColorIcon()}`;
  }
}
