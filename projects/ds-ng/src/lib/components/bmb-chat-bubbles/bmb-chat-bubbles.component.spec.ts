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

  it('should render the configured copy action for a user message', () => {
    const icons = fixture.debugElement.queryAll(
      By.css('.bmb_chat-bubble-extra-container-user bmb-icon'),
    );

    expect(icons.length).toBe(1);
    expect(icons[0].attributes['aria-label']).toBeTruthy();
  });

  it('should allow user actions to be configured', () => {
    componentRef.setInput('userActiveIcons', {
      copy: { visible: false },
      voice: { visible: true },
    });
    fixture.detectChanges();

    const icons = fixture.debugElement.queryAll(
      By.css('.bmb_chat-bubble-extra-container-user bmb-icon'),
    );

    expect(icons.length).toBe(1);
    expect(icons[0].componentInstance.icon()).toBe('record_voice_over');
  });

  it('should build copyable text for options', () => {
    componentRef.setInput('message', {
      id: 'message-2',
      isUserMessage: true,
      type: 'options',
      content: {
        text: 'Choose one',
        options: [{ title: 'First' }, { title: 'Second' }],
      },
      time: new Date(),
    });

    expect(component['buildPlainText']()).toBe(
      'Choose one\n\n- First\n- Second',
    );
  });

  it('should show check and disable copy for 3 seconds on success', fakeAsync(() => {
    spyOn<any>(component, 'writeToClipboard').and.resolveTo();

    component.handleAction('copy', new Event('click'));
    flushMicrotasks();

    expect(component.copyState()).toBe('success');
    expect(component.getActionIcon('copy', 'content_copy')).toBe('check');

    component.handleAction('copy', new Event('click'));
    expect(component['writeToClipboard']).toHaveBeenCalledTimes(1);

    tick(3000);
    expect(component.copyState()).toBe('idle');
    expect(component.getActionIcon('copy', 'content_copy')).toBe(
      'content_copy',
    );
  }));

  it('should ignore repeated copy actions while clipboard is pending', fakeAsync(() => {
    let resolveCopy!: () => void;
    const pendingCopy = new Promise<void>((resolve) => {
      resolveCopy = resolve;
    });
    spyOn<any>(component, 'writeToClipboard').and.returnValue(pendingCopy);

    component.handleAction('copy', new Event('click'));
    component.handleAction('copy', new Event('click'));

    expect(component.copyState()).toBe('pending');
    expect(component['writeToClipboard']).toHaveBeenCalledTimes(1);

    resolveCopy();
    flushMicrotasks();
    tick(3000);
  }));

  it('should show close and disable copy for 3 seconds on error', fakeAsync(() => {
    spyOn<any>(component, 'writeToClipboard').and.rejectWith(
      new Error('Clipboard unavailable'),
    );

    component.handleAction('copy', new Event('click'));
    flushMicrotasks();

    expect(component.copyState()).toBe('error');
    expect(component.getActionIcon('copy', 'content_copy')).toBe('close');

    tick(3000);
    expect(component.copyState()).toBe('idle');
  }));
});
