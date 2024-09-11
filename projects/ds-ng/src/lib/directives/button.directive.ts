import {
  Directive,
  ElementRef,
  HostBinding,
  ViewContainerRef,
  ChangeDetectorRef,
  OnInit,
  OnChanges,
  Renderer2,
  SimpleChanges,
  input,
} from '@angular/core';
import { BmbIconComponent } from '../components/bmb-icon/bmb-icon.component';
import {
  IBmbHorizontalPosition,
  IButtonAppearance,
  IButtonSize,
} from '../types';

@Directive({
  selector: '[bmbButton]',
  standalone: true,
})
export class BmbButtonDirective implements OnInit, OnChanges {
  icon = input<string>('');
  position = input<IBmbHorizontalPosition>('left');
  case = input<boolean>(false);
  appearance = input<IButtonAppearance>('primary');
  size = input<IButtonSize>('small');
  isToggleActive = input<boolean>(false);
  enableButtonToggle = input<boolean>(false);
  isRounded = input<boolean>(true);

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
      if (this.case()) {
        this.renderer.setAttribute(this.el.nativeElement, 'case', 'true');
      } else {
        this.renderer.removeAttribute(this.el.nativeElement, 'case');
      }
    }

    if (this.providedInputs.has('size') && this.size()) {
      this.renderer.setAttribute(this.el.nativeElement, 'size', this.size());
    }

    if (this.providedInputs.has('position')) {
      this.renderer.setAttribute(
        this.el.nativeElement,
        'position',
        this.position(),
      );
    }
  }

  @HostBinding('class') get elementClass(): string[] {
    const classList = [`bmb_btn-${this.appearance()}`];
    classList.push('bmb_btn-rounded');

    if (this.enableButtonToggle() && this.isToggleActive())
      classList.push('bmb_btn-toggle-active');

    return classList;
  }

  private addContent() {
    this.viewContainerRef.clear();

    if (this.icon()) {
      const iconComponentRef =
        this.viewContainerRef.createComponent(BmbIconComponent); // Crear una instancia del componente
      const iconComponent = iconComponentRef.instance;
      iconComponent.icon = this.icon();

      if (this.position() === 'right') {
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
