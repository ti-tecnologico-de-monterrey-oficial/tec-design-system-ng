import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';

import { BmbChatBubblesComponent } from './bmb-chat-bubbles.component';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('BmbChatBubblesComponent', () => {
  let component: BmbChatBubblesComponent;
  let fixture: ComponentFixture<BmbChatBubblesComponent>;
  let componentRef: ComponentRef<BmbChatBubblesComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbChatBubblesComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('message', {
      id: 'message-1',
      userProfile: 'userProfile',
      isUserMessage: true,
      type: 'text',
      content: { text: 'content' },
      time: new Date(),
      loading: false,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render copy for a user message', () => {
    const icon = fixture.debugElement.query(
      By.css('.bmb_chat-bubble-extra-container-user bmb-icon'),
    );

    expect(icon).toBeTruthy();
    expect(icon.componentInstance.icon()).toBe('content_copy');
  });

  it('should select and deselect the message for touch interactions', () => {
    const bubble = fixture.debugElement.query(By.css('.bmb_chat-bubble'));
    bubble.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.isSelected()).toBeTrue();
    expect(
      bubble.nativeElement.classList.contains('bmb_chat-bubble-selected'),
    ).toBeTrue();

    component.handleDocumentClick(new Event('click'));
    expect(component.isSelected()).toBeFalse();
  });

  it('should show check for 3 seconds after a successful copy', fakeAsync(() => {
    spyOn<any>(component, 'writeToClipboard').and.resolveTo();

    component.handleAction('copy', new Event('click'));
    flushMicrotasks();
    fixture.detectChanges();

    let icon = fixture.debugElement.query(
      By.css('.bmb_chat-bubble-extra-container-user bmb-icon'),
    );
    expect(component.copyState()).toBe('success');
    expect(icon.componentInstance.icon()).toBe('check');
    expect(icon.attributes['aria-disabled']).toBe('true');

    tick(3000);
    fixture.detectChanges();
    icon = fixture.debugElement.query(
      By.css('.bmb_chat-bubble-extra-container-user bmb-icon'),
    );
    expect(component.copyState()).toBe('idle');
    expect(icon.componentInstance.icon()).toBe('content_copy');
  }));

  it('should show close for 3 seconds after a copy error', fakeAsync(() => {
    spyOn<any>(component, 'writeToClipboard').and.rejectWith(
      new Error('Clipboard unavailable'),
    );

    component.handleAction('copy', new Event('click'));
    flushMicrotasks();
    fixture.detectChanges();

    const icon = fixture.debugElement.query(
      By.css('.bmb_chat-bubble-extra-container-user bmb-icon'),
    );
    expect(component.copyState()).toBe('error');
    expect(icon.componentInstance.icon()).toBe('close');
    expect(icon.attributes['aria-disabled']).toBe('true');

    tick(3000);
    expect(component.copyState()).toBe('idle');
  }));

  it('should ignore another copy while the action is disabled', fakeAsync(() => {
    let resolveCopy!: () => void;
    const pendingCopy = new Promise<void>((resolve) => {
      resolveCopy = resolve;
    });
    spyOn<any>(component, 'writeToClipboard').and.returnValue(pendingCopy);

    component.handleAction('copy', new Event('click'));
    component.handleAction('copy', new Event('click'));

    expect(component['writeToClipboard']).toHaveBeenCalledTimes(1);

    resolveCopy();
    flushMicrotasks();
    tick(3000);
  }));
});
