import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbActionHeader } from '../../_shared/types';
import { BmbNavigationBarComponent } from '../bmb-navigation-bar/bmb-navigation-bar.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import {
  IBmbFooterEvent,
  IBmbNavigationBarIcon,
  IBmbNavigationBarIcons,
} from '../../_shared/types/components/bottom-navigation-bar';
import {
  buildActionHeaders,
  buildNavigationElement,
  buildNavigationElements,
} from '../../_shared/logic/components/bottom-navigation-bar';

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
    return buildNavigationElement(element, eventName);
  }

  ngOnInit(): void {
    const elements: IBmbNavigationBarIcon[] = buildNavigationElements(
      this.navigationBarIcons(),
    );

    this.actionHeaders = buildActionHeaders(elements, (event) =>
      this.onNavigationBarOptionClick(event),
    );
  }

  onNavigationBarOptionClick(event: IBmbFooterEvent): void {
    this.navigationBarEvents.emit(event);
  }
}
