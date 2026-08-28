import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { BmbPaginatorComponent } from 'ui-angular';

@Component({
  selector: 'app-paginator-page',
  imports: [BmbPaginatorComponent],
  templateUrl: './paginator-page.html',
  styleUrl: './paginator-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorPage {
  readonly totalItems = signal(20);
  readonly itemsPerPage = signal(5);
  readonly currentPage = signal(1);
  readonly lastEvent = signal('Sin interacción');
  readonly totalPages = computed(() =>
    Math.ceil(this.totalItems() / this.itemsPerPage()),
  );
  readonly visibleItems = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = Math.min(start + this.itemsPerPage(), this.totalItems());

    return Array.from(
      { length: Math.max(0, end - start) },
      (_, index) => `Elemento ${start + index + 1}`,
    );
  });

  setTotalItems(value: number): void {
    this.totalItems.set(Math.max(0, Math.trunc(value || 0)));
    this.clampCurrentPage();
  }

  setItemsPerPage(value: number): void {
    this.itemsPerPage.set(Math.max(1, Math.trunc(value || 1)));
    this.clampCurrentPage();
  }

  setCurrentPage(value: number): void {
    const maximum = Math.max(1, this.totalPages());
    this.currentPage.set(Math.min(maximum, Math.max(1, Math.trunc(value || 1))));
  }

  handlePageChange(page: number): void {
    this.currentPage.set(page);
    this.lastEvent.set(`pageChange: ${page}`);
  }

  private clampCurrentPage(): void {
    this.setCurrentPage(this.currentPage());
  }
}
