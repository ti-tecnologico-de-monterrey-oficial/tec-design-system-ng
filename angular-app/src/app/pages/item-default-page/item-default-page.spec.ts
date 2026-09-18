import { TestBed } from '@angular/core/testing';
import { ItemDefaultPage } from './item-default-page';

describe('ItemDefaultPage', () => {
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
      imports: [ItemDefaultPage],
    }).compileComponents();
    const fixture = TestBed.createComponent(ItemDefaultPage);
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
    const select: HTMLSelectElement =
      fixture.nativeElement.querySelector('select');
    for (const value of ['true', 'false', 'undefined']) {
      select.value = value;
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      expect(fixture.componentInstance.isActive()).toBe(
        value === 'undefined' ? undefined : value === 'true',
      );
      expect(
        fixture.nativeElement
          .querySelector('bmb-title')
          .classList.contains('active'),
      ).toBe(value === 'true');
    }
  });
});
