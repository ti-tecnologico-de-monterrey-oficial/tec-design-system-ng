import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbMultiDotPaginatorItemComponent } from './bmb-multi-dot-paginator-item/bmb-multi-dot-paginator-item.component';
import { CommonModule } from '@angular/common';
import { BmbFabComponent } from '../bmb-fab/bmb-fab.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';

@Component({
  selector: 'bmb-multi-dot-paginator',
  standalone: true,
  imports: [CommonModule, BmbFabComponent, BmbActionIconComponent],
  templateUrl: './bmb-multi-dot-paginator.component.html',
  styleUrl: './bmb-multi-dot-paginator.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbMultiDotPaginatorComponent implements AfterContentInit {
  title = input.required<string>();
  subtitle = input<string>('');

  childrenItems = contentChildren<BmbMultiDotPaginatorItemComponent>(BmbMultiDotPaginatorItemComponent);

  numberOfElements: number[] = [];
  selectedIndex = 0;

  ngAfterContentInit() {
    this.numberOfElements = Array(this.childrenItems().length ?? 0).fill(0);
    this.setClassActive(0);
  }

  selectItem(index: number) {
    this.setClassActive(index, this.selectedIndex);
  }

  setClassActive(newIndex: number, oldIndex: number = 0) {
    const activeItem = this.childrenItems()[newIndex] as any;
    const oldItem = this.childrenItems()[oldIndex] as any;

    if (!activeItem) return;

    const container =
      activeItem.multiDotPaginatorItem.nativeElement.parentElement
        .parentElement;

    if (oldItem) {
      oldItem.multiDotPaginatorItem.nativeElement.parentElement.classList.remove(
        'bmb_multi-dot-paginator-item-active',
      );
    }

    activeItem.multiDotPaginatorItem.nativeElement.parentElement.classList.add(
      'bmb_multi-dot-paginator-item-active',
    );

    if (newIndex !== oldIndex) {
      container.classList.remove('bounce');
      container.getBoundingClientRect();

      setTimeout(() => {
        container.classList.add('bounce');
      }, 500);
    }

    this.selectedIndex = newIndex;
  }

  setNextItem() {
    if (this.selectedIndex + 1 === this.numberOfElements.length) {
      this.setClassActive(0, this.selectedIndex);
    } else {
      this.setClassActive(this.selectedIndex + 1, this.selectedIndex);
    }
  }

  prevItem() {
    if (this.selectedIndex > 0) {
      this.setClassActive(this.selectedIndex - 1, this.selectedIndex);
    }
  }

  nextItem() {
    if (this.selectedIndex < this.numberOfElements.length - 1) {
      this.setClassActive(this.selectedIndex + 1, this.selectedIndex);
    }
  }
}
