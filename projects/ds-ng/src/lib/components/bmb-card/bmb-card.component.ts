import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeNames } from '../../types';

export type IBmbCardType = 'primary' | 'secondary' | 'succes' | 'info' | 'warning' | 'error' | 'normal';

@Component({
  selector: 'bmb-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-card.component.html',
  styleUrl: './bmb-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCardComponent {
  @Input() borderRadius: SizeNames | SizeNames[] = 'm';
  @Input() padding: SizeNames | SizeNames[] = 'm';
  @Input() margin: SizeNames | SizeNames[] = 'm';
  @Input() type: IBmbCardType = 'normal';

  @ContentChild('header') headerContent?: TemplateRef<any>;
  @ContentChild('footer') footerContent?: TemplateRef<any>;

  getClasses() {
    const classNames = [];
    if (typeof this.borderRadius === 'string')
      classNames.push(`bmb_border-radius-${this.borderRadius}`);
    if (typeof this.margin === 'string')
      classNames.push(`bmb_margin-${this.margin}`);
    classNames.push(`bmb_card-type-${this.type}`);

    return classNames;
  }

  getStyles() {
    const styles: any = {};
    if (typeof this.borderRadius !== 'string')
      styles['border-radius'] = this.calculateSize(this.borderRadius);
    if (typeof this.margin !== 'string')
      styles.margin = this.calculateSize(this.margin);

    return styles;
  }

  getContentClasses() {
    const classNames = [];
    if (typeof this.padding === 'string')
      classNames.push(`bmb_padding-${this.padding}`);

    return classNames;
  }

  getContentStyles() {
    const styles: any = {};
    if (typeof this.padding !== 'string')
      styles.padding = this.calculateSize(this.padding);

    return styles;
  }

  calculateSize(pixels: string[]): string {
    return pixels
      .map((size) => {
        switch (size) {
          case 'xs':
            return '0.25rem';
          case 's':
            return '0.5rem';
          case 'm':
            return '1rem';
          case 'l':
            return '1.5rem';
          case 'xl':
            return '2rem';
          case 'none':
            return '0';
          case 'auto':
            return 'auto';
          default:
            return '1rem';
        }
      })
      .join(' ');
  }
}
