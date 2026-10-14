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

  it('should expand a floating chat to expanded mode', () => {
    component.mode.set('chat');
    (
      component as unknown as { handleExpandOrContract: () => void }
    ).handleExpandOrContract();
    expect(component.mode()).toBe('expanded');
  });

  it('should expand a floating chat even when it was opened from invisible mode', () => {
    component.mode.set('invisible');
    fixture.detectChanges();

    component.mode.set('chat');
    (
      component as unknown as { handleExpandOrContract: () => void }
    ).handleExpandOrContract();

    expect(component.mode()).toBe('expanded');
  });

  it('should go to chat when collapsing an expanded card', () => {
    component.mode.set('expanded');
    (
      component as unknown as { handleExpandOrContract: () => void }
    ).handleExpandOrContract();
    expect(component.mode()).toBe('chat');
  });

  it('should keep the displayed expand/collapse icon consistent with its click action', () => {
    const header = fixture.debugElement.query(
      By.directive(BmbHomeCardHeaderComponent),
    );
    const collapse = header
      .queryAll(By.directive(BmbActionIconComponent))
      .find((button) => button.componentInstance.idElement() === 'expand')!;
    expect(header.componentInstance.isExpanded()).toBe(true);
    expect(collapse.componentInstance.getIcon()).toBe('zoom_in_map');
    collapse.nativeElement.querySelector('button').click();
    expect(component.mode()).toBe('chat');
    fixture.detectChanges();

    const calls = projection.openContent.mock.calls;
    const content = calls[calls.length - 1][0].content as TemplateRef<unknown>;
    const view = content.createEmbeddedView({});
    try {
      view.detectChanges();
      const root = view.rootNodes.find((node) => node.nodeType === 1);
      const chatHeader = getDebugNode(
        root.querySelector('bmb-home-card-header'),
      ) as DebugElement;
      const expand = chatHeader
        .queryAll(By.directive(BmbActionIconComponent))
        .find((button) => button.componentInstance.idElement() === 'expand')!;
      expect(chatHeader.componentInstance.isExpanded()).toBe(false);
      expect(expand.componentInstance.getIcon()).toBe('zoom_out_map');
      expand.nativeElement.querySelector('button').click();
      expect(component.mode()).toBe('expanded');
      fixture.detectChanges();
      expect(
        fixture.debugElement
          .query(By.directive(BmbHomeCardHeaderComponent))
          .componentInstance.isExpanded(),
      ).toBe(true);
    } finally {
      view.destroy();
    }
  });

  it.each(['compact', 'invisible'])(
    'should keep minimizing separate from expanding and return to %s',
    (previousMode) => {
      component.mode.set(previousMode as 'compact' | 'invisible');
      fixture.detectChanges();
      component.mode.set('chat');
      const minimize = component['headerActionList']().find(
        (action) => action.icon === 'minimize',
      )!;
      minimize.action?.(new MouseEvent('click'), minimize);
      expect(component.mode()).toBe(previousMode);
    },
  );
});
