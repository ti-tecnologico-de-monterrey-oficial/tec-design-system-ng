import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbHomeCardChatComponent } from './bmb-home-card-chat.component';
import { ComponentRef } from '@angular/core';

describe('BmbHomeCardChatComponent', () => {
  let component: BmbHomeCardChatComponent;
  let fixture: ComponentFixture<BmbHomeCardChatComponent>;
  let componentRef: ComponentRef<BmbHomeCardChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbHomeCardChatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbHomeCardChatComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('messagesHistory', [
      {
        type: 'text',
        content: { text: 'Hola, ¿cómo estás? En que puedo ayudarte' },
        isUserMessage: false,
        time: new Date('2025-02-19T14:31:00'),
      },
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('parsedBotActions', () => {
    it('should default to the full action set with translated labels', () => {
      const actions = component.parsedBotActions();
      expect(actions.map((a) => a.key)).toEqual([
        'copy',
        'dislike',
        'like',
        'repeat',
        'voice',
      ]);
      actions.forEach((action) => {
        expect(action.icon).toBeTruthy();
        expect(action.label).toBeTruthy();
      });
    });

    it('should throw for an unsupported action', () => {
      componentRef.setInput('botActions', ['unknown']);
      expect(() => component.parsedBotActions()).toThrow(
        'Action name not supported',
      );
    });
  });

  describe('resolveGptIcons / resolveGptBot', () => {
    it('should be true for a bot message', () => {
      const message = { isUserMessage: false } as any;
      expect(component.resolveGptIcons(message)).toBe(true);
      expect(component.resolveGptBot(message)).toBe(true);
    });

    it('should be false for a user message', () => {
      const message = { isUserMessage: true } as any;
      expect(component.resolveGptIcons(message)).toBe(false);
      expect(component.resolveGptBot(message)).toBe(false);
    });
  });

  describe('resolveThinking', () => {
    it('should be true for the last bot message while loading', () => {
      componentRef.setInput('isLoading', true);
      fixture.detectChanges();

      const message = { isUserMessage: false } as any;
      expect(component.resolveThinking(message, 0)).toBe(true);
    });

    it('should be false when not loading', () => {
      const message = { isUserMessage: false } as any;
      expect(component.resolveThinking(message, 0)).toBe(false);
    });

    it('should be false for a user message even while loading', () => {
      componentRef.setInput('isLoading', true);
      fixture.detectChanges();

      const message = { isUserMessage: true } as any;
      expect(component.resolveThinking(message, 0)).toBe(false);
    });
  });

  describe('resolveTestId', () => {
    it('should build the test id from the message id', () => {
      const message = { id: 'msg-1' } as any;
      expect(component.resolveTestId(message, 3)).toBe('chat-bubble-bubble-msg-1');
    });

    it('should fall back to the index when there is no message id', () => {
      const message = { id: undefined } as any;
      expect(component.resolveTestId(message, 2)).toBe('chat-bubble-bubble-2');
    });
  });

  describe('handleBack / handleSend / handleNewText', () => {
    it('should emit getBack', () => {
      const emitSpy = jest.spyOn(component.getBack, 'emit');
      component.handleBack();
      expect(emitSpy).toHaveBeenCalled();
    });

    it('should emit getSendMessage with the message', () => {
      const emitSpy = jest.spyOn(component.getSendMessage, 'emit');
      component.handleSend('hello');
      expect(emitSpy).toHaveBeenCalledWith('hello');
    });

    it('should emit getNewChat with true', () => {
      const emitSpy = jest.spyOn(component.getNewChat, 'emit');
      component.handleNewText();
      expect(emitSpy).toHaveBeenCalledWith(true);
    });
  });
});
