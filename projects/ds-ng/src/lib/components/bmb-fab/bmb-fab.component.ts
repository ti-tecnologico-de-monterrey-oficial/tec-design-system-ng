import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'bmb-fab',
  templateUrl: './bmb-fab.component.html',
})
export class BmbFabComponent {
  @Input() icon = '';
  @Input() text?: string | null = '';
  @Input() size?: 's' | 'l' = 's';
  @Input() type?: 'ext' | 'fab' = 'fab';
  @Input() device?: 'mobile' | 'desktop' = 'mobile';

  active: boolean = false;

  closeIcon = 'close';

  fabStyle = '';

  @HostListener('click') myClick() {
    if (this.type == 'fab') {
      this.active = !this.active;
    }
  }

  constructor() {}

  ngOnInit() {
    this.fabStyle = this.setStyles();
  }

  setStyles() {
    let style = 'fab';

    if (this.device == 'mobile') {
      style = `${style}-mob`;
    } else {
      style = `${style}-des`;
    }

    if (this.size == 's') {
      style = `${style}-small`;
    } else {
      style = `${style}-large`;
    }

    if (this.type === 'ext') {
      style = `${style}-extended`;
    } else {
      style = `${style}-normal`;
    }
    return style;
  }
}
