import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBmbActionHeader } from '../../../_shared/types/utils';
import { IDropdownItem } from '../../../_shared/types';
import { IBmbActionIconEventType } from '../../../_shared/types/components/action-icon';
import { BmbDropdownMenuComponent } from '../bmb-dropdown-menu/bmb-dropdown-menu.component';
import { getUUID } from '@shared/logic/utils';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbLayoutDirective } from '../../../directives/old/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/old/bmb-layout/bmb-layout-item.directive';

@Component({
  selector: 'bmb-header-actions',
  standalone: true,
  imports: [
    CommonModule,
    BmbActionIconComponent,
    BmbDropdownMenuComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  templateUrl: './bmb-header-actions.component.html',
  styleUrls: ['./bmb-header-actions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHeaderActionsComponent {
  headerActions = input.required<IBmbActionHeader[]>();

  getActionClick = output<IBmbActionIconEventType>();

  useDropdown = computed<boolean>(
    () => (this.headerActions()?.length ?? 0) > 2,
  );

  // dropdownItems = computed<IDropdownItem[]>(() =>
  //   (this.headerActions() ?? []).map((h) => ({
  //     idItem: getUUID(),
  //     icon: h.icon,
  //     text: h.alt ?? '',
  //     url: h.link,
  //     action: h.action,
  //   })),
  // );

  // onDropdownSelect(item: IDropdownItem): void {
  //   item.action?.();
  //   this.getActionClick.emit({
  //     name: item.icon,
  //     event: new MouseEvent(),
  //   } as IBmbActionIconEventType);
  // }

  protected handleAction(
    headerAction: IBmbActionHeader,
    event: IBmbActionIconEventType,
  ): void {
    headerAction.action?.();
    this.getActionClick.emit(event);
  }
}
