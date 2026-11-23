import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomReservation } from './room-reservation';
import { BmbIconService, BmbTranslationsService } from 'ui-angular';

describe('RoomReservation', () => {
  let component: RoomReservation;
  let fixture: ComponentFixture<RoomReservation>;

  beforeEach(async () => {
    jest
      .spyOn(BmbTranslationsService.prototype, 'loadDictionaryFromAssets')
      .mockResolvedValue(true);
    jest
      .spyOn(BmbIconService.prototype, 'loadIconSvg')
      .mockResolvedValue('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
    await TestBed.configureTestingModule({
      imports: [RoomReservation],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomReservation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => jest.restoreAllMocks());

  it('renders the form inside the Bamboo card with its calendar and progress', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('h1')?.textContent).toContain(
      'Selecciona el espacio que buscas',
    );
    expect(element.querySelectorAll('select')).toHaveLength(8);
    expect(element.querySelector('bmb-home-card')).not.toBeNull();
    expect(element.querySelector('bmb-datepicker')).not.toBeNull();
    expect(
      element.querySelector('#reservation-time-error')?.textContent?.trim(),
    ).toBe('');
  });

  it('clears downstream selections when the city changes', async () => {
    component.form.patchValue({
      city: 'Monterrey',
      campus: 'Campus Monterrey',
      building: 'Rectoría',
      floor: 'Piso 1',
    });
    await fixture.whenStable();
    expect(component.floors()).toContain('Piso 1');

    component.controls.city.setValue('Ciudad de México');
    await fixture.whenStable();

    expect(component.controls.campus.value).toBe('');
    expect(component.controls.building.value).toBe('');
    expect(component.controls.floor.value).toBe('');
    expect(component.campuses()).toEqual(['Campus Ciudad de México']);
  });

  it('clears building and floor when the campus changes', () => {
    component.form.patchValue({
      city: 'Monterrey',
      campus: 'Campus Monterrey',
      building: 'Rectoría',
      floor: 'Piso 2',
    });
    component.controls.campus.setValue('');
    expect(component.controls.building.value).toBe('');
    expect(component.controls.floor.value).toBe('');
  });

  it('validates time order across noon and midnight', () => {
    component.form.patchValue({
      startTime: '11 : 30',
      startPeriod: 'AM',
      endTime: '12 : 00',
      endPeriod: 'PM',
    });
    expect(component.timeError()).toBe('');

    component.controls.endPeriod.setValue('AM');
    expect(component.timeError()).toContain('posterior');

    component.form.patchValue({
      startTime: '12 : 00',
      startPeriod: 'AM',
      endTime: '12 : 30',
      endPeriod: 'AM',
    });
    expect(component.timeError()).toBe('');
    component.controls.endTime.setValue('12 : 00');
    expect(component.timeError()).toContain('posterior');
    component.controls.endTime.setValue('');
    expect(component.timeError()).toBe('');
  });
});
