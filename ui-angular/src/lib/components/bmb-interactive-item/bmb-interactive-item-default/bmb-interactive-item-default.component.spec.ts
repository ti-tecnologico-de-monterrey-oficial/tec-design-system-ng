import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbInteractiveItemDefaultComponent } from './bmb-interactive-item-default.component';

describe('BmbInteractiveItemDefaultComponent', () => {
  const originalFetch = globalThis.fetch;
  beforeEach(() => {
    globalThis.fetch = jest
      .fn()
      .mockResolvedValue({
        ok: true,
        json: async () => ({
          interactive_item_default: { active: 'Activo', inactive: 'Inactivo' },
        }),
        text: async () => '<svg></svg>',
      });
  });
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [BmbInteractiveItemDefaultComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(BmbInteractiveItemDefaultComponent);
    fixture.componentRef.setInput('itemTitle', 'Title');
    fixture.componentRef.setInput('icon', 'person');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  }
  it('preserves initial values and required content', async () => {
    const fixture = await setup();
    expect(fixture.componentInstance.isActive()).toBe(false);
    expect(fixture.nativeElement.textContent).toContain('Title');
    expect(fixture.nativeElement.textContent).toContain('Inactivo');
  });
  it.each([true, false, undefined])(
    'renders isActive=%s and emits the original click',
    async (isActive) => {
      const fixture = await setup();
      fixture.componentRef.setInput('isActive', isActive);
      fixture.detectChanges();
      const icons = fixture.debugElement.queryAll(
        By.directive(BmbIconComponent),
      );
      expect(icons[1].componentInstance.icon()).toBe(
        isActive ? 'check' : 'chevron_right',
      );
      expect(fixture.nativeElement.textContent).toContain(
        isActive ? 'Activo' : 'Inactivo',
      );
      expect(
        fixture.nativeElement
          .querySelector('bmb-title')
          .classList.contains('active'),
      ).toBe(!!isActive);
      const emitted = jest.fn();
      fixture.componentInstance.getActionClick.subscribe(emitted);
      const event = new MouseEvent('click');
      fixture.nativeElement.querySelector('button').dispatchEvent(event);
      expect(emitted).toHaveBeenCalledWith(event);
      expect(emitted).toHaveBeenCalledTimes(1);
    },
  );
});
