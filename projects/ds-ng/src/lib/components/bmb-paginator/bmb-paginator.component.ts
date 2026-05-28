import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  output,
  computed,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

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
    Math.ceil(this.totalItems() / this.itemsPerPage()),
  );

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.pageChange.emit(page);
  }

  pages = computed(() => {
    const pages = [];

    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }

    return pages;
  });

  getPaginationText(): string {
    if (this.totalItems() == 0) {
      return `0 de ${this.totalPages() || 0}`;
    }
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage() + 1;
    const endIndex = Math.min(
      this.currentPage() * this.itemsPerPage(),
      this.totalItems(),
    );
    return `${startIndex} - ${endIndex} de ${this.totalItems()}`;
  }
}
