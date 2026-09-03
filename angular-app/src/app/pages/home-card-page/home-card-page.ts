import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbHomeCardComponent,
  type IBmbActionHeader,
  type SizeNames,
} from 'ui-angular';

const ACTION_HEADERS: IBmbActionHeader[] = [
  { icon: 'notifications', alt: 'Notificaciones' },
  { icon: 'settings', alt: 'Configuración' },
];

@Component({
  selector: 'app-home-card-page',
  imports: [BmbHomeCardComponent],
  templateUrl: './home-card-page.html',
  styleUrl: './home-card-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCardPage {
  readonly contentPaddings: SizeNames[] = ['none', 'xs', 's', 'm', 'l', 'xl'];
  readonly actionHeaders = signal(ACTION_HEADERS);
  readonly componentTitle = signal('Mi tarjeta');
  readonly subtitle = signal('Subtítulo de la tarjeta');
  readonly icon = signal('home');
  readonly contentPadding = signal<SizeNames>('l');
  readonly showRightButton = signal(true);
  readonly showOneHeaderAction = signal(false);
  readonly isMobile = signal(false);
  readonly isExpanded = signal(false);
  readonly closeCount = signal(0);
  readonly backCount = signal(0);
  readonly expandCount = signal(0);

  setComponentTitle(value: string): void {
    this.componentTitle.set(value);
  }

  setSubtitle(value: string): void {
    this.subtitle.set(value);
  }

  setIcon(value: string): void {
    this.icon.set(value);
  }

  selectContentPadding(value: SizeNames): void {
    this.contentPadding.set(value);
  }

  setShowRightButton(value: boolean): void {
    this.showRightButton.set(value);
  }

  setShowOneHeaderAction(value: boolean): void {
    this.showOneHeaderAction.set(value);
  }

  setIsMobile(value: boolean): void {
    this.isMobile.set(value);
  }

  handleClose(): void {
    this.closeCount.update((value) => value + 1);
  }

  handleBack(): void {
    this.backCount.update((value) => value + 1);
  }

  handleExpand(): void {
    this.expandCount.update((value) => value + 1);
  }
}
