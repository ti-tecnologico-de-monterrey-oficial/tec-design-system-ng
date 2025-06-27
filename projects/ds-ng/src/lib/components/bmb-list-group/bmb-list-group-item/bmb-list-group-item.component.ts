import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbRadialComponent } from '../../bmb-radial/bmb-radial.component';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbTooltipComponent } from '../../bmb-tooltip/bmb-tooltip.component';
import { BmbBadgeComponent } from '../../bmb-badge/bmb-badge.component';
import { BmbImageComponent } from '../../bmb-image/bmb-image.component';
import { IBbmBgAppearance } from '../../bmb-advertisement-card/types';
import { BmbListGroupStatusService } from '../bmb-list-group.service';

@Component({
  selector: 'bmb-list-group-item',
  standalone: true,
  imports: [
    CommonModule,
    BmbRadialComponent,
    BmbCheckboxComponent,
    BmbIconComponent,
    BmbTooltipComponent,
    BmbBadgeComponent,
    BmbImageComponent,
  ],
  templateUrl: './bmb-list-group-item.component.html',
  styleUrl: './bmb-list-group-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbListGroupItemComponent {
  id = input.required<string>();
  isDisabled = input<boolean>(false);
  isActive = input<boolean>(false);
  personalizedTemplate = input<boolean>(true);
  headerText = input<string>('');
  descriptionText = input<string>('');
  infoText = input<string>('');
  icon = input<string>('');
  imgSrc = input<string>('');
  tooltipTitle = input<string>('');
  tooltipText = input<string>('');
  badgeAppearance = input<IBbmBgAppearance>('mitec_purple');
  badgeText = input<string>('');

  inputRadioName: string = '';
  defaultWidthImage = '40px';

  constructor(private bmbListGroupStatusService: BmbListGroupStatusService) {}

  ngOnInit() {
    if (this.isActive()) {
      this.bmbListGroupStatusService.updateListGroupStatus(this.id());
    }
    this.inputRadioName = this.bmbListGroupStatusService.getListGroupId();
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
