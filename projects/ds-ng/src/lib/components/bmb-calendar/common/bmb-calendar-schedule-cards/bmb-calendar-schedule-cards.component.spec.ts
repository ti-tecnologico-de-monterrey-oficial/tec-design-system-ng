import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbCalendarScheduleCardsComponent } from './bmb-calendar-schedule-cards.component';
import { ComponentRef } from '@angular/core';
import { DateTime } from 'luxon';
import { BmbNativeModalService } from '../../../../services/modal/native-modal.service';
import { BmbCalendarComponentService } from '../../bmb-calendar.service';
import { IBmbCalendarEvent } from '../../types';

describe('BmbCalendarScheduleCardsComponent', () => {
  let component: BmbCalendarScheduleCardsComponent;
  let fixture: ComponentFixture<BmbCalendarScheduleCardsComponent>;
  let componentRef: ComponentRef<BmbCalendarScheduleCardsComponent>;
  let modalService: jasmine.SpyObj<BmbNativeModalService>;

  const createEvent = (
    overrides: Partial<IBmbCalendarEvent> = {},
  ): IBmbCalendarEvent => ({
    title: 'Event custom',
    start: '2025-08-26T13:00:00-06:00',
    end: '2025-08-26T13:30:00-06:00',
    detail: 'Event custom detail',
    modalTitle: 'Event custom',
    subtitle: 'Event custom subtitle',
    type: 'academic',
    status: 'active',
    place: 'Event custom place',
    calendar: 'Calendar A',
    isVisible: true,
    startDate: DateTime.fromISO('2025-08-26T13:00:00-06:00'),
    endDate: DateTime.fromISO('2025-08-26T13:30:00-06:00'),
    column: 1,
    columnCount: 2,
    bulletColor: 'success-primary',
    ...overrides,
  });

  beforeEach(async () => {
    modalService = jasmine.createSpyObj<BmbNativeModalService>(
      'BmbNativeModalService',
      ['openModal'],
    );

    await TestBed.configureTestingModule({
      imports: [BmbCalendarScheduleCardsComponent],
      providers: [
        {
          provide: BmbNativeModalService,
          useValue: modalService,
        },
        BmbCalendarComponentService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbCalendarScheduleCardsComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('event', createEvent());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate absolute position for event card', () => {
    const position = component.getPosition() as Record<string, string>;

    expect(position['top']).toBe('1560px');
    expect(position['height']).toBe('60px');
    expect(position['left']).toContain('51%');
    expect(position['width']).toContain('50%');
  });

  it('should return empty position when absolute layout is disabled', () => {
    componentRef.setInput('isPositionAbsolute', false);
    fixture.detectChanges();

    expect(component.getPosition()).toEqual({});
  });

  it('should include active and reduced classes for a current short event', () => {
    const now = DateTime.now();
    componentRef.setInput(
      'event',
      createEvent({
        startDate: now.minus({ minutes: 10 }),
        endDate: now.plus({ minutes: 20 }),
      }),
    );
    fixture.detectChanges();

    const classNames = component.getClassNames();

    expect(classNames).toContain('bmb_calendar-event-type-academic');
    expect(classNames).toContain('bmb_calendar-event-absolute');
    expect(classNames).toContain('bmb_calendar-event-grid-reduced');
    expect(classNames).toContain('bmb_calendar-event-active');
  });

  it('should include disabled and full classes for a long disabled event', () => {
    componentRef.setInput(
      'event',
      createEvent({
        status: 'disabled',
        startDate: DateTime.fromISO('2025-08-26T08:00:00-06:00'),
        endDate: DateTime.fromISO('2025-08-26T10:00:00-06:00'),
        start: '2025-08-26T08:00:00-06:00',
        end: '2025-08-26T10:00:00-06:00',
      }),
    );
    fixture.detectChanges();

    const classNames = component.getClassNames();

    expect(classNames).toContain('bmb_calendar-event-disabled');
    expect(classNames).toContain('bmb_calendar-event-grid-full');
    expect(classNames).not.toContain('bmb_calendar-event-active');
  });

  it('should return duration using event dates', () => {
    expect(component.getDuration()).toBe('01:00 PM - 01:30 PM');
  });

  it('should return microprogram duration when a micro event is selected', () => {
    component.selectedMicroProgram.set({
      title: 'Micro event',
      code: 'MIC-100',
      module: 'M1',
      startDate: '2025-08-26T14:00:00-06:00',
      endDate: '2025-08-26T14:30:00-06:00',
    });

    expect(component.getDuration(true)).toBe('02:00 PM - 02:30 PM');
  });

  it('should calculate microprogram position relative to parent event', () => {
    const microPosition = component.getMicroPosition({
      title: 'Micro event',
      code: 'MIC-100',
      module: 'M1',
      startDate: '2025-08-26T13:15:00-06:00',
      endDate: '2025-08-26T13:45:00-06:00',
    }) as Record<string, string>;

    expect(microPosition['top']).toBe('30px');
    expect(microPosition['height']).toBe('60px');
  });

  it('should open event modal with cancelled prefix for disabled events', () => {
    componentRef.setInput(
      'event',
      createEvent({
        status: 'disabled',
        modalTitle: 'Evento principal',
      }),
    );
    fixture.detectChanges();

    component.handleSelectEvent();

    expect(modalService.openModal).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: '(Cancelado) Evento principal',
        subtitle: 'Event custom subtitle',
        size: 'small',
      }),
    );
  });

  it('should set selected microprogram and open modal', () => {
    const microEvent = {
      title: 'Micro event',
      code: 'MIC-101',
      module: 'M2',
      startDate: '2025-08-26T13:15:00-06:00',
      endDate: '2025-08-26T13:45:00-06:00',
    };

    component.handleSelectMicroEvent(microEvent);

    expect(component.selectedMicroProgram()).toEqual(microEvent);
    expect(modalService.openModal).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'MIC-101 - Micro event - M2',
        size: 'small',
      }),
    );
  });

  it('should render microprogram cards when microProgram is provided', () => {
    componentRef.setInput(
      'event',
      createEvent({
        microProgram: [
          {
            title: 'Micro event',
            code: 'MIC-200',
            module: 'M3',
            startDate: '2025-08-26T13:00:00-06:00',
            endDate: '2025-08-26T13:30:00-06:00',
          },
        ],
      }),
    );
    fixture.detectChanges();

    const microCards = fixture.nativeElement.querySelectorAll(
      '.bmb_calendar-event-microprogram-item',
    );

    expect(microCards.length).toBe(1);
  });

  it('should render regular event title when microProgram is not provided', () => {
    const titleElement: HTMLElement | null =
      fixture.nativeElement.querySelector('.bmb_calendar-event-title');

    expect(titleElement?.textContent?.trim()).toBe('Event custom');
  });

  it('should parse formatted dates when date format is not iso', () => {
    const calendarService = TestBed.inject(BmbCalendarComponentService);
    calendarService.setDateFormat('dd/MM/yyyy HH:mm');
    componentRef.setInput(
      'event',
      createEvent({
        start: '26/08/2025 13:00',
        end: '26/08/2025 13:30',
      }),
    );
    fixture.detectChanges();

    expect(component.getDuration()).toBe('01:00 PM - 01:30 PM');
  });
});
