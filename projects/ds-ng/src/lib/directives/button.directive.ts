import {
  Directive,
  Input,
  HostBinding,
  ChangeDetectorRef,
} from '@angular/core';

const BUTTON_CLASSES = {
  primary: 'btn__primary',
  secondary: 'btn__secondary',
  simple: 'btn__simple',
};

@Directive({
  selector: '[bmbButton]',
  standalone: true,
})
export class ButtonDirective {
  @Input() btnStyle: 'primary' | 'secondary' = 'primary';

  @HostBinding('class') classes = '';
  constructor(private changeDector: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.classes = BUTTON_CLASSES[this.btnStyle];
    this.changeDector.detectChanges();
  }
}
