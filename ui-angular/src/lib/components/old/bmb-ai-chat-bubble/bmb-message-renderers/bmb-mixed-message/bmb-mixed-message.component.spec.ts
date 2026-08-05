import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MixedMessageComponent } from './bmb-mixed-message.component';
import { BmbMixedMessage } from '../../types';

let componentRef: ComponentRef<MixedMessageComponent>;

describe('MixedMessageComponent', () => {
  let component: MixedMessageComponent;
  let fixture: ComponentFixture<MixedMessageComponent>;

  const mockMessage: BmbMixedMessage = {
    id: '1',
    type: 'mixed',
    isUser: false,
    timestamp: new Date(),
    content: {
      text: 'Mixed message text',
      imageUrl: 'https://image.com/test.jpg',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixedMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MixedMessageComponent);
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

  it('should render wrapper container', () => {
    const wrapper = fixture.debugElement.query(
      By.css('.bmb-ai-chat-bubble-mixed'),
    );

    expect(wrapper).toBeTruthy();
  });

  it('should render message text', () => {
    const textElement: HTMLElement = fixture.debugElement.query(
      By.css('.bmb-ai-chat-bubble-mixed-text'),
    ).nativeElement;

    expect(textElement.textContent?.trim()).toBe(mockMessage.content.text);
  });

  it('should render image', () => {
    const image = fixture.debugElement.query(
      By.css('.bmb-ai-chat-bubble-mixed-image'),
    );

    expect(image).toBeTruthy();
  });

  it('should render correct image src', () => {
    const image: HTMLImageElement = fixture.debugElement.query(
      By.css('.bmb-ai-chat-bubble-mixed-image'),
    ).nativeElement;

    expect(image.src).toContain(mockMessage.content.imageUrl);
  });

  it('should render correct image alt', () => {
    const image: HTMLImageElement = fixture.debugElement.query(
      By.css('.bmb-ai-chat-bubble-mixed-image'),
    ).nativeElement;

    expect(image.alt).toBe(mockMessage.content.text);
  });

  it('should have lazy loading enabled', () => {
    const image: HTMLImageElement = fixture.debugElement.query(
      By.css('.bmb-ai-chat-bubble-mixed-image'),
    ).nativeElement;

    expect(image.loading).toBe('lazy');
  });

  it('should fallback alt text when text is empty', () => {
    const messageWithoutText: BmbMixedMessage = {
      ...mockMessage,
      content: {
        text: '',
        imageUrl: 'https://image.com/test.jpg',
      },
    };

    componentRef.setInput('message', messageWithoutText);

    fixture.detectChanges();

    const image: HTMLImageElement = fixture.debugElement.query(
      By.css('.bmb-ai-chat-bubble-mixed-image'),
    ).nativeElement;

    expect(image.alt).toBe('Message image');
  });
});
