import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  BmbSwipeDirective,
  BmbSwipeLeftActionsDirective,
  BmbSwipeRightActionsDirective,
  IBmbSwipeSide,
} from './bmb-swipe.directive';

@Component({
  template: `
    <div
      bmbSwipe
      class="item"
      [bmbSwipeThreshold]="threshold"
      [bmbSwipeCloseOnAction]="closeOnAction"
      (bmbSwipeOpenChange)="onOpenChange($event)"
    >
      <ng-template bmbSwipeLeftActions>
        <button id="favorite" type="button">Favorite</button>
      </ng-template>
      <ng-template bmbSwipeRightActions>
        <button id="delete" type="button">Delete</button>
      </ng-template>
      <span id="content">Item content</span>
    </div>
  `,
  imports: [
    BmbSwipeDirective,
    BmbSwipeLeftActionsDirective,
    BmbSwipeRightActionsDirective,
  ],
})
class TestHostComponent {
  threshold = 0.4;
  disabled = false;
  closeOnAction = true;
  lastOpenSide: IBmbSwipeSide | null | undefined;

  onOpenChange(side: IBmbSwipeSide | null): void {
    this.lastOpenSide = side;
  }
}

function firePointer(
  target: EventTarget,
  type: string,
  clientX: number,
  clientY = 0,
): void {
  // jsdom doesn't implement PointerEvent, so a plain MouseEvent augmented
  // with the properties the directive reads is used instead.
  const event = new MouseEvent(type, {
    clientX,
    clientY,
    bubbles: true,
    cancelable: true,
  });
  target.dispatchEvent(event);
}

describe('BmbSwipeDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let directive: BmbSwipeDirective;
  let hostElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    directive = fixture.debugElement
      .query(By.directive(BmbSwipeDirective))
      .injector.get(BmbSwipeDirective);
    hostElement = fixture.nativeElement.querySelector('.item');
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should render the content, left and right actions containers', () => {
    expect(hostElement.querySelector('.bmb_swipe-content')).toBeTruthy();
    expect(
      hostElement.querySelector('.bmb_swipe-actions-left #favorite'),
    ).toBeTruthy();
    expect(
      hostElement.querySelector('.bmb_swipe-actions-right #delete'),
    ).toBeTruthy();
    expect(
      hostElement.querySelector('.bmb_swipe-content #content'),
    ).toBeTruthy();
  });

  it('should reveal the left actions and emit "left" when dragged right past the threshold', () => {
    const leftContainer = hostElement.querySelector(
      '.bmb_swipe-actions-left',
    ) as HTMLElement;
    jest
      .spyOn(leftContainer, 'getBoundingClientRect')
      .mockReturnValue({ width: 100 } as DOMRect);

    firePointer(hostElement, 'pointerdown', 0);
    firePointer(document, 'pointermove', 80);
    firePointer(document, 'pointerup', 80);

    expect(host.lastOpenSide).toBe('left');
  });

  it('should reveal the right actions and emit "right" when dragged left past the threshold', () => {
    const rightContainer = hostElement.querySelector(
      '.bmb_swipe-actions-right',
    ) as HTMLElement;
    jest
      .spyOn(rightContainer, 'getBoundingClientRect')
      .mockReturnValue({ width: 100 } as DOMRect);

    firePointer(hostElement, 'pointerdown', 0);
    firePointer(document, 'pointermove', -80);
    firePointer(document, 'pointerup', -80);

    expect(host.lastOpenSide).toBe('right');
  });

  it('should snap back to closed when released before the threshold', () => {
    const leftContainer = hostElement.querySelector(
      '.bmb_swipe-actions-left',
    ) as HTMLElement;
    jest
      .spyOn(leftContainer, 'getBoundingClientRect')
      .mockReturnValue({ width: 100 } as DOMRect);

    firePointer(hostElement, 'pointerdown', 0);
    firePointer(document, 'pointermove', 20);
    firePointer(document, 'pointerup', 20);

    expect(host.lastOpenSide).toBeNull();
  });

  it('should not drag when disabled', () => {
    host.disabled = true;
    fixture.detectChanges();

    const leftContainer = hostElement.querySelector(
      '.bmb_swipe-actions-left',
    ) as HTMLElement;
    jest
      .spyOn(leftContainer, 'getBoundingClientRect')
      .mockReturnValue({ width: 100 } as DOMRect);

    firePointer(hostElement, 'pointerdown', 0);
    firePointer(document, 'pointermove', 80);
    firePointer(document, 'pointerup', 80);

    expect(host.lastOpenSide).toBeUndefined();
  });

  it('should close programmatically', () => {
    const leftContainer = hostElement.querySelector(
      '.bmb_swipe-actions-left',
    ) as HTMLElement;
    jest
      .spyOn(leftContainer, 'getBoundingClientRect')
      .mockReturnValue({ width: 100 } as DOMRect);

    firePointer(hostElement, 'pointerdown', 0);
    firePointer(document, 'pointermove', 80);
    firePointer(document, 'pointerup', 80);

    expect(host.lastOpenSide).toBe('left');

    directive.close();

    expect(host.lastOpenSide).toBeNull();
  });

  it('should close when an action inside the revealed section is clicked', () => {
    const leftContainer = hostElement.querySelector(
      '.bmb_swipe-actions-left',
    ) as HTMLElement;
    jest
      .spyOn(leftContainer, 'getBoundingClientRect')
      .mockReturnValue({ width: 100 } as DOMRect);

    firePointer(hostElement, 'pointerdown', 0);
    firePointer(document, 'pointermove', 80);
    firePointer(document, 'pointerup', 80);

    expect(host.lastOpenSide).toBe('left');

    (hostElement.querySelector('#favorite') as HTMLElement).click();

    expect(host.lastOpenSide).toBeNull();
  });
});
