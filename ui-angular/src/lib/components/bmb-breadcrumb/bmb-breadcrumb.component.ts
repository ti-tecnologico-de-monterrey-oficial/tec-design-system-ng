import {
  Component,
  input,
  model,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  getBreadcrumbClasses,
  getBreadcrumbDropdownItems,
  getBreadcrumbPenultimateLink,
} from '../../_shared/logic/components/breadcrumb';
import type { IBmbDataTopBar } from '../../_shared/types/components/breadcrumb';

export type { IBmbDataTopBar } from '../../_shared/types/components/breadcrumb';

@Component({
  selector: 'bmb-breadcrumb',
  standalone: true,
  templateUrl: './bmb-breadcrumb.component.html',
  styleUrl: './bmb-breadcrumb.component.scss',
  imports: [CommonModule, RouterModule, BmbIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbBreadcrumbComponent {
  dataTopBar = input<IBmbDataTopBar[]>([]);
  dataLocalNav = input<IBmbDataTopBar[]>([]);
  isTopBar = input<boolean>(false);
  isInactive = input<boolean>(false);
  dropdownOpen = model<boolean>(false);

  getClasses(_item?: IBmbDataTopBar): Record<string, boolean> {
    return getBreadcrumbClasses(this.dataLocalNav().length, this.isInactive());
  }

  toggleDropdown() {
    this.dropdownOpen.set(!this.dropdownOpen());
  }

  getDropdownItems(items: IBmbDataTopBar[]): IBmbDataTopBar[] {
    return getBreadcrumbDropdownItems(items);
  }

  getPenultimateLink(): string | undefined {
    return getBreadcrumbPenultimateLink(this.dataLocalNav());
  }
}
