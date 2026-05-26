import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbCalendarTemplateDayComponent } from './bmb-calendar-template-day.component';

describe('BmbCalendarTemplateDayComponent', () => {
  let component: BmbCalendarTemplateDayComponent;
  let fixture: ComponentFixture<BmbCalendarTemplateDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCalendarTemplateDayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbCalendarTemplateDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
