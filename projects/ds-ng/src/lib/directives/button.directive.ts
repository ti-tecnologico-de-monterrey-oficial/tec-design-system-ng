import { Directive, Input, HostBinding, ChangeDetectorRef } from '@angular/core';

const BUTTON_CLASSES = {
  primary: 'wc-btn-primary',
  secondary: 'wc-btn-secondary',
  destructive: 'wc-btn-destructive'
}

@Directive({
  selector: '[bmbButton]',
  standalone: true
})
export class ButtonDirective {

  @Input() btnStyle: 'primary' | 'secondary' = 'primary';

  @HostBinding('class') classes = '';
  constructor(
    private changeDector: ChangeDetectorRef
  ) { 

  }

  ngAfterViewInit(): void {
     console.log("this", this.btnStyle)
     this.classes = BUTTON_CLASSES[this.btnStyle];
     this.changeDector.detectChanges();
  }

}
