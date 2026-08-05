import {
  Component,
  OnInit,
  input,
  signal,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

export interface IBmbDataTopBar {
  text: string;
  link?: string;
}

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
  dropdownOpen = signal<boolean>(false);

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  getLinkClass(length: number): string {
    if (length > 4) {
      return 'bmb_breadcrumb-link-more';
    }
    return `bmb_breadcrumb-link-${length}`;
  }

  getClasses(item: any): { [key: string]: boolean } {
    const classes = {
      [this.getLinkClass(this.dataLocalNav().length)]: true,
      'bmb_breadcrumb-link-inactive': this.isInactive(),
    };
    return classes;
  }

  toggleDropdown() {
    this.dropdownOpen.set(!this.dropdownOpen());
  }

  getDropdownItems(items: any[]): any[] {
    if (items.length > 4) {
      return items.slice(1, items.length - 2);
    }
    return [];
  }

  getPenultimateLink(): string | undefined {
    const length = this.dataLocalNav().length;
    if (length > 1) {
      return this.dataLocalNav()[length - 2].link;
    }
    return undefined;
  }
}
