import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbFullTextDirective } from './bmb-full-text.directive';

const FULL_TEXT_FIXTURE =
  'A complete label that extends beyond the rendered container';
const UPDATED_FULL_TEXT_FIXTURE = 'Updated full-text fixture value';

@Component({
  imports: [BmbFullTextDirective],
  template: `
    <div>
      <button
        [bmbFullText]="text()"
        [bmbFullTextEnabled]="enabled()"
        bmbFullTextTarget=".label"
        (click)="clicks = clicks + 1"
      >
        <span class="label">{{ text() }}</span>
      </button>
    </div>
  `,
})
class HostComponent {
  text = signal(FULL_TEXT_FIXTURE);
  enabled = signal(true);
  clicks = 0;
  parentClicks = 0;
}

describe('BmbFullTextDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let button: HTMLButtonElement;
  let label: HTMLElement;
  const tooltip = () => document.querySelector('.bmb_tooltip-dialog--manual');

  function pointer(
    type: string,
    target: EventTarget = button,
    values = {},
  ): void {
    const event = new Event(type, { bubbles: true, cancelable: true });
    Object.assign(event, {
      pointerId: 1,
      pointerType: 'touch',
      button: 0,
      isPrimary: true,
      clientX: 0,
      clientY: 0,
      ...values,
    });
    target.dispatchEvent(event);
  }

  function click(detail = 1): MouseEvent {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      detail,
    });
    button.dispatchEvent(event);
    return event;
  }

  beforeEach(() => {
    jest.useFakeTimers();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
    button.parentElement?.addEventListener('click', () => {
      fixture.componentInstance.parentClicks++;
    });
    label = button.querySelector('.label') as HTMLElement;
    Object.defineProperties(label, {
      clientWidth: { configurable: true, value: 100 },
      scrollWidth: { configurable: true, value: 300 },
    });
  });

  afterEach(() => {
    fixture.destroy();
    jest.clearAllTimers();
    jest.useRealTimers();
    expect(tooltip()).toBeNull();
  });

  it('preserves a brief tap and its bubbling click', () => {
    pointer('pointerdown');
    jest.advanceTimersByTime(499);
    pointer('pointerup');
    expect(click().defaultPrevented).toBe(false);
    expect(fixture.componentInstance.clicks).toBe(1);
    expect(fixture.componentInstance.parentClicks).toBe(1);
    expect(tooltip()).toBeNull();
  });

  it('reveals the full label after 500 ms and consumes only that gesture click', () => {
    pointer('pointerdown');
    jest.advanceTimersByTime(500);
    expect(tooltip()?.textContent).toBe(fixture.componentInstance.text());
    pointer('pointerup');
    // Touch pointerleave after release must not immediately close the tooltip.
    pointer('pointerleave');
    expect(click().defaultPrevented).toBe(true);
    expect(fixture.componentInstance.clicks).toBe(0);
    expect(fixture.componentInstance.parentClicks).toBe(0);
    jest.advanceTimersByTime(200);
    expect(tooltip()).not.toBeNull();
    pointer('pointerdown');
    pointer('pointerup');
    expect(click().defaultPrevented).toBe(false);
    expect(fixture.componentInstance.clicks).toBe(1);
  });

  it('does nothing when disabled or when the text fits', () => {
    fixture.componentInstance.enabled.set(false);
    fixture.detectChanges();
    pointer('pointerdown');
    jest.advanceTimersByTime(600);
    pointer('pointerup');
    expect(click().defaultPrevented).toBe(false);
    expect(tooltip()).toBeNull();
    fixture.componentInstance.enabled.set(true);
    fixture.detectChanges();
    Object.defineProperty(label, 'scrollWidth', { value: 100 });
    pointer('pointerdown');
    jest.advanceTimersByTime(600);
    pointer('pointerup');
    expect(click().defaultPrevented).toBe(false);
    expect(tooltip()).toBeNull();
  });

  it.each([
    ['secondary button', { button: 1 }],
    ['non-primary pointer', { isPrimary: false }],
  ])('ignores a %s press', (_description, pointerValues) => {
    pointer('pointerdown', button, pointerValues);
    jest.advanceTimersByTime(600);
    expect(tooltip()).toBeNull();
  });

  it('prevents the context menu during an eligible long press', () => {
    pointer('pointerdown');
    const event = new Event('contextmenu', {
      bubbles: true,
      cancelable: true,
    });

    button.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    pointer('pointerup');
  });

  it('keeps the press active for movement within the drag threshold', () => {
    pointer('pointerdown');
    pointer('pointermove', document, { clientX: 10 });
    jest.advanceTimersByTime(500);
    expect(tooltip()).not.toBeNull();
    pointer('pointerup');
  });

  it('ignores move and release events from a different pointer', () => {
    pointer('pointerdown');
    pointer('pointermove', document, { pointerId: 2, clientX: 30 });
    pointer('pointerup', document, { pointerId: 2 });
    jest.advanceTimersByTime(500);

    expect(tooltip()).not.toBeNull();
    pointer('pointerup');
  });

  it.each(['pointercancel', 'scroll', 'pointermove'])(
    'cancels the press on %s',
    (type) => {
      pointer('pointerdown');
      jest.advanceTimersByTime(250);
      pointer(type, document, { clientX: 20 });
      jest.advanceTimersByTime(500);
      expect(tooltip()).toBeNull();
      expect(click().defaultPrevented).toBe(false);
    },
  );

  it('cancels when a pressed mouse leaves the host', () => {
    pointer('pointerdown', button, { pointerType: 'mouse' });
    pointer('pointerleave', button, { pointerType: 'mouse' });
    jest.advanceTimersByTime(600);
    expect(tooltip()).toBeNull();
  });

  it('supports hover, moving onto the tooltip, and Escape', () => {
    pointer('pointerenter', button, { pointerType: 'mouse' });
    expect(tooltip()).not.toBeNull();
    pointer('pointerleave', button, { pointerType: 'mouse' });
    pointer('pointerenter', tooltip() as Element, { pointerType: 'mouse' });
    jest.advanceTimersByTime(200);
    expect(tooltip()).not.toBeNull();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(tooltip()).toBeNull();
  });

  it('hides after the pointer leaves the tooltip', () => {
    pointer('pointerenter', button, { pointerType: 'mouse' });
    const openTooltip = tooltip() as HTMLElement;

    pointer('pointerleave', openTooltip, { pointerType: 'mouse' });
    jest.advanceTimersByTime(149);
    expect(tooltip()).not.toBeNull();
    jest.advanceTimersByTime(1);
    expect(tooltip()).toBeNull();
  });

  it('uses and disposes BmbTooltipBase without keeping empty component hosts', () => {
    for (let i = 0; i < 3; i++) {
      pointer('pointerenter', button, { pointerType: 'mouse' });
      const host = fixture.nativeElement.querySelector('bmb-tooltip-base');
      expect(host).not.toBeNull();
      expect(host.style.display).toBe('none');
      expect(tooltip()?.tagName).toBe('DIALOG');
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      expect(tooltip()).toBeNull();
      expect(
        fixture.nativeElement.querySelector('bmb-tooltip-base'),
      ).toBeNull();
    }
  });

  it('supports visible keyboard focus without consuming keyboard activation', () => {
    jest.spyOn(button, 'matches').mockReturnValue(true);
    button.dispatchEvent(new FocusEvent('focusin'));
    expect(tooltip()).not.toBeNull();
    pointer('pointerdown');
    jest.advanceTimersByTime(500);
    pointer('pointerup');
    expect(click(0).defaultPrevented).toBe(false);
    expect(fixture.componentInstance.clicks).toBe(1);
    expect(button.textContent?.trim()).toBe(fixture.componentInstance.text());
  });

  it('does not open for focus that is not keyboard-visible', () => {
    jest.spyOn(button, 'matches').mockReturnValue(false);
    button.dispatchEvent(new FocusEvent('focusin'));

    expect(tooltip()).toBeNull();
  });

  it.each(['resize', 'blur', 'scroll', 'pointerdown'])(
    'dismisses an open tooltip on outside %s',
    (type) => {
      pointer('pointerdown');
      jest.advanceTimersByTime(500);
      pointer('pointerup');
      const target = type === 'resize' || type === 'blur' ? window : document;
      target.dispatchEvent(new Event(type));
      expect(tooltip()).toBeNull();
    },
  );

  it('dismisses when disabled or its text changes', () => {
    pointer('pointerenter', button, { pointerType: 'mouse' });
    fixture.componentInstance.text.set(UPDATED_FULL_TEXT_FIXTURE);
    fixture.detectChanges();
    expect(tooltip()).toBeNull();
    pointer('pointerenter', button, { pointerType: 'mouse' });
    fixture.componentInstance.enabled.set(false);
    fixture.detectChanges();
    expect(tooltip()).toBeNull();
  });

  it('removes the tooltip and pending gesture listeners on destroy', () => {
    pointer('pointerdown');
    jest.advanceTimersByTime(500);
    fixture.destroy();
    expect(tooltip()).toBeNull();
    jest.advanceTimersByTime(1000);
    expect(click().defaultPrevented).toBe(false);
  });

  describe('placement beside the truncated text', () => {
    function rect(
      left: number,
      top: number,
      width: number,
      height: number,
    ): DOMRect {
      return {
        left,
        top,
        width,
        height,
        right: left + width,
        bottom: top + height,
        x: left,
        y: top,
        toJSON: () => ({}),
      };
    }

    beforeEach(() => {
      jest
        .spyOn(HTMLDialogElement.prototype, 'getBoundingClientRect')
        .mockReturnValue(rect(0, 0, 200, 40));
    });

    afterEach(() => jest.restoreAllMocks());

    it('centers above the label with a 4px gap, independently of the wider button', () => {
      jest
        .spyOn(button, 'getBoundingClientRect')
        .mockReturnValue(rect(100, 190, 500, 40));
      jest
        .spyOn(label, 'getBoundingClientRect')
        .mockReturnValue(rect(300, 200, 100, 20));
      pointer('pointerenter', button, { pointerType: 'mouse' });
      expect((tooltip() as HTMLElement).style.left).toBe('250px');
      expect((tooltip() as HTMLElement).style.top).toBe('156px');
      // Later base repositioning must preserve the directive's placement.
      tooltip()?.dispatchEvent(new Event('scroll'));
      fixture.detectChanges();
      expect((tooltip() as HTMLElement).style.left).toBe('250px');
      expect((tooltip() as HTMLElement).style.top).toBe('156px');
    });

    it('places below the label when there is no space above', () => {
      jest
        .spyOn(label, 'getBoundingClientRect')
        .mockReturnValue(rect(300, 10, 100, 20));
      pointer('pointerenter', button, { pointerType: 'mouse' });
      expect((tooltip() as HTMLElement).style.top).toBe('34px');
    });

    it.each([
      [0, 8],
      [1000, 816],
    ])(
      'keeps the tooltip inside the horizontal viewport for a label at %s',
      (left, expected) => {
        jest.replaceProperty(window, 'innerWidth', 1024);
        jest
          .spyOn(label, 'getBoundingClientRect')
          .mockReturnValue(rect(left, 200, 100, 20));
        pointer('pointerenter', button, { pointerType: 'mouse' });
        expect((tooltip() as HTMLElement).style.left).toBe(`${expected}px`);
      },
    );

    it('uses the host as the anchor if the specified target does not exist', () => {
      label.remove();
      Object.defineProperties(button, {
        clientWidth: { value: 100 },
        scrollWidth: { value: 300 },
      });
      jest
        .spyOn(button, 'getBoundingClientRect')
        .mockReturnValue(rect(300, 200, 100, 20));
      pointer('pointerenter', button, { pointerType: 'mouse' });
      expect((tooltip() as HTMLElement).style.left).toBe('250px');
      expect((tooltip() as HTMLElement).style.top).toBe('156px');
    });
  });
});
