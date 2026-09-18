import { TestBed } from '@angular/core/testing';
import { ItemChevronPage } from './item-chevron-page';

describe('ItemChevronPage', () => {
  const originalFetch = globalThis.fetch;
  beforeEach(() => {
    globalThis.fetch = jest
      .fn()
      .mockResolvedValue({
        ok: true,
        json: async () => ({}),
        text: async () => '<svg></svg>',
      });
  });
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });
  it('connects controls to the preview and records real clicks', async () => {
    await TestBed.configureTestingModule({
      imports: [ItemChevronPage],
    }).compileComponents();
    const fixture = TestBed.createComponent(ItemChevronPage);
    fixture.detectChanges();
    await fixture.whenStable();
    const title: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    title.value = 'Updated';
    title.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('bmb-title').textContent,
    ).toContain('Updated');
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('[aria-live]').textContent,
    ).toContain('click: click');
    const checkbox: HTMLInputElement =
      fixture.nativeElement.querySelector('[type=checkbox]');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(button.disabled).toBe(true);
    fixture.componentInstance.lastEvent.set('Sin interacción');
    button.click();
    expect(fixture.componentInstance.lastEvent()).toBe('Sin interacción');
  });
});
