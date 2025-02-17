import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  ContentChild,
  TemplateRef,
  input,
  output,
  computed,
  InputSignal,
  OutputEmitterRef,
  signal,
  WritableSignal,
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
  public borderRadius: InputSignal<SizeNames | SizeNames[]> = input<
    SizeNames | SizeNames[]
  >('m');
  public margin: InputSignal<SizeNames | SizeNames[]> = input<
    SizeNames | SizeNames[]
  >('m');
  public paddingHeader: InputSignal<SizeNames | SizeNames[]> = input<
    SizeNames | SizeNames[]
  >('m');
  public paddingContent: InputSignal<SizeNames | SizeNames[]> = input<
    SizeNames | SizeNames[]
  >('m');
  public icon: InputSignal<string> = input<string>('');
  public accordionId: InputSignal<number> = input<number>(0);
  public hideToggle: InputSignal<boolean> = input<boolean>(false);
  public active: InputSignal<boolean> = input<boolean>(false);
  public disabled: InputSignal<boolean> = input<boolean>(false);
  public expanded: InputSignal<boolean | undefined> = input<
    boolean | undefined
  >();
  public closed: OutputEmitterRef<void> = output<void>();
  public opened: OutputEmitterRef<void> = output<void>();
  public onClick: OutputEmitterRef<void> = output<void>();
  public _expanded: WritableSignal<boolean> = signal(false);
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
