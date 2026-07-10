import {
  Component,
  OnInit,
  OnDestroy,
  input,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

import {
  IBmbDataTopBar,
  getLinkClass,
  getClasses,
  getDropdownItems,
  getPenultimateLink,
} from '@ti-tecnologico-de-monterrey-oficial/core/component/breadcrumb';

@Component({
  selector: 'bmb-breadcrumb',
  standalone: true,
  templateUrl: './bmb-breadcrumb.component.html',
  styleUrl: './bmb-breadcrumb.component.scss',
  imports: [CommonModule, RouterModule, BmbIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbBreadcrumbComponent implements OnInit, OnDestroy {
  dataTopBar = input<IBmbDataTopBar[]>([]);
  dataLocalNav = input<IBmbDataTopBar[]>([]);
  isTopBar = input<boolean>(false);
  isInactive = input<boolean>(false);

  dropdownOpen = signal(false);

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  getLinkClass(length: number): string {
    return getLinkClass(length);
  }

  getClasses(item: any): { [key: string]: boolean } {
    return getClasses({
      length: this.dataLocalNav().length,
      isInactive: this.isInactive(),
    });
  }

  toggleDropdown(): void {
    this.dropdownOpen.update((value) => !value);
  }

  getDropdownItems(items: IBmbDataTopBar[]): IBmbDataTopBar[] {
    return getDropdownItems(items);
  }

  getPenultimateLink(): string | undefined {
    return getPenultimateLink(this.dataLocalNav());
  }
}