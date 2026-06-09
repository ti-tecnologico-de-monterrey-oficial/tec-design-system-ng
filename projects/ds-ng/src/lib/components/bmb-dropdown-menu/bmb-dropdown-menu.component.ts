import {
  Component,
  input,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  output,
} from '@angular/core';
import { BmbDropdownContentComponent } from '../utils/bmb-dropdown-content/bmb-dropdown-content.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { IDropdownItem } from '../../types';
import { BmbProjectionContentService } from '../../services/projection/projection.service';
import { TranslatePipe } from '../../pipes/translations';

@Component({
  selector: 'bmb-dropdown-menu',
  standalone: true,
  templateUrl: './bmb-dropdown-menu.component.html',
  styleUrl: './bmb-dropdown-menu.component.scss',
  imports: [BmbActionIconComponent, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbDropdownMenuComponent {
  items = input<IDropdownItem[]>([]);

  icon = input<string>('more_vert');

  clickedItem = output<IDropdownItem>();
  contentID = signal<string>('');

  @ViewChild('contentDiv', { static: true }) contentRef!: ElementRef<any>;

  constructor(private projectionService: BmbProjectionContentService) {}

  openDropdown() {
    const data = {
      content: BmbDropdownContentComponent,
      targetRef: this.contentRef?.nativeElement,
      inputContext: { items: this.items() },
      outputContext: {
        clickedItem: (item: IDropdownItem) => {
          this.clickedItem.emit(item);
          this.projectionService.closeContent(this.contentID());
        },
      },
      focusOnOpen: true,
      showBackdrop: false,
    };
    const id = this.projectionService.openContent(data);
    this.contentID.set(id);
  }
}
