import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TextMessageComponent } from './bmb-text-message.component';
import { BmbTextMessage } from '../../types';

let componentRef: ComponentRef<TextMessageComponent>;

describe('TextMessageComponent', () => {
  let component: TextMessageComponent;
  let fixture: ComponentFixture<TextMessageComponent>;

  const mockMessage: BmbTextMessage = {
    id: '1',
    type: 'text',
    isUser: false,
    timestamp: new Date(),
    content: {
      text: 'Hello world',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextMessageComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('message', mockMessage);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct message input', () => {
    expect(component.message()).toEqual(mockMessage);
  });

  it('should render text container', () => {
    const textElement = fixture.debugElement.query(
      By.css('.bmb-chat-bubbles-lts-text'),
    );

    expect(textElement).toBeTruthy();
  });

  it('should render correct text content', () => {
    const textElement: HTMLElement = fixture.debugElement.query(
      By.css('.bmb-chat-bubbles-lts-text'),
    ).nativeElement;

    expect(textElement.textContent?.trim()).toBe(mockMessage.content.text);
  });

  it('should update rendered text when message changes', () => {
    const updatedMessage: BmbTextMessage = {
      ...mockMessage,
      content: {
        text: 'Updated message',
      },
    };

    componentRef.setInput('message', updatedMessage);

    fixture.detectChanges();

    const textElement: HTMLElement = fixture.debugElement.query(
      By.css('.bmb-chat-bubbles-lts-text'),
    ).nativeElement;

    expect(textElement.textContent?.trim()).toBe('Updated message');
  });

  it('should render empty string correctly', () => {
    const emptyMessage: BmbTextMessage = {
      ...mockMessage,
      content: {
        text: '',
      },
    };

    componentRef.setInput('message', emptyMessage);

    fixture.detectChanges();

    const textElement: HTMLElement = fixture.debugElement.query(
      By.css('.bmb-chat-bubbles-lts-text'),
    ).nativeElement;

    expect(textElement.textContent?.trim()).toBe('');
  });
});
