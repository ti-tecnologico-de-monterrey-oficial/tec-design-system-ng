import { Component, computed, input, model, output } from "@angular/core";
import { BmbCardComponent, BmbCardContentComponent } from "../../bmb-card/bmb-card.component";
import { BmbActionIconComponent } from "../../bmb-action-icon/bmb-action-icon.component";
import { BmbLayoutDirective } from "../../../directives/bmb-layout/bmb-layout.directive";
import { BmbLayoutItemDirective } from "../../../directives/bmb-layout/bmb-layout-item.directive";
import { TranslatePipe } from '../../../pipes/translations';
import { BmbButtonDirective } from "../../../directives/bmb-button/button.directive";

@Component({
  selector: 'bmb-timepicker-modal',
  standalone: true,
  imports: [
    BmbCardComponent,
    BmbCardContentComponent,
    BmbActionIconComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    TranslatePipe,
    BmbButtonDirective,
  ],
  templateUrl: './bmb-timepicker-modal.component.html',
  styleUrls: ['./bmb-timepicker-modal.component.scss']
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
