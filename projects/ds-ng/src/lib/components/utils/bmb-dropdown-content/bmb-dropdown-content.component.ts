import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  model,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  untracked,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BmbCheckExternalLinkButtonComponent } from '../../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { IDropdownItem } from '../../../types';
import { CommonModule } from '@angular/common';
import { BmbProjectionContentService } from '../../../services/projection.service';

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
export class BmbDropdownContentComponent implements OnChanges {
  selectedOption = input<string | string[]>(); //Internal
  items = model<IDropdownItem[]>([]);
  isKeyboardEvent = model<boolean>(false); //Internal

  isOpen = model<boolean>(false); //remove this

  ngOnChanges(changes: SimpleChanges): void {
    // if (
    //   changes['isOpen'] &&
    //   changes['isOpen'].currentValue &&
    //   this.modalContainer
    // ) {
    //   this.addFocusToFirstElement();
    // }
  }

  isSelected(item: string): boolean {
    if (typeof this.selectedOption() === 'string')
      return item === this.selectedOption();

    return this.selectedOption()?.includes(item) || false;
  }

  handleDropdown(item: IDropdownItem) {
    if (item?.action) item.action();
  }
}
