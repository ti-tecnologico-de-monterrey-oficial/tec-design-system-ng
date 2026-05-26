import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BmbAiChatBubbleComponent } from './bmb-ai-chat-bubble.component';
import {
  BmbChatActionEvent,
  BmbImageMessage,
  BmbLinkMessage,
  BmbMixedMessage,
  BmbOptionsMessage,
  BmbTextMessage,
} from './types';

let componentRef: ComponentRef<BmbAiChatBubbleComponent>;

describe('BmbAiChatBubbleComponent', () => {
  let component: BmbAiChatBubbleComponent;
  let fixture: ComponentFixture<BmbAiChatBubbleComponent>;

  const mockBotMessage: BmbTextMessage = {
    id: '1',
    type: 'text',
    isUser: false,
    timestamp: new Date(),
    content: {
      text: 'Hello from bot',
    },
  };

  const mockUserMessage: BmbTextMessage = {
    id: '2',
    type: 'text',
    isUser: true,
    timestamp: new Date(),
    userProfile: 'https://image.com/profile.jpg',
    content: {
      text: 'Hello from user',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbAiChatBubbleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbAiChatBubbleComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('message', mockBotMessage);
    componentRef.setInput('testId', 'chat-bubble');
    componentRef.setInput('showActions', true);
    componentRef.setInput('isThinking', false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct testId input', () => {
    expect(component.testId()).toBe('chat-bubble');
  });

  it('should have correct showActions input', () => {
    expect(component.showActions()).toBe(true);
  });

  it('should render bot message class', () => {
    const element = fixture.debugElement.query(
      By.css('.bmb-ai-chat-bubble-bot'),
    );

    expect(element).toBeTruthy();
  });

  it('should render user message class', () => {
    componentRef.setInput('message', mockUserMessage);

    fixture.detectChanges();

    const element = fixture.debugElement.query(
      By.css('.bmb-ai-chat-bubble-user'),
    );

    expect(element).toBeTruthy();
  });

  it('should render thinking state', () => {
    componentRef.setInput('isThinking', true);

    fixture.detectChanges();

    const element = fixture.debugElement.query(
      By.css('.bmb-ai-chat-bubble-thinking-dots'),
    );

    expect(element).toBeTruthy();
  });

  it('should render actions component for bot message', () => {
    const element = fixture.debugElement.query(By.css('bmb-chat-actions'));

    expect(element).toBeTruthy();
  });

  it('should not render actions component for user message', () => {
    componentRef.setInput('message', mockUserMessage);

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('bmb-chat-actions'));

    expect(element).toBeFalsy();
  });

  it('should not render actions component when showActions is false', () => {
    componentRef.setInput('showActions', false);

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('bmb-chat-actions'));

    expect(element).toBeFalsy();
  });

  it('should emit action event', () => {
    spyOn(component.getAction, 'emit');

    const mockEvent: BmbChatActionEvent = {
      action: 'copy',
      messageId: '1',
      message: mockBotMessage,
    };

    component['onAction'](mockEvent);

    expect(component.getAction.emit).toHaveBeenCalledWith(mockEvent);
  });

  it('should render text message component', () => {
    const element = fixture.debugElement.query(By.css('bmb-text-message'));

    expect(element).toBeTruthy();
  });

  it('should render image message component', () => {
    const imageMessage: BmbImageMessage = {
      id: '3',
      type: 'image',
      isUser: false,
      timestamp: new Date(),
      content: {
        imageUrl: 'https://image.com/test.jpg',
        alt: 'test image',
      },
    };

    componentRef.setInput('message', imageMessage);

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('bmb-image-message'));

    expect(element).toBeTruthy();
  });

  it('should render mixed message component', () => {
    const mixedMessage: BmbMixedMessage = {
      id: '4',
      type: 'mixed',
      isUser: false,
      timestamp: new Date(),
      content: {
        text: 'mixed message',
        imageUrl: 'https://image.com/test.jpg',
      },
    };

    componentRef.setInput('message', mixedMessage);

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('bmb-mixed-message'));

    expect(element).toBeTruthy();
  });

  it('should render link message component', () => {
    const linkMessage: BmbLinkMessage = {
      id: '5',
      type: 'link',
      isUser: false,
      timestamp: new Date(),
      content: {
        text: 'Google',
        href: 'https://google.com',
        target: '_blank',
      },
    };

    componentRef.setInput('message', linkMessage);

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('bmb-link-message'));

    expect(element).toBeTruthy();
  });

  it('should render options message component', () => {
    const optionsMessage: BmbOptionsMessage = {
      id: '6',
      type: 'options',
      isUser: false,
      timestamp: new Date(),
      content: {
        text: 'Select option',
        options: [
          {
            id: '1',
            label: 'Option 1',
          },
        ],
      },
    };

    componentRef.setInput('message', optionsMessage);

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('bmb-options-message'));

    expect(element).toBeTruthy();
  });

  it('should render timestamp', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain(
      new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(mockBotMessage.timestamp),
    );
  });
});
