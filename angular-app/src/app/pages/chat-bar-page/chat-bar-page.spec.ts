import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('records outputs emitted by the chat bar', () => {
    component.handleSendMessage('hola');
    expect(component.lastEvent()).toBe('onSendMessage: hola');

    component.handleRecord(true);
    expect(component.lastEvent()).toBe('onRecord: true');

    component.handleEmoji(true);
    expect(component.lastEvent()).toBe('onEmoji: true');

    component.handleCurrentBotChange({ name: 'ChatGPT', icon: 'bot_chatGPT' });
    expect(component.currentBot()?.name).toBe('ChatGPT');
  });
});
