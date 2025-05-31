import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeNames } from '../../types';

const calculateSize = (pixels: string[]): string => {
  return pixels.map((size) => `var(--bmb-radius-${size})`).join(' ');
};

export type IBmbCardType =
  | 'primary'
  | 'secondary'
  | 'succes'
  | 'info'
  | 'warning'
  | 'error'
  | 'normal'
  | 'transparent';

export type IBmbBgColor =
  | 'contrasts-100'
  | 'contrasts-75'
  | 'contrasts-50'
  | 'contrasts-25'
  | 'contrasts-20'
  | 'contrasts-15'
  | 'contrasts-5';

export type IBmbBoxShadowStyle =
  | 'box-shadow-1'
  | 'box-shadow-2'
  | 'box-shadow-3'
  | 'box-shadow-4'
  | 'box-shadow-5'
  | 'box-shadow-6';

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
  @Input() margin: SizeNames | SizeNames[] = 'm';
  @Input() type: IBmbCardType = 'normal';
  @Input() state: 'disabled' | 'error' | 'normal' = 'normal';
  @Input() boxShadowStyle: IBmbBoxShadowStyle | 'none' = 'none';
  @Input() borderColor: IBmbBgColor | 'default' = 'default';
  @Input() alternative: boolean = false; // deprecated

  getClasses() {
    const classNames = [];
    if (typeof this.borderRadius === 'string')
      classNames.push(`bmb_radius-${this.borderRadius}`);
    if (typeof this.margin === 'string')
      classNames.push(`bmb_margin-${this.margin}`);
    classNames.push(`bmb_card-type-${this.type}`);

    if (this.boxShadowStyle !== 'none') {
      classNames.push(`bmb_card-${this.boxShadowStyle}`);
    }

    return classNames;
  }

  getStyles() {
    const styles: any = {};
    if (typeof this.borderRadius !== 'string')
      styles['border-radius'] = calculateSize(this.borderRadius);
    if (typeof this.margin !== 'string')
      styles.margin = calculateSize(this.margin);
    if (this.borderColor !== 'default')
      styles.borderColor = `var(--general_${this.borderColor})`;

    return styles;
  }
}

@Component({
  selector: 'bmb-card-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-card-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCardHeaderComponent {
  @Input() padding: SizeNames | SizeNames[] = 'm';
  @Input() colorBackground: IBmbBgColor | null = null;

  getClasses() {
    const classNames = [];
    if (typeof this.padding === 'string')
      classNames.push(`bmb_padding-${this.padding}`);

    return classNames;
  }

  getStyles() {
    const styles: any = {};
    if (typeof this.padding !== 'string')
      styles['padding'] = calculateSize(this.padding);

    if (this.colorBackground !== null) {
      styles['background-color'] = `var(--general_${this.colorBackground})`;
    }

    return styles;
  }
}

@Component({
  selector: 'bmb-card-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-card-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCardFooterComponent {
  @Input() padding: SizeNames | SizeNames[] = 'm';
  @Input() colorBackground: IBmbBgColor | null = null;

  getClasses() {
    const classNames = [];
    if (typeof this.padding === 'string')
      classNames.push(`bmb_padding-${this.padding}`);

    return classNames;
  }

  getStyles() {
    const styles: any = {};
    if (typeof this.padding !== 'string')
      styles['padding'] = calculateSize(this.padding);

    if (this.colorBackground !== null) {
      styles['background-color'] = `var(--general_${this.colorBackground})`;
    }

    return styles;
  }
}

@Component({
  selector: 'bmb-card-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-card-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCardContentComponent {
  @Input() padding: SizeNames | SizeNames[] = 'm';
  @Input() colorBackground: IBmbBgColor | null = null;

  getClasses() {
    const classNames = [];
    if (typeof this.padding === 'string')
      classNames.push(`bmb_padding-${this.padding}`);

    return classNames;
  }

  getStyles() {
    const styles: any = {};
    if (typeof this.padding !== 'string')
      styles['padding'] = calculateSize(this.padding);

    if (this.colorBackground !== null) {
      styles['background-color'] = `var(--general_${this.colorBackground})`;
    }
    return styles;
  }
}
