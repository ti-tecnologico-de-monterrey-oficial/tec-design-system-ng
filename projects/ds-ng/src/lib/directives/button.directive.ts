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
  @Input() image: string = '';
  @Input() altImage: string = '';
  @Input() position: 'left' | 'right' = 'left';
  @Input() case: boolean = false;
  @Input() appearance: 'primary' | 'alternative' | 'secondary' | 'destructive' =
    'primary';
  @Input() size: 'small' | 'large' = 'small';

  private providedInputs: Set<string> = new Set();

  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.addContent();
    this.applyAttributes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    Object.keys(changes).forEach((input) => {
      this.providedInputs.add(input);
    });

    this.applyAttributes();
    this.addContent();
    this.cdr.markForCheck();
  }

  private applyAttributes() {
    if (this.providedInputs.has('case')) {
      if (this.case) {
        this.renderer.setAttribute(this.el.nativeElement, 'case', 'true');
      } else {
        this.renderer.removeAttribute(this.el.nativeElement, 'case');
      }
    }

    if (this.providedInputs.has('size') && this.size) {
      this.renderer.setAttribute(this.el.nativeElement, 'size', this.size);
    }

    if (this.providedInputs.has('position')) {
      this.renderer.setAttribute(
        this.el.nativeElement,
        'position',
        this.position
      );
    }
  }

  @HostBinding('class') get elementClass(): string {
    return `btn--${this.appearance}`;
  }

  private addContent() {
    this.viewContainerRef.clear();

    if (this.icon) {
      const iconComponentRef =
        this.viewContainerRef.createComponent(BmbIconComponent);
      const iconComponent = iconComponentRef.instance;
      iconComponent.icon = this.icon;

      if (this.position === 'right') {
        this.el.nativeElement.insertBefore(
          iconComponentRef.location.nativeElement,
          this.el.nativeElement.lastChild.nextSibling
        );
      } else {
        this.el.nativeElement.insertBefore(
          iconComponentRef.location.nativeElement,
          this.el.nativeElement.firstChild
        );
      }
    } else if (this.image) {
      const existingImg = this.el.nativeElement.querySelector('img');
      if (!existingImg) {
        const imgElement = this.renderer.createElement('img');
        this.renderer.setAttribute(imgElement, 'src', this.image);
        this.renderer.setAttribute(imgElement, 'alt', this.altImage || '');
        this.insertContent(imgElement);
      }
    }
  }

  private insertContent(element: any) {
    if (this.position === 'right') {
      this.el.nativeElement.insertBefore(
        element,
        this.el.nativeElement.lastChild.nextSibling
      );
    } else {
      this.el.nativeElement.insertBefore(
        element,
        this.el.nativeElement.firstChild
      );
    }
  }
}
