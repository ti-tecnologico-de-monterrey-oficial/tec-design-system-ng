import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbCalendarTemplateEventComponent } from './bmb-calendar-template-event.component';

describe('BmbCalendarTemplateEventComponent', () => {
  let component: BmbCalendarTemplateEventComponent;
  let fixture: ComponentFixture<BmbCalendarTemplateEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCalendarTemplateEventComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbCalendarTemplateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
