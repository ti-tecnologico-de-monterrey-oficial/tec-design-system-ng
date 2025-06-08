import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  model,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BmbCheckExternalLinkButtonComponent } from '../../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { IDropdownItem } from '../../../types';
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
export class BmbDropdownContentComponent implements OnChanges {
  selectedOption = input<string | string[]>(); //Internal

  items = model<IDropdownItem[]>([]);
  isOpen = model<boolean>(false);
  isKeyboardEvent = model<boolean>(false); //Internal

  @ViewChild('modalContainer') modalContainer!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['isOpen'] &&
      changes['isOpen'].currentValue &&
      this.modalContainer
    ) {
      this.addFocusToFirstElement();
    }
  }

  addFocusToFirstElement(): void {
    setTimeout(() => {
      const buttonList =
        this.modalContainer.nativeElement.querySelectorAll('button');
      if (this.isKeyboardEvent() && buttonList.length > 0) {
        (buttonList[0] as HTMLElement).focus();
      }
    });
  }

  isSelected(item: string): boolean {
    if (typeof this.selectedOption() === 'string')
      return item === this.selectedOption();

    return this.selectedOption()?.includes(item) || false;
  }

  handleDropdown(item: IDropdownItem) {
    this.isOpen.update((value) => !value);
    if (!this.isOpen()) this.isKeyboardEvent.set(false);
    if (item?.action) item.action();
  }
}
