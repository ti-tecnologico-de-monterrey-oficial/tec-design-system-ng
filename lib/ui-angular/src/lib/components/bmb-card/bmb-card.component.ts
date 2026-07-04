import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeNames } from '../../types';
import {
  getCardClasses,
  getCardStyles,
  getPaddingClasses,
  getPaddingStyles,
  type IBmbBgColor,
  type IBmbBoxShadowStyle,
  type IBmbCardType,
} from '../../_core/logic/components/card/card';



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
  borderRadius = input<SizeNames | SizeNames[]>('m');
  margin = input<SizeNames | SizeNames[]>('m');
  type = input<IBmbCardType>('normal');
  state = input<'disabled' | 'error' | 'normal'>('normal');
  boxShadowStyle = input<IBmbBoxShadowStyle | 'none'>('none');
  borderColor = input<IBmbBgColor | 'default'>('default');

  getClasses(): string[] {
    return getCardClasses({
      borderRadius: this.borderRadius(),
      margin: this.margin(),
      type: this.type(),
      boxShadowStyle: this.boxShadowStyle(),
    });
  }

  getStyles(): Record<string, string> {
    return getCardStyles({
      borderRadius: this.borderRadius(),
      margin: this.margin(),
      borderColor: this.borderColor(),
    });
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
  padding = input<SizeNames | SizeNames[]>('m');
  colorBackground = input<IBmbBgColor | null>(null);

  getClasses(): string[] {
    return getPaddingClasses(this.padding());
  }

  getStyles(): Record<string, string> {
    return getPaddingStyles({
      padding: this.padding(),
      colorBackground: this.colorBackground(),
    });
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
  padding = input<SizeNames | SizeNames[]>('m');
  colorBackground = input<IBmbBgColor | null>(null);

  getClasses(): string[] {
    return getPaddingClasses(this.padding());
  }

  getStyles(): Record<string, string> {
    return getPaddingStyles({
      padding: this.padding(),
      colorBackground: this.colorBackground(),
    });
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
  padding = input<SizeNames | SizeNames[]>('m');
  colorBackground = input<IBmbBgColor | null>(null);
  setBorderRadius = input<boolean>(false);

  getClasses(): string[] {
    const classes = getPaddingClasses(this.padding());

    if (this.setBorderRadius()) {
      classes.push('bmb_card-content-with-radius');
    }

    return classes;
  }

  getStyles(): Record<string, string> {
    return getPaddingStyles({
      padding: this.padding(),
      colorBackground: this.colorBackground(),
    });
  }
}
