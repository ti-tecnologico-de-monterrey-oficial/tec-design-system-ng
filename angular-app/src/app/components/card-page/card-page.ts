import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbCardComponent,
  BmbCardContentComponent,
  BmbCardFooterComponent,
  BmbCardHeaderComponent,
  type IBmbBgColor,
  type IBmbBoxShadowStyle,
  type IBmbCardType,
  type SizeNames,
} from 'ui-angular';

type CardState = 'disabled' | 'error' | 'normal';
type CardColor = IBmbBgColor | 'default';
type SectionColor = IBmbBgColor | 'none';

@Component({
  selector: 'app-card-page',
  imports: [
    BmbCardComponent,
    BmbCardHeaderComponent,
    BmbCardContentComponent,
    BmbCardFooterComponent,
  ],
  templateUrl: './card-page.html',
  styleUrl: './card-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPage {
  readonly types: IBmbCardType[] = [
    'normal',
    'primary',
    'secondary',
    'success',
    'succes',
    'info',
    'warning',
    'error',
    'transparent',
  ];
  readonly shadows: Array<IBmbBoxShadowStyle | 'none'> = [
    'none',
    'box-shadow-1',
    'box-shadow-2',
    'box-shadow-3',
    'box-shadow-4',
    'box-shadow-5',
    'box-shadow-6',
  ];
  readonly sizes: SizeNames[] = ['none', 'xs', 's', 'm', 'l', 'xl', 'xxl'];
  readonly states: CardState[] = ['normal', 'disabled', 'error'];
  readonly borderColors: CardColor[] = [
    'default',
    'contrasts-100',
    'contrasts-75',
    'contrasts-50',
    'contrasts-25',
    'contrasts-20',
    'contrasts-15',
    'contrasts-5',
  ];
  readonly sectionColors: SectionColor[] = [
    'none',
    'contrasts-100',
    'contrasts-75',
    'contrasts-50',
    'contrasts-25',
    'contrasts-20',
    'contrasts-15',
    'contrasts-5',
  ];
  readonly type = signal<IBmbCardType>('normal');
  readonly shadow = signal<IBmbBoxShadowStyle | 'none'>('box-shadow-2');
  readonly borderRadius = signal<SizeNames>('l');
  readonly margin = signal<SizeNames>('none');
  readonly state = signal<CardState>('normal');
  readonly borderColor = signal<CardColor>('default');
  readonly headerPadding = signal<SizeNames>('m');
  readonly headerColor = signal<SectionColor>('contrasts-15');
  readonly footerPadding = signal<SizeNames>('m');
  readonly footerColor = signal<SectionColor>('contrasts-5');
  readonly roundedContent = signal(false);

  setType(value: IBmbCardType): void {
    this.type.set(value);
  }

  setShadow(value: IBmbBoxShadowStyle | 'none'): void {
    this.shadow.set(value);
  }

  setBorderRadius(value: SizeNames): void {
    this.borderRadius.set(value);
  }

  setMargin(value: SizeNames): void {
    this.margin.set(value);
  }

  setState(value: CardState): void {
    this.state.set(value);
  }

  setBorderColor(value: CardColor): void {
    this.borderColor.set(value);
  }

  setHeaderPadding(value: SizeNames): void {
    this.headerPadding.set(value);
  }

  setHeaderColor(value: SectionColor): void {
    this.headerColor.set(value);
  }

  setFooterPadding(value: SizeNames): void {
    this.footerPadding.set(value);
  }

  setFooterColor(value: SectionColor): void {
    this.footerColor.set(value);
  }

  setRoundedContent(value: boolean): void {
    this.roundedContent.set(value);
  }

  toSectionColor(value: SectionColor): IBmbBgColor | null {
    return value === 'none' ? null : value;
  }
}
