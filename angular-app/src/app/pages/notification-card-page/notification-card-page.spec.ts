import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationCardPage } from './notification-card-page';

describe('NotificationCardPage', () => {
  let component: NotificationCardPage;
  let fixture: ComponentFixture<NotificationCardPage>;

  beforeEach(async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
      text: async () => '<svg viewBox="0 0 24 24"></svg>',
    } as Response);
    Object.defineProperty(globalThis, 'ResizeObserver', {
      configurable: true,
      value: class {
        observe(): void {}
        unobserve(): void {}
        disconnect(): void {}
      },
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      value: jest.fn(),
    });

    await TestBed.configureTestingModule({
      imports: [NotificationCardPage],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationCardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose notifications and advertisements', () => {
    expect(component.notifications()).toHaveLength(2);
    expect(component.advertisements()).toHaveLength(1);
    expect(component.selectedAlert().pDate.isValid).toBe(true);
  });

  it('should toggle the empty state without mutating source data', () => {
    component.useEmptyState.set(true);

    expect(component.visibleNotifications()).toEqual([]);
    expect(component.notifications()).toHaveLength(2);
  });

  it('should record component events', () => {
    component.recordAlert('alertEvent', component.notifications()[0]);
    expect(component.lastEvent()).toContain('Actualización académica');

    component.recordExpand();
    expect(component.lastEvent()).toBe('onExpandClick');
  });
});
