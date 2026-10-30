import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbAIChatCardComponent } from './bmb-ai-chat-card.component';
import {
  Component,
  ComponentRef,
  CUSTOM_ELEMENTS_SCHEMA,
  signal,
} from '@angular/core';
import { BmbChatBarComponent } from '../bmb-chat-bar/bmb-chat-bar.component';
import { BmbProjectionContentService } from '../../services/old/projection/projection.service';
import type { IBmbProjectionContent } from '../../services/old/projection/projection.service';
import { BmbTranslationsService } from '../../services/translations/translations.service';
import { By } from '@angular/platform-browser';
import {
  IBMB_AI_CHAT_CARD_MODE,
  IBmbAIChatCardMode,
} from '../../_shared/types/components/ai-chat-card';

@Component({
  standalone: true,
  imports: [BmbAIChatCardComponent, BmbChatBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <bmb-ai-chat-card [(mode)]="mode">
      <bmb-ai-chat-bubble></bmb-ai-chat-bubble>
      <bmb-chat-bar></bmb-chat-bar>
      @if (showSecondChatBar()) {
        <bmb-chat-bar></bmb-chat-bar>
      }
    </bmb-ai-chat-card>
  `,
})
class HostComponent {
  mode = signal<IBmbAIChatCardMode>(IBMB_AI_CHAT_CARD_MODE.COMPACT);
  showSecondChatBar = signal(false);
}

describe('BmbAIChatCardComponent with projected content', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let projection: BmbProjectionContentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    projection = TestBed.inject(BmbProjectionContentService);
    fixture.detectChanges();
  });

  afterEach(() => {
    host.mode.set(IBMB_AI_CHAT_CARD_MODE.COMPACT);
    fixture.detectChanges();
    fixture.destroy();
  });

  it('should open the projected dialog in chat mode and close it afterwards', () => {
    host.mode.set(IBMB_AI_CHAT_CARD_MODE.CHAT);
    fixture.detectChanges();
    expect(projection.isContentOpen('ai_chat_bar_actions_dialog')).toBe(true);

    host.mode.set(IBMB_AI_CHAT_CARD_MODE.COMPACT);
    fixture.detectChanges();
    expect(projection.isContentOpen('ai_chat_bar_actions_dialog')).toBe(false);
  });

  it('should accept exactly one projected chat bar without logging an error', () => {
    const card = fixture.debugElement.query(
      By.directive(BmbAIChatCardComponent),
    ).componentInstance as BmbAIChatCardComponent;
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});

    card.ngAfterViewInit();

    expect(error).not.toHaveBeenCalled();
    error.mockRestore();
  });

  it('should reject multiple projected chat bars', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    const multipleBarsFixture = TestBed.createComponent(HostComponent);
    multipleBarsFixture.componentInstance.showSecondChatBar.set(true);

    multipleBarsFixture.detectChanges();

    expect(error).toHaveBeenCalledWith(
      expect.stringContaining('exactly one bmb-chat-bar; 2 were found'),
    );
    multipleBarsFixture.destroy();
    error.mockRestore();
  });

  it('should render bubbles and chat bar and scroll bubbles to bottom', async () => {
    host.mode.set(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
    fixture.detectChanges();

    const bubbles = fixture.nativeElement.querySelector(
      '.bmb_ai-chat-card-bubbles',
    ) as HTMLElement;
    expect(bubbles).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('.bmb_ai-chat-card-bar'),
    ).toBeTruthy();

    Object.defineProperty(bubbles, 'scrollHeight', {
      configurable: true,
      value: 500,
    });
    bubbles.appendChild(document.createElement('div'));
    await Promise.resolve();
    await new Promise((resolve) => setTimeout(resolve));
    expect(bubbles.scrollTop).toBe(500);
  });

  it('should focus the chat bar input when conversation is enabled', async () => {
    const spy = jest.spyOn(HTMLElement.prototype, 'focus');
    host.mode.set(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
    fixture.detectChanges();
    await Promise.resolve();
    await new Promise((resolve) => setTimeout(resolve));

    const bar = fixture.nativeElement.querySelector('.bmb_ai-chat-card-bar');
    expect(bar).toBeTruthy();
    expect(spy.mock.contexts.some((el) => bar.contains(el as Node))).toBe(true);
    spy.mockRestore();
  });

  it('should restore the previous mode when the dialog is closed', () => {
    host.mode.set(IBMB_AI_CHAT_CARD_MODE.CHAT);
    fixture.detectChanges();
    projection.closeContent('ai_chat_bar_actions_dialog');
    fixture.detectChanges();
    expect(host.mode()).toBe(IBMB_AI_CHAT_CARD_MODE.COMPACT);
  });

  it('should re-observe the bubbles container when it is recreated', () => {
    host.mode.set(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
    fixture.detectChanges();
    host.mode.set(IBMB_AI_CHAT_CARD_MODE.COMPACT);
    fixture.detectChanges();
    host.mode.set(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.bmb_ai-chat-card-bubbles'),
    ).toBeTruthy();
  });

  it('should not fail when starting directly in chat mode', () => {
    const f = TestBed.createComponent(HostComponent);
    f.componentInstance.mode.set(IBMB_AI_CHAT_CARD_MODE.CHAT);
    expect(() => f.detectChanges()).not.toThrow();
    f.componentInstance.mode.set(IBMB_AI_CHAT_CARD_MODE.COMPACT);
    f.detectChanges();
    f.destroy();
  });

  it('should disconnect the observer on destroy', () => {
    host.mode.set(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
    fixture.detectChanges();
    expect(() => fixture.destroy()).not.toThrow();
  });
});

describe('BmbAIChatCardComponent', () => {
  let component: BmbAIChatCardComponent;
  let fixture: ComponentFixture<BmbAIChatCardComponent>;
  let componentRef: ComponentRef<BmbAIChatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbAIChatCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbAIChatCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  type Internals = {
    openChat: () => void;
    handleMinimize: () => void;
    handleExpandOrContract: () => void;
    isCompactMode: () => boolean;
    isExpandedMode: () => boolean;
    isOneChatBar: () => boolean;
    headerActionList: () => { icon: string; action: () => void }[];
  };
  const internals = () => component as unknown as Internals;

  it('should have compact mode and the default bot by default', () => {
    expect(component.mode()).toBe(IBMB_AI_CHAT_CARD_MODE.COMPACT);
    expect(component.currentBot().name).toBe('TecBot');
    expect(component.currentBot().icon).toBe('bot_tecStandar');
    expect(component.componentTitle()).toBe('');
    expect(component.subtitle()).toBeUndefined();
    expect(component.bgIconAppearance()).toBe('gray-charade-500');
    expect(component.isExpanded()).toBe(false);
    expect(component.headerActions()).toEqual([]);
    expect(component.testId()).toContain('ai_chat_card_test_');
  });

  it('should accept inputs', () => {
    componentRef.setInput('componentTitle', 'Title');
    componentRef.setInput('subtitle', 'Subtitle');
    componentRef.setInput('bgIconAppearance', 'primary-500');
    componentRef.setInput('testId', 'custom_id');
    expect(component.componentTitle()).toBe('Title');
    expect(component.subtitle()).toBe('Subtitle');
    expect(component.bgIconAppearance()).toBe('primary-500');
    expect(component.testId()).toBe('custom_id');
  });

  it('should log an error when there is not exactly one bmb-chat-bar', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    component.ngAfterViewInit();
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('exactly one bmb-chat-bar; 0 were found'),
    );
    expect(internals().isOneChatBar()).toBe(false);
    spy.mockRestore();
  });

  it('should render the bot icon only in compact mode', () => {
    const selector = 'bmb-action-icon.bmb_ai-chat-card-bot';
    expect(fixture.nativeElement.querySelector(selector)).toBeTruthy();

    componentRef.setInput('mode', IBMB_AI_CHAT_CARD_MODE.INVISIBLE);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector(selector)).toBeNull();

    componentRef.setInput('mode', IBMB_AI_CHAT_CARD_MODE.EXPANDED);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector(selector)).toBeNull();
  });

  it('should report compact and expanded mode flags', () => {
    expect(internals().isCompactMode()).toBe(true);
    expect(internals().isExpandedMode()).toBe(false);

    component.mode.set(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
    expect(internals().isCompactMode()).toBe(false);
    expect(internals().isExpandedMode()).toBe(true);
  });

  it('should switch to chat mode when opening the chat', () => {
    internals().openChat();
    expect(component.mode()).toBe(IBMB_AI_CHAT_CARD_MODE.CHAT);
  });

  it('should go to compact when contracting from chat and the last non-chat mode was not invisible', () => {
    component.mode.set(IBMB_AI_CHAT_CARD_MODE.CHAT);
    (component as unknown as { handleMinimize: () => void }).handleMinimize();
    expect(component.mode()).toBe(IBMB_AI_CHAT_CARD_MODE.COMPACT);
  });

  it('should go back to invisible when contracting from chat after tracking invisible as the last non-chat mode', () => {
    component.mode.set(IBMB_AI_CHAT_CARD_MODE.INVISIBLE);
    fixture.detectChanges();

    component.mode.set(IBMB_AI_CHAT_CARD_MODE.CHAT);
    (component as unknown as { handleMinimize: () => void }).handleMinimize();

    expect(component.mode()).toBe(IBMB_AI_CHAT_CARD_MODE.INVISIBLE);
  });

  it('should go to invisible when expand-or-contract is triggered from chat', () => {
    component.mode.set(IBMB_AI_CHAT_CARD_MODE.CHAT);
    (
      component as unknown as { handleExpandOrContract: () => void }
    ).handleExpandOrContract();
    expect(component.mode()).toBe(IBMB_AI_CHAT_CARD_MODE.INVISIBLE);
  });

  it('should only provide the minimize header action (plus custom ones) in chat mode', () => {
    expect(internals().headerActionList()).toEqual([]);

    const custom = { icon: 'close', tooltipText: 'Close', action: jest.fn() };
    componentRef.setInput('headerActions', [custom]);
    component.mode.set(IBMB_AI_CHAT_CARD_MODE.CHAT);

    const actions = internals().headerActionList();
    expect(actions).toHaveLength(2);
    expect(actions[0].icon).toBe('minimize');
    expect(actions[1]).toBe(custom);

    actions[0].action();
    expect(component.mode()).toBe(IBMB_AI_CHAT_CARD_MODE.COMPACT);

    component.mode.set(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
    expect(internals().headerActionList()).toEqual([custom]);
  });

  it('should do nothing when scrolling or focusing without containers', () => {
    const c = component as unknown as {
      scrollBubblesToBottom: () => void;
      focusChatBarInput: () => void;
    };
    expect(() => c.scrollBubblesToBottom()).not.toThrow();
    expect(() => c.focusChatBarInput()).not.toThrow();
  });

  it('should remain expanded when expand-or-contract is triggered from expanded', () => {
    component.mode.set(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
    (
      component as unknown as { handleExpandOrContract: () => void }
    ).handleExpandOrContract();
    expect(component.mode()).toBe(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
  });

  it.each([
    IBMB_AI_CHAT_CARD_MODE.INVISIBLE,
    IBMB_AI_CHAT_CARD_MODE.COMPACT,
    IBMB_AI_CHAT_CARD_MODE.EXPANDED,
  ])('should expand from %s mode', (mode) => {
    component.mode.set(mode);

    internals().handleExpandOrContract();

    expect(component.mode()).toBe(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
  });

  it.each([IBMB_AI_CHAT_CARD_MODE.INVISIBLE, IBMB_AI_CHAT_CARD_MODE.COMPACT])(
    'should preserve %s as the return mode through an expanded conversation',
    (mode) => {
      component.mode.set(mode);
      fixture.detectChanges();
      component.mode.set(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
      fixture.detectChanges();

      internals().handleMinimize();

      expect(component.mode()).toBe(mode);
    },
  );

  it.each([IBMB_AI_CHAT_CARD_MODE.INVISIBLE, IBMB_AI_CHAT_CARD_MODE.COMPACT])(
    'should hide custom header actions in %s mode',
    (mode) => {
      componentRef.setInput('headerActions', [
        { icon: 'close', tooltipText: 'Close', action: jest.fn() },
      ]);
      component.mode.set(mode);

      expect(internals().headerActionList()).toEqual([]);
    },
  );

  it('should emit model updates without changing the supplied bot', () => {
    const bot = { name: 'Assistant', icon: 'bot_chatGPT' };
    const botChange = jest.fn();
    const expandedChange = jest.fn();
    const modeChange = jest.fn();
    component.currentBot.subscribe(botChange);
    component.isExpanded.subscribe(expandedChange);
    component.mode.subscribe(modeChange);

    component.currentBot.set(bot);
    component.isExpanded.set(true);
    internals().openChat();

    expect(component.currentBot()).toBe(bot);
    expect(botChange).toHaveBeenCalledWith(bot);
    expect(expandedChange).toHaveBeenCalledWith(true);
    expect(modeChange).toHaveBeenCalledWith(IBMB_AI_CHAT_CARD_MODE.CHAT);
  });
});

describe('BmbAIChatCardComponent effects and lifecycle', () => {
  let fixture: ComponentFixture<BmbAIChatCardComponent>;
  let component: BmbAIChatCardComponent;
  let contentOpen: boolean;
  let pendingMicrotasks: VoidFunction[];
  let observers: {
    observer: MutationObserver;
    callback: MutationCallback;
  }[];
  let projection: {
    isContentOpen: jest.Mock;
    openContent: jest.Mock<string | undefined, [IBmbProjectionContent]>;
    closeContent: jest.Mock;
  };

  type LifecycleInternals = {
    focusChatBarInput: () => void;
    scrollBubblesToBottom: () => void;
    headerActionList: () => { icon: string; tooltipText: string }[];
  };
  const internals = () => component as unknown as LifecycleInternals;
  const dialogId = 'ai_chat_bar_actions_dialog';
  const openedContent = (): IBmbProjectionContent =>
    projection.openContent.mock.calls[0][0];

  beforeEach(async () => {
    contentOpen = false;
    pendingMicrotasks = [];
    observers = [];
    projection = {
      isContentOpen: jest.fn(() => contentOpen),
      openContent: jest.fn((content: IBmbProjectionContent) => {
        contentOpen = true;
        return content.id;
      }),
      closeContent: jest.fn(() => {
        contentOpen = false;
      }),
    };
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(globalThis, 'queueMicrotask').mockImplementation((callback) => {
      pendingMicrotasks.push(callback);
    });
    jest.spyOn(window, 'MutationObserver').mockImplementation((callback) => {
      const observer: MutationObserver = {
        observe: jest.fn(),
        disconnect: jest.fn(),
        takeRecords: jest.fn(() => []),
      };
      observers.push({ observer, callback });
      return observer;
    });

    await TestBed.configureTestingModule({
      imports: [BmbAIChatCardComponent],
      providers: [
        { provide: BmbProjectionContentService, useValue: projection },
        {
          provide: BmbTranslationsService,
          useValue: { translate: (key: string) => `translated:${key}` },
        },
      ],
    })
      .overrideComponent(BmbAIChatCardComponent, {
        set: {
          imports: [],
          template: `
            @if (isExpanded()) {
              <ng-template #aiChatContent></ng-template>
              <div #aiChatBubblesContainer data-testid="bubbles"></div>
              <div #aiChatBarContainer data-testid="bar"><textarea></textarea></div>
            }
          `,
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BmbAIChatCardComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    jest.restoreAllMocks();
  });

  it('should translate the default bot label and minimize tooltip', () => {
    expect(component.currentBot().label).toBe(
      'translated:chat_bar.default_bot_label',
    );
    component.mode.set(IBMB_AI_CHAT_CARD_MODE.CHAT);

    expect(internals().headerActionList()[0].tooltipText).toBe(
      'translated:home_card.collapse',
    );
  });

  it('should skip opening the projection until its template is available', () => {
    component.mode.set(IBMB_AI_CHAT_CARD_MODE.CHAT);
    fixture.detectChanges();

    expect(projection.openContent).not.toHaveBeenCalled();

    component.isExpanded.set(true);
    fixture.detectChanges();

    expect(projection.openContent).toHaveBeenCalledTimes(1);
    expect(openedContent()).toEqual({
      id: dialogId,
      showBackdrop: false,
      content: expect.anything(),
      dialogClass: ['bmb_ai-chat-card-dialog'],
      focusOnOpen: true,
      afterCloseContent: expect.any(Function),
    });
  });

  it('should not open a duplicate projection when the dialog is already open', () => {
    contentOpen = true;
    component.isExpanded.set(true);
    component.mode.set(IBMB_AI_CHAT_CARD_MODE.CHAT);

    fixture.detectChanges();

    expect(projection.isContentOpen).toHaveBeenCalledWith(dialogId);
    expect(projection.openContent).not.toHaveBeenCalled();
  });

  it.each([
    IBMB_AI_CHAT_CARD_MODE.INVISIBLE,
    IBMB_AI_CHAT_CARD_MODE.COMPACT,
    IBMB_AI_CHAT_CARD_MODE.EXPANDED,
  ])('should close an open projection when leaving chat for %s', (mode) => {
    component.isExpanded.set(true);
    component.mode.set(IBMB_AI_CHAT_CARD_MODE.CHAT);
    fixture.detectChanges();
    expect(contentOpen).toBe(true);

    component.mode.set(mode);
    fixture.detectChanges();

    expect(projection.closeContent).toHaveBeenCalledWith(dialogId);
    expect(contentOpen).toBe(false);
  });

  it('should not close a projection that is not open', () => {
    fixture.detectChanges();

    expect(projection.closeContent).not.toHaveBeenCalled();
  });

  it.each([IBMB_AI_CHAT_CARD_MODE.INVISIBLE, IBMB_AI_CHAT_CARD_MODE.COMPACT])(
    'should restore %s when the projection closes during chat',
    (mode) => {
      component.mode.set(mode);
      fixture.detectChanges();
      component.isExpanded.set(true);
      component.mode.set(IBMB_AI_CHAT_CARD_MODE.CHAT);
      fixture.detectChanges();

      openedContent().afterCloseContent?.({
        contentId: dialogId,
        reason: 'single',
      });

      expect(component.mode()).toBe(mode);
    },
  );

  it('should ignore a delayed close callback after the mode has changed', () => {
    component.isExpanded.set(true);
    component.mode.set(IBMB_AI_CHAT_CARD_MODE.CHAT);
    fixture.detectChanges();
    const content = openedContent();
    component.mode.set(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
    fixture.detectChanges();

    content.afterCloseContent?.({ contentId: dialogId, reason: 'single' });

    expect(component.mode()).toBe(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
  });

  it('should observe bubble descendants and scroll when a mutation occurs', () => {
    component.isExpanded.set(true);
    fixture.detectChanges();
    const bubbles = fixture.nativeElement.querySelector(
      '[data-testid="bubbles"]',
    );
    const { observer, callback } = observers[observers.length - 1];
    expect(observer.observe).toHaveBeenCalledWith(bubbles, {
      childList: true,
      subtree: true,
    });
    Object.defineProperty(bubbles, 'scrollHeight', { value: 640 });

    callback([], observer);

    expect(bubbles.scrollTop).toBe(640);
  });

  it('should scroll immediately when the bubbles container appears', () => {
    const scroll = jest.spyOn(internals(), 'scrollBubblesToBottom');
    component.isExpanded.set(true);

    fixture.detectChanges();

    expect(scroll).toHaveBeenCalled();
  });

  it('should disconnect the previous observer when the container is removed and recreated', () => {
    component.isExpanded.set(true);
    fixture.detectChanges();
    const previousObserver = observers[observers.length - 1].observer;
    component.isExpanded.set(false);
    fixture.detectChanges();
    expect(previousObserver.disconnect).toHaveBeenCalled();

    component.isExpanded.set(true);
    fixture.detectChanges();

    expect(observers[observers.length - 1].observer).not.toBe(previousObserver);
    expect(observers[observers.length - 1].observer.observe).toHaveBeenCalled();
  });

  it('should disconnect an active observer on destroy', () => {
    component.isExpanded.set(true);
    fixture.detectChanges();
    const observer = observers[observers.length - 1].observer;
    const disconnectsBeforeDestroy = (observer.disconnect as jest.Mock).mock
      .calls.length;

    fixture.destroy();

    expect(observer.disconnect).toHaveBeenCalledTimes(
      disconnectsBeforeDestroy + 1,
    );
  });

  it('should safely destroy the component before an observer exists', () => {
    fixture.detectChanges();

    expect(observers).toHaveLength(0);
    expect(() => component.ngOnDestroy()).not.toThrow();
  });

  it.each([IBMB_AI_CHAT_CARD_MODE.CHAT, IBMB_AI_CHAT_CARD_MODE.EXPANDED])(
    'should defer focusing the input while in %s mode',
    (mode) => {
      component.isExpanded.set(true);
      component.mode.set(mode);
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('textarea');
      const focus = jest.spyOn(input, 'focus');
      expect(pendingMicrotasks.length).toBeGreaterThan(0);
      expect(focus).not.toHaveBeenCalled();

      pendingMicrotasks.forEach((callback) => callback());

      expect(focus).toHaveBeenCalled();
    },
  );

  it.each(['input', 'textarea', 'div'])(
    'should focus a supported %s editor',
    (tagName) => {
      component.isExpanded.set(true);
      fixture.detectChanges();
      const bar = fixture.nativeElement.querySelector('[data-testid="bar"]');
      const editor = document.createElement(tagName);
      if (tagName === 'div') editor.setAttribute('contenteditable', 'true');
      bar.replaceChildren(editor);
      const focus = jest.spyOn(editor, 'focus');

      internals().focusChatBarInput();

      expect(focus).toHaveBeenCalledTimes(1);
    },
  );

  it('should tolerate a bar container without an editable element', () => {
    component.isExpanded.set(true);
    fixture.detectChanges();
    fixture.nativeElement
      .querySelector('[data-testid="bar"]')
      .replaceChildren();

    expect(() => internals().focusChatBarInput()).not.toThrow();
  });

  it('should tolerate removed containers when a queued focus callback runs', () => {
    component.isExpanded.set(true);
    component.mode.set(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
    fixture.detectChanges();
    component.isExpanded.set(false);
    fixture.detectChanges();

    expect(() =>
      pendingMicrotasks.forEach((callback) => callback()),
    ).not.toThrow();
    expect(() => internals().scrollBubblesToBottom()).not.toThrow();
  });

  it('should use an empty action list when headerActions is undefined at runtime', () => {
    fixture.componentRef.setInput('headerActions', undefined);
    component.mode.set(IBMB_AI_CHAT_CARD_MODE.EXPANDED);

    expect(internals().headerActionList()).toEqual([]);
  });
});
