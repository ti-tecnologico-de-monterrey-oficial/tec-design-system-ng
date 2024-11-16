import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  input,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { BmbMultiDotPaginatorItemComponent } from './bmb-multi-dot-paginator-item/bmb-multi-dot-paginator-item.component';
import { CommonModule } from '@angular/common';
import { BmbFabComponent } from '../bmb-fab/bmb-fab.component';

@Component({
  selector: 'bmb-multi-dot-paginator',
  standalone: true,
  imports: [CommonModule, BmbFabComponent],
  templateUrl: './bmb-multi-dot-paginator.component.html',
  styleUrl: './bmb-multi-dot-paginator.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbMultiDotPaginatorComponent implements AfterContentInit {
  title = input.required<string>();
  subtitle = input<string>('');

  @ContentChildren(BmbMultiDotPaginatorItemComponent)
  contentChildren!: QueryList<ElementRef>;

  numberOfElements: number[] = [];
  selectedIndex = 0;

  ngAfterContentInit() {
    this.numberOfElements = Array(this.contentChildren.length ?? 0).fill(0);
    this.setClassActive(0);
  }

  selectItem(index: number) {
    this.setClassActive(index, this.selectedIndex);
  }

  setClassActive(newIndex: number, oldIndex: number = 0) {
    const activeItem = this.contentChildren?.get(newIndex) as any;
    const oldItem = this.contentChildren?.get(oldIndex) as any;
    if (oldItem) {
      oldItem.multiDotPaginatorItem.nativeElement.parentElement.classList.remove(
        'bmb_multi-dot-paginator-item-active',
      );
    }
    if (activeItem) {
      activeItem.multiDotPaginatorItem.nativeElement.parentElement.classList.add(
        'bmb_multi-dot-paginator-item-active',
      );
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
}
