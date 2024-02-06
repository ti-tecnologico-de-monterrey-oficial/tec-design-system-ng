import {
  Directive,
  Input,
  ElementRef,
  HostBinding,
  ViewContainerRef,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { BmbIconComponent } from '../components/bmb-icon/bmb-icon.component';

interface ButtonClasses {
  size: 'small' | 'large';
  device: 'mobile' | 'desktop';
}

const BUTTON_CLASSES: Record<string, ButtonClasses> = {
  primary: { size: 'small', device: 'mobile' },
  alternative: { size: 'small', device: 'mobile' },
  secondary: { size: 'small', device: 'mobile' },
  destructive: { size: 'small', device: 'mobile' },
};

@Directive({
  selector: '[bmbButton]',
})
export class BmbButtonDirective implements OnChanges {
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() iconCase: string = '';
  @Input() appearance: keyof typeof BUTTON_CLASSES = 'primary';
  @Input() size: 'small' | 'large' = 'small';
  @Input() device: 'mobile' | 'desktop' = 'mobile';

  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {}

  @HostBinding('attr.data-size') get sizeAttribute(): string {
    return this.size;
  }

  @HostBinding('attr.data-device') get deviceAttribute(): string {
    return this.device;
  }

  @HostBinding('attr.data-case') get caseAttribute(): string {
    return this.iconCase;
  }

  @HostBinding('class') get elementClass(): string {
    const baseClass = `btn-${this.appearance}`;
    return baseClass;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      'icon' in changes ||
      'iconPosition' in changes ||
      'size' in changes ||
      'device' in changes ||
      'iconCase' in changes
    ) {
      this.addIcon();
      this.cdr.markForCheck();
    }
  }

  private addIcon() {
    this.viewContainerRef.clear();

    if (this.icon) {
      const iconComponentRef =
        this.viewContainerRef.createComponent(BmbIconComponent);
      const iconComponent = iconComponentRef.instance;
      iconComponent.icon = this.icon;

      if (this.iconPosition === 'right') {
        this.el.nativeElement.appendChild(
          iconComponentRef.location.nativeElement
        );
      } else {
        this.el.nativeElement.insertBefore(
          iconComponentRef.location.nativeElement,
          this.el.nativeElement.firstChild
        );
      }
    }
  }
}
