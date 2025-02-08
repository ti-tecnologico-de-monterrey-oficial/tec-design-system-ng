import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbActionHeader } from '../../types';
import { BmbNavigationBarComponent } from '../bmb-navigation-bar/bmb-navigation-bar.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';

export type IBmbFooterEvent = 'back' | 'forward' | 'share' | 'reload';
export type IBmbNavigationBarIcon = {
  name: string;
  label: string;
  eventName?: IBmbFooterEvent;
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
  imports: [BmbContainerComponent, BmbNavigationBarComponent],
  templateUrl: './bmb-bottom-navigation-bar.component.html',
  styleUrl: './bmb-bottom-navigation-bar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbBottomNavigationBarComponent {
  navigationBarIcons = input.required<IBmbNavigationBarIcons>();

  navigationBarEvents = output<IBmbFooterEvent>();

  actionHeaders: IBmbActionHeader[] = [];

  buildElement(
    element: IBmbNavigationBarIcon,
    eventName: IBmbFooterEvent,
  ): IBmbNavigationBarIcon {
    const newElement = { ...element };

    if (newElement.eventName !== eventName) {
      newElement['eventName'] = eventName;
    }

    return newElement;
  }

  ngOnInit(): void {
    const elements: IBmbNavigationBarIcon[] = [
      this.buildElement(this.navigationBarIcons()['one'], 'back'),
      this.buildElement(this.navigationBarIcons()['two'], 'forward'),
      this.buildElement(this.navigationBarIcons()['three'], 'share'),
      this.buildElement(this.navigationBarIcons()['four'], 'reload'),
    ];

    elements.forEach((element) => {
      this.actionHeaders.push({
        icon: element.name,
        action: () => this.onNavigationBarOptionClick(element.eventName!),
      });
    });
  }

  onNavigationBarOptionClick(event: IBmbFooterEvent): void {
    this.navigationBarEvents.emit(event);
  }
}
