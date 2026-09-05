import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PushNotificationPage } from './push-notification-page';

describe('PushNotificationPage', () => {
  let component: PushNotificationPage;
  let fixture: ComponentFixture<PushNotificationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PushNotificationPage],
    }).compileComponents();
    fixture = TestBed.createComponent(PushNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should expose common notification types', () =>
    expect(component.types).toContain('success'));
  it('should update a valid delay', () => {
    component.setDelay('8000');
    expect(component.delay()).toBe(8000);
  });
});
