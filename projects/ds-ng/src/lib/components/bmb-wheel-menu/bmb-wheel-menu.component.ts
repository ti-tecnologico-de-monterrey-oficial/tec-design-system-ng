import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbFabComponent } from '../bmb-fab/bmb-fab.component';

@Component({
  selector: 'bmb-wheel-menu',
  standalone: true,
  imports: [CommonModule, BmbFabComponent],
  styleUrl: './bmb-wheel-menu.component.scss',
  templateUrl: './bmb-wheel-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbWheelMenuComponent {
  private menuElement: HTMLElement | null = null;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  ngOnInit() {
    this.menuElement = this.el.nativeElement.querySelector('.bmb_wheel_menu');
  }

  onFabClick() {
    this.toggleMenu();
  }

  private toggleMenu() {
    if (this.menuElement) {
      if (this.menuElement.classList.contains('open')) {
        this.renderer.removeClass(this.menuElement, 'open');
      } else {
        this.renderer.addClass(this.menuElement, 'open');
      }
    }
  }
}
