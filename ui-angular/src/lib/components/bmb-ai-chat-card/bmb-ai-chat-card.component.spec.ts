import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbAIChatCardComponent } from './bmb-ai-chat-card.component';
import {
  ComponentRef,
  DebugElement,
  getDebugNode,
  TemplateRef,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbHomeCardHeaderComponent } from '../bmb-home-card/bmb-home-card-header/bmb-home-card-header.component';
import { BmbProjectionContentService } from '../../services/old/projection/projection.service';

describe('BmbAIChatCardComponent', () => {
  let component: BmbAIChatCardComponent;
  let fixture: ComponentFixture<BmbAIChatCardComponent>;
  let componentRef: ComponentRef<BmbAIChatCardComponent>;
  const projection = {
    openContent: jest.fn().mockReturnValue('ai_chat_bar_actions_dialog'),
    closeContent: jest.fn(),
    isContentOpen: jest.fn().mockReturnValue(false),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [BmbAIChatCardComponent],
      providers: [
        { provide: BmbProjectionContentService, useValue: projection },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbAIChatCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function getHeaderButtons() {
    return fixture.debugElement
      .query(By.directive(BmbHomeCardHeaderComponent))
      .queryAll(By.directive(BmbActionIconComponent));
  }

  function renderChatHeader() {
    const calls = projection.openContent.mock.calls;
    const content = calls[calls.length - 1][0].content as TemplateRef<unknown>;
    const view = content.createEmbeddedView({});
    view.detectChanges();
    const root = view.rootNodes.find((node) => node.nodeType === 1);
    const header = getDebugNode(
      root.querySelector('bmb-home-card-header'),
    ) as DebugElement;
    return { view, header };
  }

  it.each([false, true])(
    'shows new chat and minimize without a menu (mobile: %s)',
    (isMobile) => {
      componentRef.setInput('headerActions', [{ icon: 'chat_add_on' }]);
      fixture.detectChanges();
      const header = fixture.debugElement.query(
        By.directive(BmbHomeCardHeaderComponent),
      );
      const headerFixture = TestBed.createComponent(BmbHomeCardHeaderComponent);
      headerFixture.componentRef.setInput('componentTitle', 'AI chat');
      headerFixture.componentRef.setInput(
        'aiChatHeaderActions',
        header.componentInstance.aiChatHeaderActions(),
      );
      headerFixture.componentRef.setInput(
        'isExpanded',
        header.componentInstance.isExpanded(),
      );
      headerFixture.componentRef.setInput('isMobile', isMobile);
      headerFixture.detectChanges();

      expect(
        headerFixture.debugElement
          .queryAll(By.directive(BmbActionIconComponent))
          .map((button) => button.componentInstance.getIcon()),
      ).toEqual([
        'chat_add_on',
        'minimize',
        isMobile ? 'close' : 'zoom_in_map',
      ]);
      expect(header.componentInstance.actionHeaders()).toEqual([]);
      headerFixture.destroy();
    },
  );

  it.each([false, true])(
    'keeps the overflow menu for regular home-card actions (mobile: %s)',
    (isMobile) => {
      const headerFixture = TestBed.createComponent(BmbHomeCardHeaderComponent);
      headerFixture.componentRef.setInput('componentTitle', 'Home card');
      headerFixture.componentRef.setInput('actionHeaders', [
        { icon: 'edit' },
        { icon: 'delete' },
        { icon: 'share' },
      ]);
      headerFixture.componentRef.setInput('isMobile', isMobile);
      headerFixture.detectChanges();

      expect(
        headerFixture.debugElement
          .queryAll(By.directive(BmbActionIconComponent))
          .map((button) => button.componentInstance.icon()),
      ).toEqual(
        isMobile ? ['more_horiz'] : ['edit', 'more_horiz', 'zoom_out_map'],
      );
      const more = headerFixture.debugElement
        .queryAll(By.directive(BmbActionIconComponent))
        .find((button) => button.componentInstance.icon() === 'more_horiz')!;
      more.nativeElement.querySelector('button').click();
      expect(projection.openContent).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.any(TemplateRef),
          targetRef: expect.any(HTMLElement),
        }),
      );
      headerFixture.destroy();
    },
  );

  it.each(['expanded', 'chat'])(
    'calls the supplied new-chat action exactly once in %s mode',
    (mode) => {
      const action = jest.fn();
      const newChat = { icon: 'chat_add_on', action };
      componentRef.setInput('headerActions', [newChat]);
      componentRef.setInput('mode', mode);
      fixture.detectChanges();
      const chat = mode === 'chat' ? renderChatHeader() : null;
      const buttons = chat
        ? chat.header.queryAll(By.directive(BmbActionIconComponent))
        : getHeaderButtons();
      buttons[0].nativeElement.querySelector('button').click();

      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith(expect.any(MouseEvent), newChat);
      expect(component.mode()).toBe(mode);
      chat?.view.destroy();
    },
  );

  it('updates visible header actions and their callbacks when the consumer changes them', () => {
    const oldAction = jest.fn();
    const newAction = jest.fn();
    componentRef.setInput('headerActions', [
      { icon: 'chat_add_on', action: oldAction },
    ]);
    fixture.detectChanges();
    const replacement = { icon: 'refresh', action: newAction };
    componentRef.setInput('headerActions', [replacement]);
    fixture.detectChanges();

    const buttons = getHeaderButtons();
    expect(buttons.map((button) => button.componentInstance.getIcon())).toEqual(
      ['refresh', 'minimize', 'zoom_in_map'],
    );
    buttons[0].nativeElement.querySelector('button').click();
    expect(newAction).toHaveBeenCalledTimes(1);
    expect(newAction).toHaveBeenCalledWith(expect.any(MouseEvent), replacement);
    expect(oldAction).not.toHaveBeenCalled();
  });

  it('does not show a new-chat button when the consumer omits the action', () => {
    expect(
      getHeaderButtons().map((button) => button.componentInstance.icon()),
    ).toEqual(['minimize', 'zoom_out_map']);
  });

  it('uses the existing header control to collapse and expand the chat', () => {
    const header = fixture.debugElement.query(
      By.directive(BmbHomeCardHeaderComponent),
    );
    expect(header.componentInstance.isExpanded()).toBe(true);
    const collapse = getHeaderButtons().find(
      (button) => button.componentInstance.idElement() === 'expand',
    )!.componentInstance as BmbActionIconComponent;
    expect(collapse.getIcon()).toBe('zoom_in_map');
    collapse.handleClick();
    expect(component.mode()).toBe('chat');
    fixture.detectChanges();

    const chat = renderChatHeader();
    expect(chat.header.componentInstance.isExpanded()).toBe(false);
    const expand = chat.header
      .queryAll(By.directive(BmbActionIconComponent))
      .find((button) => button.componentInstance.idElement() === 'expand')!
      .componentInstance as BmbActionIconComponent;
    expect(expand.getIcon()).toBe('zoom_out_map');
    projection.isContentOpen.mockReturnValueOnce(true);
    expand.handleClick();
    expect(component.mode()).toBe('expanded');
    fixture.detectChanges();
    expect(projection.closeContent).toHaveBeenCalledWith(
      'ai_chat_bar_actions_dialog',
    );
    expect(
      fixture.debugElement
        .query(By.directive(BmbHomeCardHeaderComponent))
        .componentInstance.isExpanded(),
    ).toBe(true);
    chat.view.destroy();
  });

  it.each(['compact', 'invisible'])(
    'minimizes a floating chat back to %s',
    (previousMode) => {
      componentRef.setInput('mode', previousMode);
      fixture.detectChanges();
      componentRef.setInput('mode', 'chat');
      fixture.detectChanges();
      const chat = renderChatHeader();
      const minimize = chat.header
        .queryAll(By.directive(BmbActionIconComponent))
        .find((button) => button.componentInstance.icon() === 'minimize')!;

      minimize.componentInstance.handleClick();
      fixture.detectChanges();

      expect(component.mode()).toBe(previousMode);
      chat.view.destroy();
    },
  );

  it('minimizes an expanded card to the FAB and reopens the chat from it', () => {
    getHeaderButtons()[0].componentInstance.buttonClick.emit(
      new MouseEvent('click'),
    );
    fixture.detectChanges();

    expect(component.mode()).toBe('compact');
    expect(
      fixture.debugElement.query(By.directive(BmbHomeCardHeaderComponent)),
    ).toBeNull();
    expect(
      fixture.nativeElement.querySelector('.bmb_ai-chat-card-bot'),
    ).toBeTruthy();

    const fab = fixture.debugElement.query(
      By.directive(BmbActionIconComponent),
    );
    fab.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    expect(component.mode()).toBe('chat');
    expect(projection.openContent).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'ai_chat_bar_actions_dialog' }),
    );
    const chat = renderChatHeader();
    expect(
      chat.header
        .queryAll(By.directive(BmbActionIconComponent))
        .map((button) => button.componentInstance.getIcon()),
    ).toEqual(['minimize', 'zoom_out_map']);
    chat.view.destroy();
  });
});
