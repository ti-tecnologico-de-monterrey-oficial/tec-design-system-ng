import { ChangeDetectionStrategy, Component, computed, input, model, output, ViewEncapsulation } from "@angular/core";
import { BmbCardComponent, BmbCardContentComponent } from "../../bmb-card/bmb-card.component";
import { BmbActionIconComponent } from "../../bmb-action-icon/bmb-action-icon.component";
import { TranslatePipe } from '../../../pipes/translations';
import { BmbButtonDirective } from "../../../directives/bmb-button/button.directive";
import { CommonModule } from "@angular/common";
import { BmbLayoutGridDirective, BmbLayoutGridItemDirective } from "../../../directives/bmb-layout-grid/bmb-layout-grid.directive";
import { BmbCheckExternalLinkButtonComponent } from "../../bmb-check-external-link-button/bmb-check-external-link-button.component";

@Component({
  selector: 'bmb-timepicker-modal',
  standalone: true,
  imports: [
    BmbCardComponent,
    BmbCardContentComponent,
    BmbActionIconComponent,
    TranslatePipe,
    BmbButtonDirective,
    CommonModule,
    BmbLayoutGridDirective,
    BmbLayoutGridItemDirective,
    BmbCheckExternalLinkButtonComponent,
],
  templateUrl: './bmb-timepicker-modal.component.html',
  styleUrls: ['./bmb-timepicker-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class BmbTimepickerModalComponent {
  displayHour = model<number | null>(null);
  selectedMinute = model<number | null>(null);
  format = input<'12h' | '24h'>('12h');
  period = model<'AM' | 'PM'>('AM');
  minutes = input<number[]>();
  hours = input<number[]>();

  fullValue = computed(() => {
    const hour = this.displayHour();
    const minute = this.selectedMinute();
    const period = this.period();
    if (hour === null || minute === null) {
      return '';
    }
    const paddedHour = hour > 9 ? hour : '0' + hour;
    const paddedMinute = minute > 9 ? minute : '0' + minute;
    return this.format() === '12h' ? `${paddedHour}:${paddedMinute} ${period}` : `${paddedHour}:${paddedMinute}`;
  });

  getValue = output<string>();
  getClose = output<void>();

  currentPage = model<'hour' | 'minute' | 'period'>('hour');

  isOptionActive(value: number | null, option: number) {
    if (value === null) {
      return false;
    }
    return value === option;
  }

  handleClose() {
    this.getClose.emit();
  }

  pad(value: number) {
    return value > 9 ? value : '0' + value;
  }

  handleHourChange(value: string) {
    this.displayHour.set(Number.parseInt(value, 10));
    this.currentPage.set('minute');
  }

  handleMinuteChange(value: string) {
    this.selectedMinute.set(Number.parseInt(value, 10));
    this.currentPage.set('period');
  }

  handlePeriodChange(value: 'AM' | 'PM') {
    this.period.set(value);
  }

  submitValue() {
    this.getValue.emit(this.fullValue());
    this.handleClose();
  }
}
