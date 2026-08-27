import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  output,
  computed,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  getPaginatorPages,
  getPaginatorText,
  getPaginatorTotalPages,
  isPaginatorPageValid,
} from '../../_shared/logic/components/paginator';

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

@Component({
  selector: 'bmb-paginator',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  templateUrl: './bmb-paginator.component.html',
  styleUrl: './bmb-paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbPaginatorComponent {
  totalItems = input<number>(0);
  itemsPerPage = input<number>(5);
  currentPage = input<number>(1);

  pageChange = output<number>();

  totalPages = computed(() =>
    getPaginatorTotalPages(this.totalItems(), this.itemsPerPage()),
  );

  onPageChange(page: number): void {
    if (!isPaginatorPageValid(page, this.totalPages())) return;
    this.pageChange.emit(page);
  }

  pages = computed(() => getPaginatorPages(this.totalPages()));

  getPaginationText(): string {
    return getPaginatorText(
      this.totalItems(),
      this.itemsPerPage(),
      this.currentPage(),
      this.totalPages(),
    );
  }
}
