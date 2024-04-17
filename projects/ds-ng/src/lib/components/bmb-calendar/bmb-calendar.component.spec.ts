import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbCalendarComponent } from './bmb-calendar.component';

describe('BmbCalendarComponent', () => {
  let component: BmbCalendarComponent;
  let fixture: ComponentFixture<BmbCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BmbCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
