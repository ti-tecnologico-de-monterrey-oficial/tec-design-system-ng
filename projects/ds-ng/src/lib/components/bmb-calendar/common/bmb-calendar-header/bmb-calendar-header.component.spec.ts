import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbCalendarHeaderComponent } from './bmb-calendar-header.component';

describe('BmbCalendarHeaderComponent', () => {
  let component: BmbCalendarHeaderComponent;
  let fixture: ComponentFixture<BmbCalendarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCalendarHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbCalendarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
