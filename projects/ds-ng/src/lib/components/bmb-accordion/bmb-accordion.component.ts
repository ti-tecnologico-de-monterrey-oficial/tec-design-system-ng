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
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeNames } from '../../types';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

const calculateSize: any = (pixels: string[]): string => {
  return pixels.map((size) => `var(--bmb-radius-${size})`).join(' ');
};

@Component({
  selector: 'bmb-accordion',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  templateUrl: './bmb-accordion.component.html',
  styleUrl: './bmb-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbAccordionComponent implements OnInit {
  @ContentChild('bmbAccordionContent') bmbAccordionContent!: TemplateRef<any>;
  @ContentChild('bmbAccordionHeader') bmbAccordionHeader!: TemplateRef<any>;
  public borderRadius = input<SizeNames | SizeNames[]>('m');
  public margin = input<SizeNames | SizeNames[]>('m');
  public paddingHeader = input<SizeNames | SizeNames[]>('m');
  public paddingContent = input<SizeNames | SizeNames[]>('m');
  public icon = input<string>('');
  public accordionId = input<number>(0);
  public hideToggle = input<boolean>(false);
  public active = input<boolean>(false);
  public disabled = input<boolean>(false);
  public expanded = input<boolean | undefined>();
  public closed = output<void>();
  public opened = output<void>();
  public onClick = output<void>();
  public _expanded = signal(false);
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
  }

  getClassesAccordion(): string[] {
    const classNames = [];

    if (typeof this.borderRadius() === 'string') {
      classNames.push(`bmb_border-radius-${this.borderRadius()}`);
    }

    if (typeof this.margin() === 'string') {
      classNames.push(`bmb_margin-${this.margin()}`);
    }

    if (this.disabled()) {
      classNames.push('disabled');
    } else {
      if (this.active()) {
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
    if (!this.disabled()) {
      this._expanded.update((current) => !current);
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
