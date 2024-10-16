import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbInteractiveIconComponent } from '../bmb-interactive-icon/bmb-interactive-icon.component';
import { CommonModule } from '@angular/common';

export type IBmbFooterEvent = 'back' | 'forward' | 'share' | 'reload';
export type IBmbNavigationBarIcon = {
  name: string;
  label: string;
  dotNotification?: number;
};

export type IBmbNavigationBarIcons = {
  one: IBmbNavigationBarIcon;
  two: IBmbNavigationBarIcon;
  three: IBmbNavigationBarIcon;
  four: IBmbNavigationBarIcon;
};

@Component({
  selector: 'bmb-bottom-navigation-bar',
  standalone: true,
  imports: [
    CommonModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbInteractiveIconComponent,
  ],
  templateUrl: './bmb-bottom-navigation-bar.component.html',
  styleUrl: './bmb-bottom-navigation-bar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbBottomNavigationBarComponent {
  navigationBarIcons = input<IBmbNavigationBarIcons>({
    one: { name: 'arrow_back_ios', label: '' },
    two: { name: 'arrow_forward_ios', label: '' },
    three: { name: 'share', label: '' },
    four: { name: 'refresh', label: '' },
  });

  navigationBarEvents = output<IBmbFooterEvent>();

  onNavigationBarOptionClick(event: IBmbFooterEvent): void {
    this.navigationBarEvents.emit(event);
  }
}
