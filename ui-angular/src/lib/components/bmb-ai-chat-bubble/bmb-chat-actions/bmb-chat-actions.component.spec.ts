import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ChatActionsComponent } from './bmb-chat-actions.component';
import { BmbTextMessage } from '../types';
import { BmbTranslationsService } from '../../../services/translations/translations.service';

let componentRef: ComponentRef<ChatActionsComponent>;

describe('ChatActionsComponent', () => {
  let component: ChatActionsComponent;
  let fixture: ComponentFixture<ChatActionsComponent>;

  const translationsServiceMock = {
    translate: (key: string) => key,
  };

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
      imports: [ChatActionsComponent],
      providers: [
        {
          provide: BmbTranslationsService,
          useValue: translationsServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatActionsComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('message', mockMessage);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have message input', () => {
    expect(component.message()).toEqual(mockMessage);
  });

  it('should initialize internal actions', () => {
    expect(component.internalActions().length).toBe(6);
  });

  it('should render all visible actions', () => {
    componentRef.setInput('actions', [
      'repeat',
      'voice',
      'copy',
      'like',
      'dislike',
    ]);
    const actionIcons = fixture.debugElement.queryAll(
      By.css('bmb-action-icon'),
    );

    expect(actionIcons.length).toBe(5);
  });

  it('should render any visible actions', () => {
    expect(fixture.debugElement.query(By.css('bmb-chat-actions'))).toBeFalsy();
  });

  it('should filter hidden actions', () => {
    component.internalActions.set([
      {
        action: 'copy',
        icon: 'content_copy',
        label: 'copy',
        visible: false,
      },
    ]);

    fixture.detectChanges();

    expect(component.visibleActions().length).toBe(0);
  });

  it('should filter actions using the configured action list', () => {
    componentRef.setInput('actions', ['copy']);

    fixture.detectChanges();

    expect(component.visibleActions().map((action) => action.action)).toEqual([
      'copy',
    ]);
  });

  it('should expose edit only for user text messages', () => {
    componentRef.setInput('message', { ...mockMessage, isUser: true });
    componentRef.setInput('actions', ['copy', 'edit']);
    fixture.detectChanges();

    expect(component.visibleActions().map((action) => action.action)).toEqual([
      'copy',
      'edit',
    ]);

    componentRef.setInput('message', mockMessage);
    fixture.detectChanges();

    expect(component.visibleActions().map((action) => action.action)).toEqual([
      'copy',
    ]);
  });

  it('should display copy result icons for success and error', () => {
    const copyAction = component
      .internalActions()
      .find((action) => action.action === 'copy')!;

    componentRef.setInput('copyState', 'success');
    expect(component['getActionIcon'](copyAction)).toBe('check');

    componentRef.setInput('copyState', 'error');
    expect(component['getActionIcon'](copyAction)).toBe('close');
  });

  it('should ignore copy while a result state is active', () => {
    jest.spyOn(component.actionTriggered, 'emit');
    componentRef.setInput('copyState', 'success');

    component['triggerAction']('copy', new MouseEvent('click'));

    expect(component.actionTriggered.emit).not.toHaveBeenCalled();
  });

  it('should emit action event', () => {
    jest.spyOn(component.actionTriggered, 'emit');

    const event = new MouseEvent('click');

    component['triggerAction']('copy', event);

    expect(component.actionTriggered.emit).toHaveBeenCalledWith({
      action: 'copy',
      messageId: mockMessage.id,
      message: mockMessage,
      nativeEvent: event,
    });
  });

  it('should activate like action', () => {
    const event = new MouseEvent('click');

    component['triggerAction']('like', event);

    fixture.detectChanges();

    const likeAction = component
      .internalActions()
      .find((item) => item.action === 'like');

    const dislikeAction = component
      .internalActions()
      .find((item) => item.action === 'dislike');

    expect(likeAction?.active).toBe(true);
    expect(dislikeAction?.active).toBe(false);
  });

  it('should activate dislike action', () => {
    const event = new MouseEvent('click');

    component['triggerAction']('dislike', event);

    fixture.detectChanges();

    const likeAction = component
      .internalActions()
      .find((item) => item.action === 'like');

    const dislikeAction = component
      .internalActions()
      .find((item) => item.action === 'dislike');

    expect(likeAction?.active).toBe(false);
    expect(dislikeAction?.active).toBe(true);
  });

  it('should toggle like action', () => {
    const event = new MouseEvent('click');

    component['triggerAction']('like', event);
    component['triggerAction']('like', event);

    fixture.detectChanges();

    const likeAction = component
      .internalActions()
      .find((item) => item.action === 'like');

    expect(likeAction?.active).toBe(false);
  });

  it('should add active class to active action', () => {
    const event = new MouseEvent('click');

    component['triggerAction']('like', event);

    fixture.detectChanges();

    const activeElement = fixture.debugElement.query(
      By.css('.bmb_ai-chat-bubble-icon-active'),
    );

    expect(activeElement).toBeTruthy();
  });

  it('should trigger action on click', () => {
    jest.spyOn(component, 'triggerAction' as never);

    const icon = fixture.debugElement.query(By.css('bmb-action-icon'));

    icon.triggerEventHandler('click', new MouseEvent('click'));

    expect(component['triggerAction']).toHaveBeenCalled();
  });

  it('should trigger action on enter keydown', () => {
    jest.spyOn(component, 'triggerAction' as never);

    const icon = fixture.debugElement.query(By.css('bmb-action-icon'));

    icon.triggerEventHandler(
      'keydown.enter',
      new KeyboardEvent('keydown', {
        key: 'Enter',
      }),
    );

    expect(component['triggerAction']).toHaveBeenCalled();
  });

  it('should trigger action on space keydown', () => {
    jest.spyOn(component, 'triggerAction' as never);

    const icon = fixture.debugElement.query(By.css('bmb-action-icon'));

    icon.triggerEventHandler(
      'keydown.space',
      new KeyboardEvent('keydown', {
        key: ' ',
      }),
    );

    expect(component['triggerAction']).toHaveBeenCalled();
  });

  it('should render translated aria labels', () => {
    const icons = fixture.debugElement.queryAll(By.css('bmb-action-icon'));
    componentRef.setInput('actions', ['repeat']);

    expect(icons[0].attributes['aria-label']).toContain('chat_bubbles.repeat');
  });
});
