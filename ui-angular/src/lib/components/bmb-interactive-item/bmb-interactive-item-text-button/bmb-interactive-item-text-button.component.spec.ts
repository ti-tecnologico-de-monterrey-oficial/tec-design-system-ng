import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbInteractiveItemTextButtonComponent } from './bmb-interactive-item-text-button.component';
import { ComponentRef } from '@angular/core';

describe('BmbInteractiveItemTextButtonComponent', () => {
  let component: BmbInteractiveItemTextButtonComponent;
  let fixture: ComponentFixture<BmbInteractiveItemTextButtonComponent>;
  let componentRef: ComponentRef<BmbInteractiveItemTextButtonComponent>;

  beforeEach(async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
      text: async () => '<svg viewBox="0 0 24 24"></svg>',
    } as Response);

    await TestBed.configureTestingModule({
      imports: [BmbInteractiveItemTextButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbInteractiveItemTextButtonComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('icon', 'face');
    componentRef.setInput('label', 'Text');
    componentRef.setInput('value', 'info');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the required inputs inside a button', () => {
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    const item = fixture.nativeElement.querySelector('bmb-item-default');

    expect(button.type).toBe('button');
    expect(button.disabled).toBe(false);
    expect(item).not.toBeNull();
    expect(item.textContent).toContain('Text');
    expect(item.textContent).toContain('info');
  });

  it('should emit the same mouse event when clicked', () => {
    const emittedEvents: MouseEvent[] = [];
    component.getActionClick.subscribe((event) => emittedEvents.push(event));
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    const clickEvent = new MouseEvent('click', { bubbles: true });

    button.dispatchEvent(clickEvent);

    expect(emittedEvents).toEqual([clickEvent]);
  });

  it('should disable the native button and not emit clicks', () => {
    const emitSpy = jest.spyOn(component.getActionClick, 'emit');
    componentRef.setInput('isDisabled', true);
    fixture.detectChanges();
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');

    button.click();

    expect(button.disabled).toBe(true);
    expect(emitSpy).not.toHaveBeenCalled();
  });
});
