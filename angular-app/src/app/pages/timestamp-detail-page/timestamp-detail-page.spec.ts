import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimestampDetailPage } from './timestamp-detail-page';

describe('TimestampDetailPage', () => {
  let component: TimestampDetailPage;
  let fixture: ComponentFixture<TimestampDetailPage>;

  beforeEach(async () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    await TestBed.configureTestingModule({
      imports: [TimestampDetailPage],
    }).compileComponents();
    fixture = TestBed.createComponent(TimestampDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should build a parsed event', () =>
    expect(component.orderedEvents()[0].events[0].title).toBe(
      'Inicio de inscripciones',
    ));

  it('should expose the selected date and current date values', () => {
    expect(component.languages).toEqual(['es', 'en']);
    expect(component.nowDate().toISODate()).toBe('2026-09-07');
    expect(component.selectedDate()).toMatchObject({
      day: '07',
      month: '09',
    });
  });

  it('should rebuild the event when the demo controls change', () => {
    component.selectedDateValue.set('2026-10-12');
    component.eventTitle.set('Updated event');
    component.shortDescription.set('Updated description');
    component.selected.set(false);

    expect(component.orderedEvents()[0]).toMatchObject({
      selected: false,
      title: 'Updated event',
      date: expect.objectContaining({ year: 2026, month: 10, day: 12 }),
    });
    expect(component.orderedEvents()[0].events[0].short_description).toBe(
      'Updated description',
    );
  });

  it('should record the selected event', () => {
    component.recordEvent(component.orderedEvents()[0].events[0]);
    expect(component.lastEvent()).toBe('changeSelectedEvent: 1');
  });
});
