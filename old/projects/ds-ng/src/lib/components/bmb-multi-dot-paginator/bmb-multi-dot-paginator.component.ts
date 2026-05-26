import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { BmbMultiDotPaginatorItemComponent } from './bmb-multi-dot-paginator-item/bmb-multi-dot-paginator-item.component';
import { CommonModule } from '@angular/common';
import { BmbFabComponent } from '../bmb-fab/bmb-fab.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';
import { TranslatePipe } from '../../pipes/translations';

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
export class BmbMultiDotPaginatorComponent implements AfterContentInit {
  subtitle = input<string>('');
  componentTitle = input<string>(); // once title is removed, this should be required

  selectedIndex = model<number>(0);

  title = input<string>(); // deprecated

  childrenItems = contentChildren<BmbMultiDotPaginatorItemComponent>(
    BmbMultiDotPaginatorItemComponent,
  );

  numberOfElements: number[] = [];

  constructor() {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );

      if (!deprecatedTitle && !newTitle) {
        throw new Error(
          'The "componentTitle" input is required. Please provide a value for it.',
        );
      }
    });
  }

  ngAfterContentInit() {
    this.numberOfElements = Array(this.childrenItems().length ?? 0).fill(0);
    this.setClassActive(this.selectedIndex());
  }

  protected selectItem(index: number) {
    this.setClassActive(index, this.selectedIndex());
    console.info('selectItem index', index, this.selectedIndex());
  }

  protected setClassActive(newIndex: number, oldIndex: number = 0) {
    const activeItem = this.childrenItems()[
      newIndex === this.numberOfElements.length
        ? this.numberOfElements.length - 1
        : newIndex
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

    this.selectedIndex.set(
      newIndex === this.numberOfElements.length ? newIndex - 1 : newIndex,
    );
  }

  protected setNextItem() {
    if (this.selectedIndex() + 1 === this.numberOfElements.length) {
      this.setClassActive(0, this.selectedIndex());
    } else {
      this.setClassActive(this.selectedIndex() + 1, this.selectedIndex());
    }
  }

  protected prevItem() {
    if (this.selectedIndex() > 0) {
      this.setClassActive(this.selectedIndex() - 1, this.selectedIndex());
    }
  }

  protected nextItem() {
    if (this.selectedIndex() < this.numberOfElements.length) {
      this.setClassActive(this.selectedIndex() + 1, this.selectedIndex());
      console.info('nextItem', this.selectedIndex());
    }
  }
}
