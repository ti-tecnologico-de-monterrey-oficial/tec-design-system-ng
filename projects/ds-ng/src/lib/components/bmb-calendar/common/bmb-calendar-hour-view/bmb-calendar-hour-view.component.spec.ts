import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbCalendarHourViewComponent } from './bmb-calendar-hour-view.component';

describe('BmbCalendarHourViewComponent', () => {
  let component: BmbCalendarHourViewComponent;
  let fixture: ComponentFixture<BmbCalendarHourViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCalendarHourViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbCalendarHourViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
