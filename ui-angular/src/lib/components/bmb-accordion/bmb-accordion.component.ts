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
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeNames } from '../../_shared/types/utils';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { IBmbContrast } from '../../_shared/types/colors';

const calculateSize = (pixels: SizeNames | SizeNames[]): string => {
  return Array.isArray(pixels)
    ? pixels.map((size) => `var(--bmb-radius-${size})`).join(' ')
    : `var(--bmb-radius-${pixels})`;
};

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

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
export class BmbAccordionComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
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
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onClick = output<MouseEvent>();
  imageNotFoundError = output<void>();

  bmbAccordionContent = contentChild<TemplateRef<unknown>>(
    'bmbAccordionContent',
  );
  bmbAccordionHeader = contentChild<TemplateRef<unknown>>('bmbAccordionHeader');
  bmbAccordionBasic = contentChild<TemplateRef<unknown>>('bmbAccordionBasic');
  @ViewChild('basicContent', { read: ElementRef })
  basicContent!: ElementRef<HTMLElement>;

  private resizeObserver?: ResizeObserver;

  _expanded = signal(false);
  _active = signal(false);
  _disabled = signal(false);
  allowExpand = signal<boolean>(false);
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

  ngAfterViewInit(): void {
    this.checkAllowExpand();

    const element = this.basicContent?.nativeElement;
    if (element) {
      this.resizeObserver = new ResizeObserver(() => {
        if (!this._expanded()) this.checkAllowExpand();
      });
      this.resizeObserver.observe(element);
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = undefined;
    }
  }

  private checkAllowExpand(): void {
    const el = this.basicContent?.nativeElement as HTMLElement;

    if (el) {
      if (el.childElementCount) {
        this.allowExpand.set(
          el.children[0].children[1].scrollHeight >
            el.children[0].children[1].clientHeight,
        );
      } else {
        this.allowExpand.set(el.scrollHeight > el.clientHeight);
      }
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
      if (!this.bmbAccordionBasic() && this._active()) {
        classNames.push('active');
      }

      if (this.bmbAccordionBasic() && !this.allowExpand()) {
        classNames.push('notHovered');
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

  getStyles(): Record<string, string> {
    const styles: Record<string, string> = {};

    if (typeof this.borderRadius() !== 'string') {
      styles['border-radius'] = calculateSize(this.borderRadius());
    }

    if (typeof this.margin() !== 'string') {
      styles['margin'] = calculateSize(this.margin());
    }

    return styles;
  }

  toggle(event: MouseEvent): void {
    if (this.lockToggle()) return;

    if (!this._disabled()) {
      this._expanded.update((current) => !current);
      this._active.update((current) => !current);
      this.onClick.emit(event);

      if (this.expanded() === undefined) {
        if (this.isOpen()) {
          this.opened.emit();
        } else {
          this.closed.emit();
        }
      }
    }
  }

  getIconToggle(): string {
    return this.isOpen() || (this.bmbAccordionBasic() && this._expanded())
      ? 'keyboard_arrow_up'
      : 'keyboard_arrow_down';
  }

  handleToggleKeyboard(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggle(new MouseEvent('click'));
      event.preventDefault();
    }
  }

  handleImageNotFoundError(): void {
    this.imageNotFoundError.emit();
  }
}
