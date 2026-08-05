import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type IBmbFontWeightContent =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

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
    const classes = [];

    if (size) classes.push(`${mainName}-${size}`);

    if (fontWeight) classes.push(`${mainName}-${fontWeight}`);

    if (this.isCenterContent()) classes.push(`${mainName}-centered`);

    return classes;
  }
}
