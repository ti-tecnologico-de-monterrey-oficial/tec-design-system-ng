import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbActionIconComponent,
  BmbSwipeDirective,
  BmbSwipeLeftActionsDirective,
  BmbSwipeRightActionsDirective,
  IBmbSwipeSide,
} from 'ui-angular';

interface SwipeItem {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
}

@Component({
  selector: 'app-swipe-page',
  standalone: true,
  imports: [
    BmbActionIconComponent,
    BmbSwipeDirective,
    BmbSwipeLeftActionsDirective,
    BmbSwipeRightActionsDirective,
  ],
  templateUrl: './swipe-page.html',
  styleUrl: './swipe-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwipePage {
  readonly threshold = signal(0.4);
  readonly closeOnAction = signal(true);
  readonly lastEvent = signal<IBmbSwipeSide | null>(null);
  readonly items = signal<SwipeItem[]>([
    {
      id: 1,
      title: 'Entrega de proyecto',
      subtitle: 'Hoy, 14:30',
      icon: 'assignment',
    },
    {
      id: 2,
      title: 'Revisar documentación',
      subtitle: 'Mañana, 09:00',
      icon: 'description',
    },
    {
      id: 3,
      title: 'Sesión de diseño',
      subtitle: 'Viernes, 16:00',
      icon: 'palette',
    },
  ]);

  setThreshold(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.threshold.set(value);
  }

  handleSwipe(side: IBmbSwipeSide | null): void {
    this.lastEvent.set(side);
  }

  handleAction(action: string, item: SwipeItem): void {
    this.lastEvent.set(null);
    console.info(`${action}: ${item.title}`);
  }
}
