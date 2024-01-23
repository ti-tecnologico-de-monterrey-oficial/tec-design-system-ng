import {
  Directive,
  Input,
  ElementRef,
  HostBinding,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { BmbIconComponent } from '../components/bmb-icon/bmb-icon.component';

const BUTTON_CLASSES = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  simple: 'btn btn-simple',
};

@Directive({
  selector: '[bmbButton]',
})
export class BmbButtonDirective {
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() appearance: keyof typeof BUTTON_CLASSES = 'simple';

  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @HostBinding('class') get elementClass(): string {
    return `${BUTTON_CLASSES[this.appearance]}`;
  }

  ngAfterViewInit() {
    this.addIcon();
  }

  private addIcon() {
    if (this.icon) {
      const iconFactory =
        this.componentFactoryResolver.resolveComponentFactory(BmbIconComponent);
      const iconComponentRef =
        this.viewContainerRef.createComponent(iconFactory);
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
