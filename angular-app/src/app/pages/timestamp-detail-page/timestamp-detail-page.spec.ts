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
  it('should record the selected event', () => {
    component.recordEvent(component.orderedEvents()[0].events[0]);
    expect(component.lastEvent()).toBe('changeSelectedEvent: 1');
  });
});
