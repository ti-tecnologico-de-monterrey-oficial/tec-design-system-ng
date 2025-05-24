import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  ContentChild,
  TemplateRef,
  input,
  output,
  computed,
  signal,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeNames } from '../../types';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';

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
  @ContentChild('bmbAccordionContent') bmbAccordionContent!: TemplateRef<any>;
  @ContentChild('bmbAccordionHeader') bmbAccordionHeader!: TemplateRef<any>;
  public borderRadius = input<SizeNames | SizeNames[]>('m');
  public margin = input<SizeNames | SizeNames[]>('m');
  public paddingHeader = input<SizeNames | SizeNames[]>('m');
  public paddingContent = input<SizeNames | SizeNames[]>('m');
  public icon = input<string>('');
  public accordionId = input<number | null>(null);
  public hideToggle = input<boolean>(false);
  public active = input<boolean>(false);
  public disabled = input<boolean>(false);
  public expanded = input<boolean | undefined>();
  public closed = output<void>();
  @Output() opened = new EventEmitter<void>();
  public onClick = output<void>();
  public _expanded = signal(false);
  public _active = signal(false);
  public _disabled = signal(false);
  public isOpen = computed<boolean | undefined>(() => {
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
      classNames.push(`bmb_border-radius-${this.borderRadius()}`);
    }

    if (typeof this.margin() === 'string') {
      classNames.push(`bmb_margin-${this.margin()}`);
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

  toggle(): void {
    if (!this._disabled()) {
      this._expanded.update((current) => !current);
      this._active.update((current) => !current);
      this.onClick.emit();

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
    return this.isOpen() ? 'expand_less' : 'expand_more';
  }
}
