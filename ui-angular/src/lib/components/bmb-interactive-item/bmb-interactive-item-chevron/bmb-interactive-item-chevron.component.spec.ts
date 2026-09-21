import { TestBed } from '@angular/core/testing';
import { BmbInteractiveItemChevronComponent } from './bmb-interactive-item-chevron.component';

describe('BmbInteractiveItemChevronComponent', () => {
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
      imports: [BmbInteractiveItemChevronComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(BmbInteractiveItemChevronComponent);
    fixture.componentRef.setInput('itemTitle', 'Title');
    fixture.componentRef.setInput('itemSubtitle', 'Subtitle');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  }
  it('preserves initial values and required content', async () => {
    const fixture = await setup();
    expect(fixture.componentInstance.isDisabled()).toBe(false);
    expect(fixture.nativeElement.textContent).toContain('Title');
    expect(fixture.nativeElement.textContent).toContain('Subtitle');
    expect(
      fixture.nativeElement
        .querySelector('button')
        .classList.contains('bmb_interactive-item-default'),
    ).toBe(true);
  });
  it('emits clicks only while the native button is enabled', async () => {
    const fixture = await setup();
    const emitted = jest.fn();
    fixture.componentInstance.getActionClick.subscribe(emitted);
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    button.click();
    expect(emitted).toHaveBeenCalledTimes(1);
    expect(emitted.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
    fixture.componentRef.setInput('isDisabled', true);
    fixture.detectChanges();
    expect(button.disabled).toBe(true);
    button.click();
    expect(emitted).toHaveBeenCalledTimes(1);
    fixture.componentRef.setInput('isDisabled', false);
    fixture.detectChanges();
    button.click();
    expect(emitted).toHaveBeenCalledTimes(2);
  });
});
