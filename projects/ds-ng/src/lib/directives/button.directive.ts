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

const BUTTON_CLASSES = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  simple: 'btn btn-simple',
};

@Directive({
  selector: '[bmbButton]',
})
export class BmbButtonDirective implements OnChanges {
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() appearance: keyof typeof BUTTON_CLASSES = 'simple';

  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {}

  @HostBinding('class') get elementClass(): string {
    return `${BUTTON_CLASSES[this.appearance]}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('icon' in changes || 'iconPosition' in changes) {
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
