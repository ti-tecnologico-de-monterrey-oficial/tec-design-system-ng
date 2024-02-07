import {
  Directive,
  Input,
  ElementRef,
  HostBinding,
  ViewContainerRef,
  ChangeDetectorRef,
  OnInit,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { BmbIconComponent } from '../components/bmb-icon/bmb-icon.component';

@Directive({
  selector: '[bmbButton]',
})
export class BmbButtonDirective implements OnInit, OnChanges {
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() iconCase: boolean = false;
  @Input() appearance: 'primary' | 'alternative' | 'secondary' | 'destructive' =
    'primary';
  @Input() size: 'small' | 'large' = 'small';
  @Input() device: 'mobile' | 'desktop' = 'mobile';

  private providedInputs: Set<string> = new Set();

  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.addIcon();
    this.applyAttributes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    Object.keys(changes).forEach((input) => {
      this.providedInputs.add(input);
    });

    this.applyAttributes();
    this.addIcon();
    this.cdr.markForCheck();
  }

  private applyAttributes() {
    if (this.providedInputs.has('device') && this.device) {
      this.renderer.setAttribute(this.el.nativeElement, 'device', this.device);
    }

    if (this.providedInputs.has('iconCase')) {
      if (this.iconCase) {
        this.renderer.setAttribute(this.el.nativeElement, 'case', 'true');
      } else {
        this.renderer.removeAttribute(this.el.nativeElement, 'case');
      }
    }

    if (this.providedInputs.has('size') && this.size) {
      this.renderer.setAttribute(this.el.nativeElement, 'size', this.size);
    }

    if (this.providedInputs.has('iconPosition')) {
      this.renderer.setAttribute(
        this.el.nativeElement,
        'icon-position',
        this.iconPosition
      );
    }
  }

  @HostBinding('class') get elementClass(): string {
    return `btn-${this.appearance}`;
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
