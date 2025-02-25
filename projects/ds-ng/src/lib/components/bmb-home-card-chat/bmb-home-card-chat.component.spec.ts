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
    componentRef.setInput('messagesHistory', 
      [
        {      
          type: 'text',
          content: { text: 'Hola, ¿cómo estás? En que puedo ayudarte' },
          isUserMessage: false,
          time: new Date('2025-02-19T14:31:00'),
        },
      ]
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
