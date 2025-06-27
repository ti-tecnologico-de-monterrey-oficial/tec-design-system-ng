import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  effect,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeNames } from '../../types';
import { BorderType } from './types';
import { BmbListGroupStatusService } from './bmb-list-group.service';

@Component({
  selector: 'bmb-list-group',
  standalone: true,
  templateUrl: './bmb-list-group.component.html',
  styleUrl: './bmb-list-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [BmbListGroupStatusService],
  imports: [CommonModule],
})
export class BmbListGroupComponent {
  borderRadius = input<SizeNames | SizeNames[]>('m');
  borderType = input<BorderType>('rounded');
  margin = input<SizeNames>('m');
  padding = input<SizeNames | SizeNames[]>('m');
  isMultipleSelection = input<boolean>(false);
  isRowView = input<boolean>(false);
  showControls = input<boolean>(false);
  listGroupId = input<string>('listGroupStatus');

  selectionChange = output<string[]>();

  constructor(private bmbListGroupStatusService: BmbListGroupStatusService) {
    effect(() => {
      this.selectionChange.emit(
        this.bmbListGroupStatusService.getListGroupStatus(),
      );
    });
  }

  ngOnInit() {
    this.bmbListGroupStatusService.setListGroupConfiguration({
      isMultipleSelection: this.isMultipleSelection(),
      showControls: this.showControls(),
    });
    this.bmbListGroupStatusService.setListGroupId(this.listGroupId());
  }

  getVarStyles(size: SizeNames | SizeNames[]) {
    if (Array.isArray(size)) {
      return size.map((s) => `var(--bmb-spacing-${s})`).join(' ');
    } else {
      return `var(--bmb-spacing-${size})`;
    }
  }

  getClassNames() {
    const classList = ['bmb_list-group', `bmb_list-group-${this.borderType()}`];
    if (!this.showControls()) classList.push('bmb_list-group-no-controls');
    if (this.isRowView()) classList.push('bmb_list-group-row');
    return classList;
  }

  getStyles() {
    return {
      '--bmb-list-group-item-radius': this.getVarStyles(this.borderRadius()),
      '--bmb-list-group-item-padding': this.getVarStyles(this.padding()),
      gap: `var(--bmb-spacing-${this.margin()})`,
    };
  }
}
