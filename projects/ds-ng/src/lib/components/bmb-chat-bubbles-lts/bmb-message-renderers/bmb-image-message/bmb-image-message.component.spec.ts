import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ImageMessageComponent } from './bmb-image-message.component';
import { BmbImageMessage } from '../../types';

let componentRef: ComponentRef<ImageMessageComponent>;

describe('ImageMessageComponent', () => {
  let component: ImageMessageComponent;
  let fixture: ComponentFixture<ImageMessageComponent>;

  const mockMessage: BmbImageMessage = {
    id: '1',
    type: 'image',
    isUser: false,
    timestamp: new Date(),
    content: {
      imageUrl: 'https://image.com/test.jpg',
      alt: 'Test image',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageMessageComponent);
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

  it('should render image', () => {
    const image = fixture.debugElement.query(
      By.css('.bmb-chat-bubbles-lts-image-picture'),
    );

    expect(image).toBeTruthy();
  });

  it('should render correct image src', () => {
    const image: HTMLImageElement = fixture.debugElement.query(
      By.css('.bmb-chat-bubbles-lts-image-picture'),
    ).nativeElement;

    expect(image.src).toContain(mockMessage.content.imageUrl);
  });

  it('should render correct image alt', () => {
    const image: HTMLImageElement = fixture.debugElement.query(
      By.css('.bmb-chat-bubbles-lts-image-picture'),
    ).nativeElement;

    expect(image.src).toContain(mockMessage.content.imageUrl!);
  });

  it('should render fallback alt text', () => {
    const messageWithoutAlt: BmbImageMessage = {
      ...mockMessage,
      content: {
        imageUrl: 'https://image.com/test.jpg',
      },
    };

    componentRef.setInput('message', messageWithoutAlt);

    fixture.detectChanges();

    const image: HTMLImageElement = fixture.debugElement.query(
      By.css('.bmb-chat-bubbles-lts-image-picture'),
    ).nativeElement;

    expect(image.alt).toBe('Chat image');
  });

  it('should have lazy loading enabled', () => {
    const image: HTMLImageElement = fixture.debugElement.query(
      By.css('.bmb-chat-bubbles-lts-image-picture'),
    ).nativeElement;

    expect(image.loading).toBe('lazy');
  });

  it('should render wrapper container', () => {
    const wrapper = fixture.debugElement.query(
      By.css('.bmb-chat-bubbles-lts-image'),
    );

    expect(wrapper).toBeTruthy();
  });
});
