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
import { IButtonAppearance } from '../types';

@Directive({
  selector: '[bmbButton]',
  standalone: true,
})
export class BmbButtonDirective implements OnInit, OnChanges {
  @Input() icon: string = '';
  @Input() position: 'left' | 'right' = 'left';
  @Input() case: boolean = false;
  @Input() appearance: IButtonAppearance = 'primary';
  @Input() size: 'small' | 'large' = 'small';
  @Input() isToggleActive: boolean = false;
  @Input() enableButtonToggle: boolean = false;

  private providedInputs: Set<string> = new Set();

  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
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
        this.position,
      );
    }
  }

  @HostBinding('class') get elementClass(): string[] {
    const classList = [`bmb_btn-${this.appearance}`];
    if (this.enableButtonToggle && this.isToggleActive) {
      classList.push('bmb_btn-toggle-active');
    }
    return classList;
  }

  private addContent() {
    this.viewContainerRef.clear();

    if (this.icon) {
      const iconComponentRef =
        this.viewContainerRef.createComponent(BmbIconComponent); // Crear una instancia del componente
      const iconComponent = iconComponentRef.instance;
      iconComponent.icon = this.icon;

      if (this.position === 'right') {
        this.el.nativeElement.insertBefore(
          iconComponentRef.location.nativeElement,
          this.el.nativeElement.lastChild.nextSibling,
        );
      } else {
        this.el.nativeElement.insertBefore(
          iconComponentRef.location.nativeElement,
          this.el.nativeElement.firstChild,
        );
      }
    }
  }
}
