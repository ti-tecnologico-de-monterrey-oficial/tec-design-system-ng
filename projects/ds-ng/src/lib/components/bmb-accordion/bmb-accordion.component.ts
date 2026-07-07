import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  TemplateRef,
  input,
  output,
  computed,
  signal,
  OnInit,
  OnChanges,
  SimpleChanges,
  contentChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeNames } from '../../types';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { IBmbContrast } from '../../types/colors';

const calculateSize: any = (pixels: string[]): string => {
  return pixels.map((size) => `var(--bmb-radius-${size})`).join(' ');
};

@Component({
  selector: 'bmb-accordion',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  templateUrl: './bmb-accordion.component.html',
  styleUrl: './bmb-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbAccordionComponent implements OnInit, OnChanges {
  appearanceContrast = input<IBmbContrast>('default');
  borderRadius = input<SizeNames | SizeNames[]>('m');
  margin = input<SizeNames | SizeNames[]>('m');
  paddingHeader = input<SizeNames | SizeNames[]>('m');
  paddingContent = input<SizeNames | SizeNames[]>('m');
  icon = input<string>('');
  accordionId = input<number | null>(null);
  hideToggle = input<boolean>(false);
  active = input<boolean>(false);
  disabled = input<boolean>(false);
  expanded = input<boolean | undefined>();
  lockToggle = input<boolean>(false);

  closed = output<void>();
  opened = output<void>();
  onClick = output<MouseEvent>();

  _expanded = signal(false);
  _active = signal(false);
  _disabled = signal(false);
  isOpen = computed<boolean | undefined>(() => {
    if (this.expanded() != undefined) {
      if (this.expanded()) {
        this.opened.emit();
      } else {
        this.closed.emit();
      }

      return this.expanded();
    } else {
      return this._expanded();
    }
  });

  bmbAccordionContent = contentChild<TemplateRef<any>>('bmbAccordionContent');
  bmbAccordionHeader = contentChild<TemplateRef<any>>('bmbAccordionHeader');

  ngOnInit(): void {
    this._expanded.update((current) => this.expanded() || current);
    this._active.update((current) => this.active() || current);
    this._disabled.update((current) => this.disabled() || current);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expanded']) {
      this._expanded.update(() => this.expanded() || false);
    }

    if (changes['active']) {
      this._active.update(() => this.active() || false);
    }

    if (changes['disabled']) {
      this._disabled.update(() => this.disabled() || false);
    }
  }

  getClassesAccordion(): string[] {
    const classNames = [];

    if (typeof this.borderRadius() === 'string') {
      classNames.push(`bmb_radius-${this.borderRadius()}`);
    }

    if (typeof this.margin() === 'string') {
      classNames.push(`bmb_margin-${this.margin()}`);
    }

    if (this.appearanceContrast() === 'primary') {
      classNames.push('bmb_accordion-primary');
    }

    if (this.appearanceContrast() === 'alternative') {
      classNames.push('bmb_accordion-alternative');
    }

    if (this._disabled()) {
      classNames.push('disabled');
    } else {
      if (this._active()) {
        classNames.push('active');
      }
    }

    return classNames;
  }

  getClassesHeader(): string[] {
    const classNames = [];

    if (typeof this.paddingHeader() === 'string') {
      classNames.push(`bmb_padding-${this.paddingHeader()}`);
    }

    if (this.hideToggle() && !this.icon()) {
      classNames.push('bmb_accordion-header');
    } else {
      classNames.push('bmb_accordion-header-icon');
    }

    if (this._expanded()) {
      classNames.push('bmb_accordion-header-open');
    }

    return classNames;
  }

  getClassesContent(): string {
    let classNames = 'bmb_accordion-content';

    if (typeof this.paddingContent() === 'string') {
      classNames = classNames + ` bmb_padding-${this.paddingContent()}`;
    }

    return classNames;
  }

  getStyles(): any {
    const styles: any = {};

    if (typeof this.borderRadius() !== 'string') {
      styles['border-radius'] = calculateSize(this.borderRadius());
    }

    if (typeof this.margin() !== 'string') {
      styles.margin = calculateSize(this.margin());
    }

    return styles;
  }

  toggle(event: MouseEvent): void {
    if (this.lockToggle()) return;

    if (!this._disabled()) {
      this._expanded.update((current) => !current);
      this._active.update((current) => !current);
      this.onClick.emit(event);

      if (this.expanded() == undefined) {
        if (this.isOpen()) {
          this.opened.emit();
        } else {
          this.closed.emit();
        }
      }
    }
  }

  getIconToggle(): string {
    return this.isOpen() ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

  handleToggleKeyboard(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggle(new MouseEvent('click'));
      event.preventDefault();
    }
  }
}
