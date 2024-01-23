import {
  Directive,
  Input,
  HostBinding,
  ChangeDetectorRef,
} from '@angular/core';

const BUTTON_CLASSES = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  simple: 'btn-simple',
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
