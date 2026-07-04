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

import {
  buildActionHeaders,
  buildNavigationElements,
  type IBmbFooterEvent,
  type IBmbNavigationBarIcons,
} from '../../_core/logic/components/bottom-navigation-bar/bottom-navigation-bar';

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

  ngOnInit(): void {
    const elements = buildNavigationElements(
      this.navigationBarIcons(),
    );

    this.actionHeaders = buildActionHeaders(
      elements,
      (event: IBmbFooterEvent) => this.onNavigationBarOptionClick(event),
    );
  }

  onNavigationBarOptionClick(
    event: IBmbFooterEvent,
  ): void {
    this.navigationBarEvents.emit(event);
  }
}
