import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BmbChatBarComponent } from 'ui-angular';
import { PropertyPlayground } from '../migration/property-playground/property-playground';
import { ChatBarPage } from './chat-bar-page';

describe('ChatBarPage', () => {
  let component: ChatBarPage;
  let fixture: ComponentFixture<ChatBarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBarPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatBarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('records outputs emitted by the chat bar', () => {
    const playground = fixture.debugElement.query(
      By.directive(PropertyPlayground),
    ).componentInstance as PropertyPlayground;
    const chat = playground.outlet()?.componentInstance as BmbChatBarComponent;
    chat.onSendMessage.emit('hola');
    chat.onRecord.emit(true);
    chat.onEmoji.emit(true);
    chat.currentBot.set({ name: 'ChatGPT', icon: 'bot_chatGPT' });
    expect(playground.events()).toEqual(
      expect.arrayContaining([
        { name: 'onSendMessage', payload: '"hola"' },
        { name: 'onRecord', payload: 'true' },
        { name: 'onEmoji', payload: 'true' },
      ]),
    );
    expect(playground.drafts()['currentBot']).toContain('ChatGPT');
  });
});
