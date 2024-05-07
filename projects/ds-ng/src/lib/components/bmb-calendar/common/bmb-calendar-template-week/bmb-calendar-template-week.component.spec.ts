import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbCalendarTemplateWeekComponent } from './bmb-calendar-template-week.component';

describe('BmbCalendarTemplateWeekComponent', () => {
  let component: BmbCalendarTemplateWeekComponent;
  let fixture: ComponentFixture<BmbCalendarTemplateWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCalendarTemplateWeekComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbCalendarTemplateWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
