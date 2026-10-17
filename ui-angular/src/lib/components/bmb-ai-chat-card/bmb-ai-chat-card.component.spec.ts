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
import { IBmbAIChatCardMode } from '../../_shared/types/components/ai-chat-card';

@Component({
  standalone: true,
  imports: [BmbAIChatCardComponent, BmbChatBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <bmb-ai-chat-card [(mode)]="mode">
      <bmb-ai-chat-bubble></bmb-ai-chat-bubble>
      <bmb-chat-bar></bmb-chat-bar>
    </bmb-ai-chat-card>
  `,
})
class HostComponent {
  mode = signal<IBmbAIChatCardMode>('compact');
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
    host.mode.set('compact');
    fixture.detectChanges();
    fixture.destroy();
  });

  it('should open the projected dialog in chat mode and close it afterwards', () => {
    host.mode.set('chat');
    fixture.detectChanges();
    expect(projection.isContentOpen('ai_chat_bar_actions_dialog')).toBe(true);

    host.mode.set('compact');
    fixture.detectChanges();
    expect(projection.isContentOpen('ai_chat_bar_actions_dialog')).toBe(false);
  });

  it('should render bubbles and chat bar and scroll bubbles to bottom', async () => {
    host.mode.set('expanded');
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
    host.mode.set('expanded');
    fixture.detectChanges();
    await Promise.resolve();
    await new Promise((resolve) => setTimeout(resolve));

    const bar = fixture.nativeElement.querySelector('.bmb_ai-chat-card-bar');
    expect(bar).toBeTruthy();
    expect(spy.mock.contexts.some((el) => bar.contains(el as Node))).toBe(true);
    spy.mockRestore();
  });

  it('should restore the previous mode when the dialog is closed', () => {
    host.mode.set('chat');
    fixture.detectChanges();
    projection.closeContent('ai_chat_bar_actions_dialog');
    fixture.detectChanges();
    expect(host.mode()).toBe('compact');
  });

  it('should disconnect the observer on destroy', () => {
    host.mode.set('expanded');
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

  it('should go to chat when contracting from compact or invisible', () => {
    component.mode.set('compact');
    (
      component as unknown as { handleExpandOrContract: () => void }
    ).handleExpandOrContract();
    expect(component.mode()).toBe('chat');

    component.mode.set('invisible');
    (
      component as unknown as { handleExpandOrContract: () => void }
    ).handleExpandOrContract();
    expect(component.mode()).toBe('chat');
  });

  it('should go to compact when contracting from chat and the last non-chat mode was not invisible', () => {
    component.mode.set('chat');
    (component as unknown as { handleMinimize: () => void }).handleMinimize();
    expect(component.mode()).toBe('compact');
  });

  it('should go back to invisible when contracting from chat after tracking invisible as the last non-chat mode', () => {
    component.mode.set('invisible');
    fixture.detectChanges();

    component.mode.set('chat');
    (component as unknown as { handleMinimize: () => void }).handleMinimize();

    expect(component.mode()).toBe('invisible');
  });

  it('should go to chat when expanding', () => {
    component.mode.set('expanded');
    (
      component as unknown as { handleExpandOrContract: () => void }
    ).handleExpandOrContract();
    expect(component.mode()).toBe('chat');
  });
});
