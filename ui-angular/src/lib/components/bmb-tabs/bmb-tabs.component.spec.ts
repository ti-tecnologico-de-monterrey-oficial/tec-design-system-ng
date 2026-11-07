import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTabsComponent } from './bmb-tabs.component';

describe('BmbTabsComponent', () => {
  let component: BmbTabsComponent;
  let fixture: ComponentFixture<BmbTabsComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbTabsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the base class by default', () => {
    expect(component.getTabsClasses()).toEqual(['bmb_tabs']);
  });

  it('should add the primary class when appearanceContrast is primary', () => {
    fixture.componentRef.setInput('appearanceContrast', 'primary');
    expect(component.getTabsClasses()).toEqual([
      'bmb_tabs',
      'bmb_tabs-primary',
    ]);
  });

  it('should add the alternative class when appearanceContrast is alternative', () => {
    fixture.componentRef.setInput('appearanceContrast', 'alternative');
    expect(component.getTabsClasses()).toEqual([
      'bmb_tabs',
      'bmb_tabs-alternative',
    ]);
  });
});

describe('BmbTabs full-text interaction', () => {
  let fixture: ComponentFixture<BmbTabsComponent>;
  let buttons: HTMLButtonElement[];

  function pointer(type: string, button: HTMLButtonElement): void {
    const event = new Event(type, { bubbles: true });
    Object.assign(event, {
      pointerId: 1,
      pointerType: 'touch',
      button: 0,
      isPrimary: true,
      clientX: 0,
      clientY: 0,
    });
    button.dispatchEvent(event);
  }

  beforeEach(() => {
    jest.useFakeTimers();
    fixture = TestBed.createComponent(BmbTabsComponent);
    jest
      .spyOn(fixture.componentInstance, 'showActiveTab')
      .mockImplementation(() => undefined);
    fixture.componentRef.setInput('tabs', [
      { id: 1, title: 'Inicio', isActive: true },
      { id: 2, title: 'Long label that needs more space', badge: 3 },
    ]);
    fixture.detectChanges();
    buttons = Array.from(
      fixture.nativeElement.querySelectorAll('[role="tab"]'),
    );
    buttons.forEach((button) => {
      Object.defineProperties(button.querySelector('.bmb_tabs-content'), {
        clientWidth: { value: 100 },
        scrollWidth: { value: 300 },
      });
    });
  });

  afterEach(() => {
    fixture.destroy();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('keeps full-text disabled by default and preserves selection after holding', () => {
    const selected = jest.fn();
    fixture.componentInstance.selected.subscribe(selected);
    expect(fixture.componentInstance.showFullText()).toBe(false);
    pointer('pointerdown', buttons[1]);
    jest.advanceTimersByTime(500);
    pointer('pointerup', buttons[1]);
    buttons[1].dispatchEvent(
      new MouseEvent('click', { bubbles: true, detail: 1 }),
    );
    expect(selected).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance.selectedTabId()).toBe(2);
    expect(document.querySelector('.bmb_full-text-tooltip')).toBeNull();
  });

  it('shows a badged label on long press without selection, then preserves a normal click', () => {
    fixture.componentRef.setInput('showFullText', true);
    fixture.detectChanges();
    const selected = jest.fn();
    fixture.componentInstance.selected.subscribe(selected);
    pointer('pointerdown', buttons[1]);
    jest.advanceTimersByTime(500);
    expect(document.querySelector('.bmb_full-text-tooltip')?.textContent).toBe(
      'Long label that needs more space',
    );
    pointer('pointerup', buttons[1]);
    buttons[1].dispatchEvent(
      new MouseEvent('click', { bubbles: true, detail: 1 }),
    );
    expect(selected).not.toHaveBeenCalled();
    expect(fixture.componentInstance.selectedTabId()).toBe(1);
    pointer('pointerdown', buttons[1]);
    pointer('pointerup', buttons[1]);
    buttons[1].dispatchEvent(
      new MouseEvent('click', { bubbles: true, detail: 1 }),
    );
    expect(selected).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance.selectedTabId()).toBe(2);
  });

  it('lets keyboard users inspect another tab without selecting it', () => {
    fixture.componentRef.setInput('showFullText', true);
    fixture.detectChanges();
    buttons[0].focus();
    buttons[0].dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(document.activeElement).toBe(buttons[1]);
    expect(fixture.componentInstance.selectedTabId()).toBe(1);
    buttons[1].dispatchEvent(
      new MouseEvent('click', { bubbles: true, detail: 0 }),
    );
    expect(fixture.componentInstance.selectedTabId()).toBe(2);
  });
});
