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
import { BmbRadialComponent } from '../bmb-radial/bmb-radial.component';
import { BmbCheckboxComponent } from '../bmb-checkbox/bmb-checkbox.component';

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

@Component({
  selector: 'bmb-list-group-item',
  standalone: true,
  imports: [CommonModule, BmbRadialComponent, BmbCheckboxComponent],
  templateUrl: './bmb-list-group-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbListGroupItemComponent {
  id = input.required<string>();
  isDisabled = input<boolean>(false);
  isActive = input<boolean>(false);

  constructor(private bmbListGroupStatusService: BmbListGroupStatusService) {}

  ngOnInit() {
    if (this.isActive()) {
      this.bmbListGroupStatusService.updateListGroupStatus(this.id());
    }
  }

  handleSelection() {
    this.bmbListGroupStatusService.updateListGroupStatus(this.id());
  }

  getClasses(): string[] {
    const isElementSelected = this.bmbListGroupStatusService
      .getListGroupStatus()
      .includes(this.id());

    const classNames = ['bmb_list-group-item'];
    if (isElementSelected) classNames.push('bmb_list-group-item-selected');
    if (this.isDisabled()) classNames.push('bmb_list-group-item-disabled');

    return classNames;
  }

  getConfig() {
    return this.bmbListGroupStatusService.getListGroupConfiguration();
  }

  getSelectionLength() {
    return this.bmbListGroupStatusService.getListGroupStatus().length;
  }

  showControls(): boolean {
    return this.bmbListGroupStatusService.getListGroupConfiguration()
      .showControls;
  }

  handleItemSelection() {
    if (!this.showControls() && !this.isDisabled()) {
      this.bmbListGroupStatusService.updateListGroupStatus(this.id());
    }
  }
}
