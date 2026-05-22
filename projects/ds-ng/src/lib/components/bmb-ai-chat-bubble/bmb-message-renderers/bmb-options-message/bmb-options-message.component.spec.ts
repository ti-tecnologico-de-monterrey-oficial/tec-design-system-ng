import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';

import { OptionsMessageComponent } from './bmb-options-message.component';
import { BmbOptionsMessage } from '../../types';
import { provideRouter } from '@angular/router';

let componentRef: ComponentRef<OptionsMessageComponent>;

describe('OptionsMessageComponent', () => {
  let component: OptionsMessageComponent;
  let fixture: ComponentFixture<OptionsMessageComponent>;

  const optionAction = jasmine.createSpy('optionAction');

  const mockMessage: BmbOptionsMessage = {
    id: '1',
    type: 'options',
    isUser: false,
    timestamp: new Date(),
    content: {
      text: 'Select an option',
      options: [
        {
          id: '1',
          label: 'Option 1',
          href: '/option-1',
          target: '_blank',
          action: optionAction,
        },
        {
          id: '2',
          label: 'Option 2',
        },
      ],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsMessageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionsMessageComponent);
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
      By.css('.bmb-ai-chat-bubble-options'),
    );

    expect(wrapper).toBeTruthy();
  });

  it('should render message text', () => {
    const textElement: HTMLElement = fixture.debugElement.query(
      By.css('.bmb-ai-chat-bubble-options-text'),
    ).nativeElement;

    expect(textElement.textContent?.trim()).toBe(mockMessage.content.text!);
  });

  it('should render all options', () => {
    const buttons = fixture.debugElement.queryAll(
      By.css('bmb-container-button'),
    );

    expect(buttons.length).toBe(2);
  });

  it('should pass correct componentTitle input', () => {
    const button = fixture.debugElement.queryAll(
      By.css('bmb-container-button'),
    )[0];

    expect(button.componentInstance.componentTitle()).toBe('Option 1');
  });

  it('should pass correct target input', () => {
    const button = fixture.debugElement.queryAll(
      By.css('bmb-container-button'),
    )[0];

    expect(button.componentInstance.target()).toBe('_blank');
  });

  it('should fallback target to _self', () => {
    const button = fixture.debugElement.queryAll(
      By.css('bmb-container-button'),
    )[1];

    expect(button.componentInstance.target()).toBe('_self');
  });

  it('should pass correct link input', () => {
    const button = fixture.debugElement.queryAll(
      By.css('bmb-container-button'),
    )[0];

    expect(button.componentInstance.link()).toBe('/option-1');
  });

  it('should fallback link to empty string', () => {
    const button = fixture.debugElement.queryAll(
      By.css('bmb-container-button'),
    )[1];

    expect(button.componentInstance.link()).toBe('');
  });

  it('should set small input as true', () => {
    const button = fixture.debugElement.query(By.css('bmb-container-button'));

    expect(button.componentInstance.small()).toBeTrue();
  });

  it('should set square input as true', () => {
    const button = fixture.debugElement.query(By.css('bmb-container-button'));

    expect(button.componentInstance.square()).toBeTrue();
  });

  it('should render data-testid attribute', () => {
    const button = fixture.debugElement.query(
      By.css('[data-testid="chat-option-1"]'),
    );

    expect(button).toBeTruthy();
  });

  it('should trigger option action on button click', () => {
    const button = fixture.debugElement.query(By.css('bmb-container-button'));

    button.triggerEventHandler('onButton', {});

    expect(optionAction).toHaveBeenCalled();
  });

  it('should not fail if option has no action', () => {
    const secondButton = fixture.debugElement.queryAll(
      By.css('bmb-container-button'),
    )[1];

    expect(() => {
      secondButton.triggerEventHandler('onButton', {});
    }).not.toThrow();
  });

  it('should not render text when content.text is empty', () => {
    const messageWithoutText: BmbOptionsMessage = {
      ...mockMessage,
      content: {
        ...mockMessage.content,
        text: '',
      },
    };

    componentRef.setInput('message', messageWithoutText);

    fixture.detectChanges();

    const textElement = fixture.debugElement.query(
      By.css('.bmb-ai-chat-bubble-options-text'),
    );

    expect(textElement).toBeFalsy();
  });
});
