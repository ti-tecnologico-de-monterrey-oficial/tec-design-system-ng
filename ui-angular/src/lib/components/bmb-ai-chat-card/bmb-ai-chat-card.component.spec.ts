import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbAIChatCardComponent } from './bmb-ai-chat-card.component';
import { ComponentRef } from '@angular/core';

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
    handleExpand: () => void;
    isCompactMode: () => boolean;
    isExpandedMode: () => boolean;
    isOneChatBar: () => boolean;
    headerActionList: () => { icon: string; action: () => void }[];
  };
  const internals = () => component as unknown as Internals;

  it('should have compact mode and the default bot by default', () => {
    expect(component.mode()).toBe('compact');
    expect(component.currentBot().name).toBe('TecBot');
    expect(component.currentBot().icon).toBe('bot_tecStandar');
    expect(component.componentTitle()).toBe('');
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

    componentRef.setInput('mode', 'invisible');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector(selector)).toBeNull();

    componentRef.setInput('mode', 'expanded');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector(selector)).toBeNull();
  });

  it('should report compact and expanded mode flags', () => {
    expect(internals().isCompactMode()).toBe(true);
    expect(internals().isExpandedMode()).toBe(false);

    component.mode.set('expanded');
    expect(internals().isCompactMode()).toBe(false);
    expect(internals().isExpandedMode()).toBe(true);
  });

  it('should switch to chat mode when opening the chat', () => {
    internals().openChat();
    expect(component.mode()).toBe('chat');
  });

  it('should switch to expanded mode when expanding', () => {
    component.mode.set('chat');
    internals().handleExpand();
    expect(component.mode()).toBe('expanded');
  });

  it('should only provide the expand header action (plus custom ones) in chat mode', () => {
    expect(internals().headerActionList()).toEqual([]);

    const custom = { icon: 'close', tooltipText: 'Close', action: jest.fn() };
    componentRef.setInput('headerActions', [custom]);
    component.mode.set('chat');

    const actions = internals().headerActionList();
    expect(actions.length).toBe(2);
    expect(actions[0].icon).toBe('zoom_out_map');
    expect(actions[1]).toBe(custom);

    actions[0].action();
    expect(component.mode()).toBe('expanded');

    component.mode.set('expanded');
    expect(internals().headerActionList()).toEqual([]);
  });

  it('should go to chat when contracting from compact or invisible', () => {
    component.mode.set('compact');
    (component as unknown as { handleExpandOrContract: () => void })
      .handleExpandOrContract();
    expect(component.mode()).toBe('chat');

    component.mode.set('invisible');
    (component as unknown as { handleExpandOrContract: () => void })
      .handleExpandOrContract();
    expect(component.mode()).toBe('chat');
  });

  it('should go to compact when contracting from chat and the last non-chat mode was not invisible', () => {
    component.mode.set('chat');
    (component as unknown as { handleExpandOrContract: () => void })
      .handleExpandOrContract();
    expect(component.mode()).toBe('compact');
  });

  it('should go back to invisible when contracting from chat after tracking invisible as the last non-chat mode', () => {
    component.mode.set('invisible');
    fixture.detectChanges();

    component.mode.set('chat');
    (component as unknown as { handleExpandOrContract: () => void })
      .handleExpandOrContract();

    expect(component.mode()).toBe('invisible');
  });

  it('should go to chat when expanding', () => {
    component.mode.set('expanded');
    (component as unknown as { handleExpandOrContract: () => void })
      .handleExpandOrContract();
    expect(component.mode()).toBe('chat');
  });
});
