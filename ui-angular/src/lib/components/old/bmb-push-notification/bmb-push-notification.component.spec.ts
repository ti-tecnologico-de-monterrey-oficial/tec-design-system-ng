import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbPushNotificationComponent } from './bmb-push-notification.component';

describe('BmbPushNotificationComponent', () => {
  let component: BmbPushNotificationComponent;
  let fixture: ComponentFixture<BmbPushNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbPushNotificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbPushNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
