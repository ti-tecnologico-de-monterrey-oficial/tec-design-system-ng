import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbTooltipBaseComponent } from './bmb-tooltip-base.component';

describe('BmbTooltipBaseComponent', () => {
  let component: BmbTooltipBaseComponent;
  let fixture: ComponentFixture<BmbTooltipBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTooltipBaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTooltipBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.hideTooltip();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.each([
    ['mouseenter', 'mouseleave'],
    ['mousedown', 'mouseup'],
    ['touchstart', 'touchend'],
  ])('preserves automatic %s / %s behavior by default', (open, close) => {
    expect(component.manual()).toBe(false);
    const container = component.tooltipContainer.nativeElement;
    container.dispatchEvent(new Event(open));
    expect(component.floatingElement).not.toBeNull();
    expect(
      component.floatingElement?.classList.contains(
        'bmb_tooltip-dialog--manual',
      ),
    ).toBe(false);
    container.dispatchEvent(new Event(close));
    expect(component.floatingElement).toBeNull();
  });

  it('keeps focus handling automatic by default', () => {
    const container = component.tooltipContainer.nativeElement;
    jest.spyOn(container, 'matches').mockReturnValue(true);
    container.dispatchEvent(new FocusEvent('focusin'));
    expect(component.floatingElement).not.toBeNull();
    container.dispatchEvent(new FocusEvent('focusout'));
    expect(component.floatingElement).toBeNull();
  });

  it('ignores automatic events in manual mode but supports explicit opening and closing', () => {
    fixture.componentRef.setInput('manual', true);
    fixture.componentRef.setInput('text', 'Full label');
    fixture.detectChanges();
    const container = component.tooltipContainer.nativeElement;
    for (const type of ['mouseenter', 'mousedown', 'touchstart', 'focusin']) {
      container.dispatchEvent(new Event(type));
      expect(component.floatingElement).toBeNull();
    }
    component.showTooltip();
    expect(component.floatingElement?.textContent).toBe('Full label');
    expect(
      component.floatingElement?.classList.contains(
        'bmb_tooltip-dialog--manual',
      ),
    ).toBe(true);
    expect(fixture.nativeElement.style.display).toBe('none');
    for (const type of ['mouseleave', 'mouseup', 'touchend', 'focusout']) {
      container.dispatchEvent(new Event(type));
      expect(component.floatingElement).not.toBeNull();
    }
    component.hideTooltip();
    expect(component.floatingElement).toBeNull();
  });

  it('positions a manual tooltip against its external anchor', () => {
    const anchor = document.createElement('button');
    const rect = jest.spyOn(anchor, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      right: 200,
      top: 80,
      bottom: 100,
      width: 100,
      height: 20,
      x: 100,
      y: 80,
      toJSON: () => ({}),
    });
    fixture.componentRef.setInput('manual', true);
    fixture.componentRef.setInput('anchor', anchor);
    fixture.detectChanges();
    component.showTooltip();
    expect(rect).toHaveBeenCalled();
    expect(component.floatingElement?.style.left).toBe('208px');
    expect(component.floatingElement?.style.top).toBe('80px');
  });

  it('removes a manually opened tooltip when the component is destroyed', () => {
    fixture.componentRef.setInput('manual', true);
    fixture.detectChanges();
    component.showTooltip();
    fixture.destroy();
    expect(document.body.querySelector('.bmb_tooltip-dialog')).toBeNull();
    expect(component.floatingElement).toBeNull();
  });

  it('should update floating tooltip content when inputs change while open', () => {
    fixture.componentRef.setInput('componentTitle', 'Initial title');
    fixture.componentRef.setInput('text', 'Initial text');
    fixture.detectChanges();

    component.showTooltip();

    let tooltip = document.body.querySelector('.bmb_tooltip-dialog');

    expect(tooltip?.textContent).toContain('Initial title');
    expect(tooltip?.textContent).toContain('Initial text');

    fixture.componentRef.setInput('componentTitle', 'Updated title');
    fixture.componentRef.setInput('text', 'Updated text');
    fixture.detectChanges();

    tooltip = document.body.querySelector('.bmb_tooltip-dialog');

    expect(tooltip?.textContent).toContain('Updated title');
    expect(tooltip?.textContent).toContain('Updated text');
    expect(tooltip?.textContent).not.toContain('Initial title');
    expect(tooltip?.textContent).not.toContain('Initial text');
  });
});
