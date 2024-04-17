import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbCalendarTemplateMonthComponent } from './bmb-calendar-template-month.component';

describe('BmbCalendarTemplateMonthComponent', () => {
  let component: BmbCalendarTemplateMonthComponent;
  let fixture: ComponentFixture<BmbCalendarTemplateMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCalendarTemplateMonthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BmbCalendarTemplateMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
