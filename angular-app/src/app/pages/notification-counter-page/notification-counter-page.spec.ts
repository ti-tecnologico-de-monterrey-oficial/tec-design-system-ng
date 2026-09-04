import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationCounterPage } from './notification-counter-page';

describe('NotificationCounterPage', () => {
  let component: NotificationCounterPage;
  let fixture: ComponentFixture<NotificationCounterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationCounterPage],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationCounterPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update counter and appearance controls', () => {
    component.setCounter(120);
    component.setAppearance('plain');
    fixture.detectChanges();

    expect(component.counter()).toBe(120);
    expect(component.appearance()).toBe('plain');
    expect(fixture.nativeElement.textContent).toContain('(99+)');
  });
});
