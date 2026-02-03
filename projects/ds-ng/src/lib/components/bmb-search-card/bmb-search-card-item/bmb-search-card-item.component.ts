import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';
import { IBmbColor } from '../../../types/colors';
import { getRGBColorKeyValue, isImage } from '../../../utils/utils';
import { CommonModule } from '@angular/common';
import { BmbTitleContentComponent } from '../../bmb-title-content/bmb-title-content.component';

@Component({
  selector: 'bmb-search-card-item',
  standalone: true,
  imports: [
    CommonModule,
    BmbTitleContentComponent,
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

  triggerClick = output<void>();

  getStyles(): object {
    if (isImage(this.icon())) {
      return { 'background-color': 'transparent' };
    }

    return getRGBColorKeyValue(this.backgroundColorIcon() as string);
  }

  handleClick(): void {
    this.triggerClick.emit();
  }
}
