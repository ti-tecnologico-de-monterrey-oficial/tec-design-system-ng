import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  BmbSwipeDirective,
  BmbSwipeLeftActionsDirective,
  BmbSwipeRightActionsDirective,
} from './bmb-swipe.directive';
import type { IBmbSwipeSide } from './bmb-swipe.directive';

@Component({
  standalone: true,
  imports: [
    BmbSwipeDirective,
    BmbSwipeLeftActionsDirective,
    BmbSwipeRightActionsDirective,
  ],
  template: `
    <div
      id="swipe"
      bmbSwipe
      [swipeDisabled]="disabled()"
      [swipeThreshold]="threshold"
      (getSwipeOpenChange)="onOpenChange($event)"
    >
      <ng-template bmbSwipeLeftActions>
        <button id="left-action">Left action</button>
      </ng-template>
      <ng-template bmbSwipeRightActions>
        <button id="right-action">Right action</button>
      </ng-template>
      <div id="content">Content</div>
    </div>
  `,
})
class SwipeHostComponent {
  disabled = signal(false);
  threshold = 0.4;
  openChanges: (IBmbSwipeSide | null)[] = [];

  onOpenChange(side: IBmbSwipeSide | null): void {
    this.openChanges.push(side);
  }
}

describe('BmbSwipeDirective', () => {
  let fixture: ComponentFixture<SwipeHostComponent>;
  let host: SwipeHostComponent;
  let swipeElement: HTMLElement;
  let contentWrapper: HTMLElement;
  let leftActions: HTMLElement;
  let rightActions: HTMLElement;
  let directive: BmbSwipeDirective;

  const pointerEvent = (
    type: string,
    clientX: number,
    clientY: number,
    pointerType = 'touch',
  ): PointerEvent => {
    const event = new Event(type, { bubbles: true, cancelable: true });
    Object.defineProperties(event, {
      clientX: { value: clientX },
      clientY: { value: clientY },
      pointerType: { value: pointerType },
    });
    return event as PointerEvent;
  };

  const drag = (startX: number, startY: number, endX: number, endY: number) => {
    swipeElement.dispatchEvent(pointerEvent('pointerdown', startX, startY));
    document.dispatchEvent(pointerEvent('pointermove', endX, endY));
    document.dispatchEvent(pointerEvent('pointerup', endX, endY));
  };

  const setWidth = (element: HTMLElement, width: number): void => {
    jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      width,
    } as DOMRect);
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwipeHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwipeHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(
      By.directive(BmbSwipeDirective),
    );
    directive = debugElement.injector.get(BmbSwipeDirective);
    swipeElement = debugElement.nativeElement;
    contentWrapper = swipeElement.querySelector('.bmb_swipe-content')!;
    leftActions = swipeElement.querySelector('.bmb_swipe-actions-left')!;
    rightActions = swipeElement.querySelector('.bmb_swipe-actions-right')!;

    setWidth(leftActions, 100);
    setWidth(rightActions, 80);
  });

  it('creates the swipe structure and renders both action templates', () => {
    expect(swipeElement.classList.contains('bmb_swipe')).toBe(true);
    expect(contentWrapper.textContent).toContain('Content');
    expect(leftActions.querySelector('#left-action')).toBeTruthy();
    expect(rightActions.querySelector('#right-action')).toBeTruthy();
  });

  it('opens the left actions after a horizontal drag passes the threshold', () => {
    drag(0, 0, 50, 0);

    expect(contentWrapper.style.transform).toBe('translateX(100px)');
    expect(leftActions.classList.contains('visible')).toBe(true);
    expect(rightActions.classList.contains('visible')).toBe(false);
    expect(host.openChanges).toEqual(['left']);
  });

  it('opens the right actions after a horizontal drag passes the threshold', () => {
    drag(100, 0, 40, 0);

    expect(contentWrapper.style.transform).toBe('translateX(-80px)');
    expect(leftActions.classList.contains('visible')).toBe(false);
    expect(rightActions.classList.contains('visible')).toBe(true);
    expect(host.openChanges).toEqual(['right']);
  });

  it('snaps closed when the drag does not pass the threshold', () => {
    drag(0, 0, 30, 0);

    expect(contentWrapper.style.transform).toBe('translateX(0px)');
    expect(leftActions.classList.contains('visible')).toBe(false);
    expect(host.openChanges).toEqual([]);
  });

  it('does not open for vertical gestures or mouse pointer moves', () => {
    drag(0, 0, 2, 20);
    expect(host.openChanges).toEqual([]);

    swipeElement.dispatchEvent(pointerEvent('pointerdown', 0, 0));
    document.dispatchEvent(pointerEvent('pointermove', 50, 0, 'mouse'));
    document.dispatchEvent(pointerEvent('pointerup', 50, 0, 'mouse'));

    expect(contentWrapper.style.transform).toBe('translateX(0px)');
    expect(host.openChanges).toEqual([]);
  });

  it('does not respond to pointer input when disabled', () => {
    host.disabled.set(true);
    fixture.detectChanges();

    drag(0, 0, 60, 0);

    expect(directive.swipeDisabled()).toBe(true);
    expect(swipeElement.classList.contains('bmb_swipe-disabled')).toBe(true);
    expect(contentWrapper.style.transform).toBe('');
    expect(host.openChanges).toEqual([]);
  });

  it('closes after an action is clicked and emits the closed state', () => {
    drag(0, 0, 50, 0);
    leftActions.querySelector('button')!.click();

    expect(contentWrapper.style.transform).toBe('translateX(0px)');
    expect(leftActions.classList.contains('visible')).toBe(false);
    expect(host.openChanges).toEqual(['left', null]);
  });

  it('closes through the public close method', () => {
    drag(100, 0, 40, 0);
    directive.close();

    expect(contentWrapper.style.transform).toBe('translateX(0px)');
    expect(host.openChanges).toEqual(['right', null]);
  });

  it('removes active drag listeners when destroyed', () => {
    swipeElement.dispatchEvent(pointerEvent('pointerdown', 0, 0));
    fixture.destroy();
    document.dispatchEvent(pointerEvent('pointermove', 50, 0));
    document.dispatchEvent(pointerEvent('pointerup', 50, 0));

    expect(host.openChanges).toEqual([]);
  });
});
