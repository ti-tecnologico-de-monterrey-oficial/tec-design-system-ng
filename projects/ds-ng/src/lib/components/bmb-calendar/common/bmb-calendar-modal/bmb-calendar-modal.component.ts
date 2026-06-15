import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BmbCheckboxComponent } from '../../../bmb-checkbox/bmb-checkbox.component';
import { BmbLayoutDirective } from '../../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbDividerComponent } from '../../../bmb-divider/bmb-divider.component';
import { BmbSwitchComponent } from '../../../bmb-switch/bmb-switch.component';
import { TranslatePipe } from '../../../../pipes/translations';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbCalendarComponentService } from '../../bmb-calendar.service';

@Component({
  selector: 'bmb-calendar-modal',
  standalone: true,
  imports: [
    BmbCheckboxComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbDividerComponent,
    BmbSwitchComponent,
    TranslatePipe,
    ReactiveFormsModule,
    CommonModule,
  ],
  template: `<form [formGroup]="calendarForm">
    @for (item of filteredEvents.calendars; track $index) {
      <div bmbLayout gapSize="m" alignItems="center">
        <bmb-checkbox
          bmbLayoutItem
          [isDynamicItem]="true"
          [inputId]="'checkbox_' + item"
          [name]="'checkbox_' + item"
          [control]="getFormControl(item)"
        />
        <div
          bmbLayoutItem
          [isDynamicItem]="true"
          [ngClass]="getBulletClass(item)"
        ></div>
        <label
          bmbLayoutItem
          [isDynamicItem]="true"
          [colGrow]="1"
          [htmlFor]="'checkbox_' + item"
          >{{ getCalendarName(item) }}</label
        >
      </div>
    }
    <bmb-divider type="simple"></bmb-divider>
    <bmb-switch
      [isChecked]="true"
      [ariaLabel]="'calendar.modal.notification_label' | translate"
      [rightText]="'calendar.modal.notification_label' | translate"
      name="enable_notifications"
      inputId="enable_notifications"
      [control]="getFormControl('enable_notifications')"
    ></bmb-switch>
  </form>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarModalComponent implements OnInit {
  private readonly calendarService = inject(BmbCalendarComponentService);
  private readonly destroyRef = inject(DestroyRef);
  filteredEvents = this.calendarService.getFilteredEvents();
  calendarForm: FormGroup<{ [key: string]: FormControl<any> }> = new FormGroup(
    {},
  );
  filters = this.calendarService.getFilters();

  constructor() {
    effect(() => {
      const calendars = this.filteredEvents.calendars || [];
      calendars.forEach((calendar) => {
        this.calendarForm.addControl(
          calendar,
          new FormControl(this.filters[calendar] || true),
        );
      });
    });
  }

  ngOnInit() {
    this.calendarForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((formValue) => {
        this.onCalendarFormChange(formValue as Record<string, boolean>);
      });

    this.calendarForm.addControl('enable_notifications', new FormControl(true));
  }

  private onCalendarFormChange(formValue: Record<string, boolean>): void {
    console.log('Form value changed:', formValue, this.calendarForm.value);
    this.calendarService.setTemporalFilters(formValue);
  }

  getCalendarName(name: string): string {
    switch (name) {
      case 'academic':
        return 'Horario de clases';
      case 'life':
        return 'Vida';
      case 'events':
        return 'Eventos';
      case 'save_the_date':
        return 'Save the date';
      default:
        return name;
    }
  }

  getBulletClass(name: string): string[] {
    return ['bmb_calendar-event-bullet', `bmb_calendar-event-bullet-${name}`];
  }

  getFormControl(name: string): FormControl {
    return this.calendarForm.get(name) as FormControl;
  }
}
