import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  BmbAiChatBubbleComponent,
  BmbTabsComponent,
  BmbTranslationsService,
} from 'ui-angular';
import { AiChatBubblePage } from './ai-chat-bubble-page';

describe('AiChatBubblePage', () => {
  let fixture: ComponentFixture<AiChatBubblePage>;
  let page: AiChatBubblePage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiChatBubblePage],
      providers: [
        {
          provide: BmbTranslationsService,
          useValue: {
            getTranslationVersion: () => 0,
            getCurrentLanguage: () => 'es',
            translate: (key: string) => key,
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AiChatBubblePage);
    page = fixture.componentInstance;
    fixture.detectChanges();
  });

  it.each([
    [1, ['text', 'text', 'text', 'text']],
    [2, ['image', 'mixed']],
    [3, ['link', 'options']],
    [4, ['text', 'text', 'text']],
    [5, ['text', 'text', 'text', 'text']],
  ])('renders conversation tab %s', (id, types) => {
    const tab = page.tabs.find((tab) => tab.id === id)!;
    fixture.debugElement
      .query(By.directive(BmbTabsComponent))
      .componentInstance.selected.emit(tab);
    fixture.detectChanges();
    expect(page.activeTabId()).toBe(id);
    expect(
      fixture.debugElement
        .queryAll(By.directive(BmbAiChatBubbleComponent))
        .map(({ componentInstance }) => componentInstance.message().type),
    ).toEqual(types);
  });

  it('updates user avatars through the image selector', () => {
    const select: HTMLSelectElement =
      fixture.nativeElement.querySelector('select');
    select.value = page.userImageOptions[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(page.selectedUserImage()).toBe(select.value);
    expect(
      page
        .conversation()
        .filter((message) => message.isUser)
        .every((message) => message.userProfile === select.value),
    ).toBe(true);
  });

  it('updates optional user actions through the controls', () => {
    const controls = fixture.nativeElement.querySelectorAll(
      'input[type="checkbox"]',
    );
    controls[0].click();
    controls[1].click();
    fixture.detectChanges();
    expect(page.userActions()).toEqual([]);
  });

  it('applies message edits and removes the following conversation', () => {
    const previousMessage = page.conversation()[1];
    const editedMessage = {
      ...previousMessage,
      content: { text: 'Updated question' },
    };
    fixture.debugElement
      .queryAll(By.directive(BmbAiChatBubbleComponent))[1]
      .componentInstance.messageEdited.emit({ previousMessage, editedMessage });
    fixture.detectChanges();
    expect(page.conversation()).toHaveLength(2);
    expect(page.conversation()[1].content).toEqual({
      text: 'Updated question',
    });
    expect(page.conversationEvent()).toContain(previousMessage.id);
  });

  it('records bubble actions and cancelled edits', () => {
    const bubble = fixture.debugElement.query(
      By.directive(BmbAiChatBubbleComponent),
    ).componentInstance;
    const message = page.conversation()[0];
    bubble.getAction.emit({ action: 'copy', messageId: message.id, message });
    expect(page.conversationEvent()).toContain('copy');
    bubble.messageEditCancelled.emit(message);
    expect(page.conversationEvent()).toContain(message.id);
  });
});
