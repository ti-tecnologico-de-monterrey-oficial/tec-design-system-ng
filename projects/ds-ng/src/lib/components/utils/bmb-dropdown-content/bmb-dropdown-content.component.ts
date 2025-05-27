import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { BmbCheckExternalLinkButtonComponent } from '../../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { IBmbDropdownItemSelection, IDropdownItem } from '../../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-dropdown-content',
  standalone: true,
  imports: [
    CommonModule,
    BmbCheckExternalLinkButtonComponent,
    BmbIconComponent,
  ],
  templateUrl: './bmb-dropdown-content.component.html',
  styleUrl: './bmb-dropdown-content.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbDropdownContentComponent implements OnInit {
  selectedOption = input<string>(); //Internal
  isKeepSelection = input<boolean>(false); //Internal
  isMultiSelect = input<boolean>(false); //Internal

  items = model<IDropdownItem[] | IBmbDropdownItemSelection[]>([]);
  isOpen = model<boolean>(false);

  optionList: IBmbDropdownItemSelection[] = [];

  ngOnInit(): void {
    this.optionList = this.items() as IBmbDropdownItemSelection[];

    if (
      !!this.selectedOption() &&
      this.items().every(
        (element: IBmbDropdownItemSelection) => !element.checked,
      )
    ) {
      this.optionList = this.optionList.map(
        (element: IBmbDropdownItemSelection) => {
          return {
            ...element,
            checked: element.value === this.selectedOption(),
          };
        },
      );
    }
  }

  handleDropdown(item: IBmbDropdownItemSelection) {
    this.isOpen.update((value) => !value);
    if (this.isKeepSelection()) {
      if (this.isMultiSelect()) {
        item.checked = !item.checked;
      } else {
        this.optionList = this.optionList.map(
          (element: IBmbDropdownItemSelection) => {
            return {
              ...element,
              checked: element.value === item.value,
            };
          },
        );

        this.items.set(this.optionList);
      }
    }
    if (item?.action) item.action();
  }
}
