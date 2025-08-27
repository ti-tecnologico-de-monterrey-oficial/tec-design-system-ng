import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbCalendarScheduleCardsComponent } from './bmb-calendar-schedule-cards.component';
import { ComponentRef } from '@angular/core';

describe('BmbCalendarScheduleCardsComponent', () => {
  let component: BmbCalendarScheduleCardsComponent;
  let fixture: ComponentFixture<BmbCalendarScheduleCardsComponent>;
  let componentRef: ComponentRef<BmbCalendarScheduleCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCalendarScheduleCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbCalendarScheduleCardsComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('event', {
      title: `Event custom`,
      start: '2025-08-26T13:00:00-06:00',
      end: '2025-08-26T13:30:00-06:00',
      detail: `Event custom detail`,
      modalTitle: `Event custom`,
      subtitle: `Event custom subtitle`,
      type: 'academic',
      place: `Event custom place`,
      calendar: 'Calendar A',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
