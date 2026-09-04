import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { BmbBreadcrumbComponent } from '../../../../../ui-angular/src/lib/components/bmb-breadcrumb/bmb-breadcrumb.component';
import type { IBmbDataTopBar } from 'ui-angular';

@Component({
  selector: 'app-breadcrumb-page',
  imports: [BmbBreadcrumbComponent],
  templateUrl: './breadcrumb-page.html',
  styleUrl: './breadcrumb-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbPage {
  readonly isTopBar = signal(false);
  readonly isInactive = signal(false);
  readonly dropdownOpen = signal(false);
  readonly itemCount = signal(5);
  readonly availableCounts = [1, 2, 3, 4, 5, 6];
  readonly allItems: IBmbDataTopBar[] = [
    { text: 'Inicio', link: '/pages/breadcrumb' },
    { text: 'Admisiones', link: '/pages/breadcrumb?level=admisiones' },
    { text: 'Profesional', link: '/pages/breadcrumb?level=profesional' },
    { text: 'Programas', link: '/pages/breadcrumb?level=programas' },
    { text: 'Ingeniería', link: '/pages/breadcrumb?level=ingenieria' },
    { text: 'Detalle del programa' },
  ];
  readonly dataLocalNav = computed(() =>
    this.allItems.slice(0, this.itemCount()),
  );
  readonly dataTopBar: IBmbDataTopBar[] = [
    { text: 'Tecnológico de Monterrey', link: '/pages/breadcrumb' },
    { text: 'Detalle de navegación' },
  ];

  setTopBar(value: boolean): void {
    this.isTopBar.set(value);
  }

  setInactive(value: boolean): void {
    this.isInactive.set(value);
  }

  setDropdownOpen(value: boolean): void {
    this.dropdownOpen.set(value);
  }

  setItemCount(value: number): void {
    this.itemCount.set(value);
  }
}
