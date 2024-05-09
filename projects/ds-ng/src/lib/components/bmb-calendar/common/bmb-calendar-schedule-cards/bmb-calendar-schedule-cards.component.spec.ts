import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbCalendarScheduleCardsComponent } from './bmb-calendar-schedule-cards.component';

describe('BmbCalendarScheduleCardsComponent', () => {
  let component: BmbCalendarScheduleCardsComponent;
  let fixture: ComponentFixture<BmbCalendarScheduleCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCalendarScheduleCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbCalendarScheduleCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
