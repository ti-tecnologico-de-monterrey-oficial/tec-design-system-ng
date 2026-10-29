import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  OnInit,
  output,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { IBmbInputError } from '../../_shared/types/input';
import { BmbProjectionContentService } from '../../services/old/projection/projection.service';
import { getUUID } from '../../_shared/logic/utils';
import {
  assignNewFormControl,
  newFormControlByType,
  showError,
} from '../../_shared/logic/formControl';
import { BmbInputContentComponent } from '../bmb-input/bmb-input-content/bmb-input-content.component';
import { BmbInputValidatorComponent } from '../bmb-input/bmb-input-validator/bmb-input-validator.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbTimepickerModalComponent } from './bmb-timepicker-modal/bmb-timepicker-modal.component';

export type IBmbTimepickerFormat = '12h' | '24h';
export type IBmbTimepickerPeriod = 'AM' | 'PM';
export type IBmbMinuteStep = 1 | 2 | 5 | 10 | 15 | 30;

interface IParsedTime {
  hour: number; // 0-23
  minute: number;
}

const pad = (n: number) => n.toString().padStart(2, '0');

@Component({
  selector: 'bmb-timepicker',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BmbInputContentComponent,
    BmbInputValidatorComponent,
    BmbIconComponent,
  ],
  templateUrl: './bmb-timepicker.component.html',
  styleUrl: './bmb-timepicker.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTimepickerComponent implements OnInit {
  label = input<string>('');
  format = input<IBmbTimepickerFormat>('12h');
  minuteStep = input<IBmbMinuteStep>(15);
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  isRequired = input<boolean>(false);
  isClearable = input<boolean>(false);
  name = input<string>(getUUID());
  inputId = input<string>(this.name());
  helperMessage = input<string>('');
  customValidation = input<ValidatorFn>();
  errorMessage = input<string | IBmbInputError>('');
  tooltip = input<string>('');
  control = model<FormControl>(newFormControlByType());

  getChange = output<string>();
  getFocus = output<boolean>();

  isWindowOpen = signal(false);
  selectedHour = signal<number | null>(null); // 0-23
  selectedMinute = signal<number | null>(null);

  resolvedPlaceholder = computed(
    () =>
      this.placeholder() || (this.format() === '12h' ? '-- : -- AM' : '-- : --'),
  );
  hours = computed(() =>
    this.format() === '12h'
      ? Array.from({ length: 12 }, (_, i) => i + 1)
      : Array.from({ length: 24 }, (_, i) => i),
  );
  minutes = computed(() => {
    const step = Math.max(1, Math.min(59, Math.floor(this.minuteStep())));
    return Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step);
  });
  period = computed<IBmbTimepickerPeriod>(() =>
    (this.selectedHour() ?? 0) >= 12 ? 'PM' : 'AM',
  );
  displayHour = computed(() => {
    const h = this.selectedHour();
    if (h === null) return null;
    return this.format() === '12h' ? h % 12 || 12 : h;
  });

  @ViewChild('contentDiv', { static: true }) contentRef!: ElementRef<any>;

  private readonly projectionService = inject(BmbProjectionContentService);
  private readonly panelId = getUUID();

  ngOnInit(): void {
    if (!this.control()) {
      this.control.set(assignNewFormControl(this.name(), this.control())!);
    }
    this.syncFromControl();
    this.control().valueChanges.subscribe(() => this.syncFromControl());
  }

  get shouldShowError(): boolean {
    return showError(this.control());
  }

  parseTime(value: string | null | undefined): IParsedTime | null {
    if (!value) return null;
    const match = /^\s*(\d{1,2}):(\d{2})\s*(AM|PM)?\s*$/i.exec(value);
    if (!match) return null;
    let hour = Number(match[1]);
    const minute = Number(match[2]);
    const meridiem = match[3]?.toUpperCase();
    if (minute > 59) return null;
    if (meridiem) {
      if (hour < 1 || hour > 12) return null;
      hour = (hour % 12) + (meridiem === 'PM' ? 12 : 0);
    } else if (hour > 23) {
      return null;
    }
    return { hour, minute };
  }

  formatTime(hour: number, minute: number): string {
    if (this.format() === '24h') return `${pad(hour)}:${pad(minute)}`;
    return `${pad(hour % 12 || 12)}:${pad(minute)} ${hour >= 12 ? 'PM' : 'AM'}`;
  }

  handleFocusedEvent(event: KeyboardEvent | MouseEvent) {
    if (this.disabled() || this.control().disabled) return;
    const isKey = event instanceof KeyboardEvent;
    if (isKey && event.key !== 'Enter' && event.key !== ' ') return;
    if (isKey) event.preventDefault();
    if (this.isWindowOpen()) return;

    this.openList();
  }

  openList() {
    if (this.disabled() || this.control().disabled) return;
    if (this.isWindowOpen()) return;

    this.syncFromControl();
    this.isWindowOpen.set(true);
    this.projectionService.openContent({
      id: this.panelId,
      content: BmbTimepickerModalComponent,
      targetRef: this.contentRef?.nativeElement,
      fixSizeToRef: true,
      showBackdrop: false,
      focusOnOpen: true,
      inputContext: {
        displayHour: this.displayHour(),
        selectedMinute: this.selectedMinute(),
        format: this.format(),
        period: this.period(),
        hours: this.hours(),
        minutes: this.minutes(),
      },
      outputContext: {
        getValue: (value) => this.control().setValue(value),
        getClose: () => this.handleClose(),
      },
      afterCloseContent: () => this.isWindowOpen.set(false),
    });
  }

  selectHour(hour: number) {
    const current = this.selectedHour();
    if (this.format() === '12h') {
      const isPm = (current ?? 0) >= 12;
      this.selectedHour.set((hour % 12) + (isPm ? 12 : 0));
    } else {
      this.selectedHour.set(hour);
    }
    this.commit();
  }

  handleFocus(value: boolean): void {
    if (value) this.openList();
    this.getFocus.emit(value);
  }

  selectMinute(minute: number) {
    this.selectedMinute.set(minute);
    if (this.selectedHour() === null) {
      this.selectedHour.set(this.format() === '12h' ? 0 : 0);
    }
    this.commit();
  }

  selectPeriod(period: IBmbTimepickerPeriod) {
    const hour = this.selectedHour() ?? 0;
    this.selectedHour.set(period === 'PM' ? (hour % 12) + 12 : hour % 12);
    this.commit();
  }

  handleClose() {
    this.projectionService.closeContent();
  }

  private commit() {
    const hour = this.selectedHour();
    const minute = this.selectedMinute() ?? 0;
    if (hour === null) return;
    this.selectedMinute.set(minute);
    const value = this.formatTime(hour, minute);
    this.control().setValue(value, { emitEvent: false });
    this.control().markAsDirty();
    this.control().markAsTouched();
    this.getChange.emit(value);
  }

  private syncFromControl() {
    const parsed = this.parseTime(this.control()?.value);
    this.selectedHour.set(parsed?.hour ?? null);
    this.selectedMinute.set(parsed?.minute ?? null);
  }
}
