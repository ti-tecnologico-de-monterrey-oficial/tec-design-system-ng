import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import {
  BmbDatepickerComponent,
  BmbHomeCardComponent,
  BmbStepProgressBarComponent,
} from 'ui-angular';

// Demonstration catalog only; no availability or reservation API is connected.
const DEMO_LOCATIONS = [
  {
    city: 'Monterrey',
    campuses: [
      {
        name: 'Campus Monterrey',
        buildings: [
          { name: 'Rectoría', floors: ['Planta baja', 'Piso 1', 'Piso 2'] },
          { name: 'Biblioteca', floors: ['Planta baja', 'Piso 1'] },
        ],
      },
    ],
  },
  {
    city: 'Ciudad de México',
    campuses: [
      {
        name: 'Campus Ciudad de México',
        buildings: [
          {
            name: 'Edificio administrativo',
            floors: ['Planta baja', 'Piso 1'],
          },
        ],
      },
    ],
  },
];

@Component({
  selector: 'app-room-reservation',
  imports: [
    BmbDatepickerComponent,
    BmbHomeCardComponent,
    BmbStepProgressBarComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './room-reservation.html',
  styleUrl: './room-reservation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RoomReservation {
  readonly expanded = signal(false);
  readonly form = new FormGroup({
    city: new FormControl('', { nonNullable: true }),
    campus: new FormControl('', { nonNullable: true }),
    building: new FormControl('', { nonNullable: true }),
    floor: new FormControl('', { nonNullable: true }),
    date: new FormControl('', { nonNullable: true }),
    startTime: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    startPeriod: new FormControl('AM', { nonNullable: true }),
    endTime: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    endPeriod: new FormControl('AM', { nonNullable: true }),
  });
  readonly controls = this.form.controls;
  private readonly values = toSignal(this.form.valueChanges, {
    initialValue: this.form.getRawValue(),
  });
  readonly cities = DEMO_LOCATIONS.map((location) => location.city);
  private readonly selectedCity = computed(() =>
    DEMO_LOCATIONS.find((location) => location.city === this.values().city),
  );
  readonly campuses = computed(
    () => this.selectedCity()?.campuses.map((campus) => campus.name) ?? [],
  );
  private readonly selectedCampus = computed(() =>
    this.selectedCity()?.campuses.find(
      (campus) => campus.name === this.values().campus,
    ),
  );
  readonly buildings = computed(
    () =>
      this.selectedCampus()?.buildings.map((building) => building.name) ?? [],
  );
  readonly floors = computed(
    () =>
      this.selectedCampus()?.buildings.find(
        (building) => building.name === this.values().building,
      )?.floors ?? [],
  );
  readonly periods = ['AM', 'PM'];
  readonly times = Array.from({ length: 24 }, (_, index) => {
    const hour = Math.floor(index / 2) || 12;
    return `${String(hour).padStart(2, '0')} : ${index % 2 ? '30' : '00'}`;
  });
  readonly timeError = computed(() => {
    const { startTime, startPeriod, endTime, endPeriod } = this.values();
    if (!startTime || !endTime) return '';
    return this.minutes(endTime, endPeriod) <=
      this.minutes(startTime, startPeriod)
      ? 'La hora fin debe ser posterior a la hora inicio.'
      : '';
  });

  constructor() {
    this.controls.city.valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed())
      .subscribe(() => {
        this.controls.campus.reset('');
        this.controls.building.reset('');
        this.controls.floor.reset('');
      });
    this.controls.campus.valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed())
      .subscribe(() => {
        this.controls.building.reset('');
        this.controls.floor.reset('');
      });
    this.controls.building.valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed())
      .subscribe(() => this.controls.floor.reset(''));
  }

  private minutes(time: string, period: string | undefined): number {
    const [hour, minute] = time.split(':').map(Number);
    return (hour % 12) * 60 + minute + (period === 'PM' ? 720 : 0);
  }
}
