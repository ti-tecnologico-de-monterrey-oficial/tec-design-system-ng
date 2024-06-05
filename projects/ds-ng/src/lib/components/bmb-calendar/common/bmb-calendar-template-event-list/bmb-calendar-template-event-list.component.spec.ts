import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbCalendarTemplateEventListComponent } from './bmb-calendar-template-event-list.component';

describe('BmbCalendarTemplateEventListComponent', () => {
  let component: BmbCalendarTemplateEventListComponent;
  let fixture: ComponentFixture<BmbCalendarTemplateEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCalendarTemplateEventListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbCalendarTemplateEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
