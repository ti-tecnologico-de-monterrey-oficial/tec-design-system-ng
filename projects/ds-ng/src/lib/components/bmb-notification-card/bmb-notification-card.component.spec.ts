import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbNotificationCardComponent } from './bmb-notification-card.component';

describe('BmbNotificationCardComponent', () => {
  let component: BmbNotificationCardComponent;
  let fixture: ComponentFixture<BmbNotificationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbNotificationCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BmbNotificationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
