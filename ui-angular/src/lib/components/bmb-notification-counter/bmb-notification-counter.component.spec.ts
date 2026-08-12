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

  it('should cap notification counters at 99+', () => {
    fixture.componentRef.setInput('counter', 125);
    fixture.detectChanges();

    const counter: HTMLElement = fixture.nativeElement.querySelector(
      '.bmb_notification-counter-number',
    );
    expect(counter.textContent).toContain('99+');
    expect(counter.classList).toContain('bmb_notification-counter-bullet');
  });

  it('should render the plain appearance', () => {
    fixture.componentRef.setInput('counter', 7);
    fixture.componentRef.setInput('appearance', 'plain');
    fixture.detectChanges();

    const counter: HTMLElement = fixture.nativeElement.querySelector(
      '.bmb_notification-counter-number',
    );
    expect(counter.textContent).toContain('(7)');
    expect(counter.classList).toContain('bmb_notification-counter-plain');
  });
});
