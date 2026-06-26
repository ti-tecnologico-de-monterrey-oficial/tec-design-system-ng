import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbNotificationCounterComponent } from './bmb-notification-counter.component';

describe('BmbNotificationCounterComponent', () => {
  let component: BmbNotificationCounterComponent;
  let fixture: ComponentFixture<BmbNotificationCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbNotificationCounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbNotificationCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
