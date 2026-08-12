import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { getClassNames as computeClassNames } from '@shared/logic/components/bmb-title';
import type { IBmbFontWeightContent } from '@shared/types/components/bmb-title';

export type { IBmbFontWeightContent };

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
  titleSize = input<string>('5');
  titleFontWeight = input<string>('600');
  subtitle = input<string>();
  subtitleSize = input<string>('3');
  subtitleFontWeight = input<string>('400');
  isCenterContent = input<boolean>(false);

  getClassNames(
    mainName: string,
    size: string = '',
    fontWeight: string = '',
  ): string[] {
    return computeClassNames(
      mainName,
      size,
      fontWeight as IBmbFontWeightContent,
      this.isCenterContent(),
    );
  }
}
