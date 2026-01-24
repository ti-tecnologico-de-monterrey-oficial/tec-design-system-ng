import { Component, input } from '@angular/core';
import { BmbLayoutGridDirective, BmbLayoutGridItemDirective } from '../../../directives/bmb-layout-grid/bmb-layout-grid.directive';
import { IBmbColor } from '../../../types/colors';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { getRGBColorKeyValue, isImage } from '../../../utils/utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-search-card-item',
  standalone: true,
  imports: [BmbLayoutGridDirective, BmbLayoutGridItemDirective, BmbIconComponent, CommonModule],
  templateUrl: './bmb-search-card-item.component.html',
  styleUrl: './bmb-search-card-item.component.scss'
})
export class BmbSearchCardItemComponent {
  name = input<string>('');
  itemId = input<string>('');
  subtitle = input<string>('');
  icon = input<string>('crop_square');
  isService = input<boolean>(true);
  backgroundColorIcon = input<IBmbColor>('black-primary');

  getStyles(): object {
    if (isImage(this.icon())) {
      return { 'background-color': 'transparent' };
    }

    return getRGBColorKeyValue(this.backgroundColorIcon() as string);
  }
}
