import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  getTitleClassNames,
  type IBmbFontWeightContent,
  type IBmbTitleSize,
} from '../../_core/logic/components/title/title';

@Component({
  selector: 'bmb-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-title.component.html',
  styleUrl: './bmb-title.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTitleComponent {
  componentTitle = input.required<string>();

  titleSize = input<IBmbTitleSize>('5');
  titleFontWeight = input<IBmbFontWeightContent>('600');

  subtitle = input<string>();

  subtitleSize = input<IBmbTitleSize>('3');
  subtitleFontWeight = input<IBmbFontWeightContent>('400');

  isCenterContent = input<boolean>(false);

  getClassNames(
    mainName: string,
    size: string = '',
    fontWeight: string = '',
  ): string[] {
    return getTitleClassNames({
      mainName,
      size,
      fontWeight,
      isCenterContent: this.isCenterContent(),
    });
  }
}
