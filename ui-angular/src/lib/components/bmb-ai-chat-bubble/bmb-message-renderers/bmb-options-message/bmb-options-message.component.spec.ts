import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';

import { OptionsMessageComponent } from './bmb-options-message.component';
import { BmbOptionsMessage } from '../../types';
import { provideRouter } from '@angular/router';
import { BmbItemInformativeTextComponent } from '../../../bmb-item/bmb-item-informative-text/bmb-item-informative-text.component';
import { BmbItemActionsComponent } from '../../../bmb-item/bmb-item-actions/bmb-item-actions.component';

describe('OptionsMessageComponent', () => {
  let component: OptionsMessageComponent;
  let fixture: ComponentFixture<OptionsMessageComponent>;
  let componentRef: ComponentRef<OptionsMessageComponent>;

  const mockMessage: BmbOptionsMessage = {
    id: '1',
    type: 'options',
    isUser: false,
    timestamp: new Date(),
    content: {
      text: 'Select an option',
      options: [
        { id: '1', label: 'Option 1', href: '/option-1', target: '_blank' },
        { id: '2', label: 'Option 2' },
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

  it('should render message text', () => {
    const textElement: HTMLElement = fixture.debugElement.query(
      By.css('.bmb_ai-chat-bubble-options-text'),
    ).nativeElement;

    expect(textElement.textContent?.trim()).toBe('Select an option');
  });

  it('should render an informative text item for options with href', () => {
    const informative = fixture.debugElement.queryAll(
      By.directive(BmbItemInformativeTextComponent),
    );

    expect(informative.length).toBe(1);
  });

  it('should render an action item for options without href', () => {
    const actions = fixture.debugElement.queryAll(
      By.directive(BmbItemActionsComponent),
    );

    expect(actions.length).toBe(1);
  });

  it('should pass correct inputs to informative text item', () => {
    const informative = fixture.debugElement.query(
      By.directive(BmbItemInformativeTextComponent),
    ).componentInstance as BmbItemInformativeTextComponent;

    expect(informative.supportTextLinkLabel()).toBe('Option 1');
    expect(informative.supportTextLink()).toBe('/option-1');
    expect(informative.supportTextTarget()).toBe('_blank');
  });

  it('should pass correct label to action item', () => {
    const action = fixture.debugElement.query(
      By.directive(BmbItemActionsComponent),
    ).componentInstance as BmbItemActionsComponent;

    expect(action.label()).toBe('Option 2');
  });

  it('should emit getOptionClicked when action item is clicked', () => {
    jest.spyOn(component.getOptionClicked, 'emit');

    const action = fixture.debugElement.query(
      By.directive(BmbItemActionsComponent),
    );

    action.triggerEventHandler('getActionClick', {});

    expect(component.getOptionClicked.emit).toHaveBeenCalled();
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
      By.css('.bmb_ai-chat-bubble-options-text'),
    );

    expect(textElement).toBeFalsy();
  });
});
