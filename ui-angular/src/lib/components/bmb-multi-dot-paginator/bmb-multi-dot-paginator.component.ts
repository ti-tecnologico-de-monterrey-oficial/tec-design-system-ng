import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  input,
  model,
  signal,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import { BmbMultiDotPaginatorItemComponent } from './bmb-multi-dot-paginator-item/bmb-multi-dot-paginator-item.component';
import { CommonModule } from '@angular/common';
import { BmbFabComponent } from '../bmb-fab/bmb-fab.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { logDeprecatedInput } from '../../_shared/logic/logDeprecatedInput';
import { TranslatePipe } from '../../pipes/translations';
import {
  getMultiDotPaginatorActiveIndex,
  getMultiDotPaginatorNextIndex,
  getMultiDotPaginatorPreviousIndex,
  getMultiDotPaginatorSelectedIndex,
  getMultiDotPaginatorWrappedNextIndex,
} from '../../_shared/logic/components/multi-dot-paginator';

@Component({
  selector: 'bmb-multi-dot-paginator',
  standalone: true,
  imports: [
    CommonModule,
    BmbFabComponent,
    BmbActionIconComponent,
    TranslatePipe,
  ],
  templateUrl: './bmb-multi-dot-paginator.component.html',
  styleUrl: './bmb-multi-dot-paginator.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbMultiDotPaginatorComponent {
  subtitle = input<string>('');
  componentTitle = input<string>(); // once title is removed, this should be required

  selectedIndex = model<number>(0);

  title = input<string>(); // deprecated

  childrenItems = contentChildren<BmbMultiDotPaginatorItemComponent>(
    BmbMultiDotPaginatorItemComponent,
  );

  numberOfElements = signal<number[]>([]);
  private previousSelectedIndex = 0;

  constructor() {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      const childrenItems = this.childrenItems();
      const activeChildren = this.selectedIndex();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );

      if (!deprecatedTitle && !newTitle) {
        throw new Error(
          'The "componentTitle" input is required. Please provide a value for it.',
        );
      }

      this.numberOfElements.set(Array(childrenItems?.length ?? 0).fill(0));
      untracked(() =>
        this.setClassActive(
          activeChildren,
          this.previousSelectedIndex,
          false,
        ),
      );
    });
  }

  protected selectItem(index: number) {
    this.setClassActive(index, this.selectedIndex());
  }

  protected setClassActive(
    newIndex: number,
    oldIndex = 0,
    updateSelectedIndex = true,
  ) {
    const activeItem = this.childrenItems()[
      getMultiDotPaginatorActiveIndex(newIndex, this.numberOfElements().length)
    ] as any;
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

    const selectedIndex = getMultiDotPaginatorSelectedIndex(
      newIndex,
      this.numberOfElements().length,
    );

    if (updateSelectedIndex) {
      this.selectedIndex.set(selectedIndex);
    }

    this.previousSelectedIndex = selectedIndex;
  }

  protected setNextItem() {
    const nextIndex = getMultiDotPaginatorWrappedNextIndex(
      this.selectedIndex(),
      this.numberOfElements().length,
    );
    this.setClassActive(nextIndex, this.selectedIndex());
  }

  protected prevItem() {
    const previousIndex = getMultiDotPaginatorPreviousIndex(
      this.selectedIndex(),
    );
    if (previousIndex === this.selectedIndex()) return;

    this.setClassActive(previousIndex, this.selectedIndex());
  }

  protected nextItem() {
    const nextIndex = getMultiDotPaginatorNextIndex(
      this.selectedIndex(),
      this.numberOfElements().length,
    );
    if (nextIndex === this.selectedIndex()) return;

    this.setClassActive(nextIndex, this.selectedIndex());
  }
}
