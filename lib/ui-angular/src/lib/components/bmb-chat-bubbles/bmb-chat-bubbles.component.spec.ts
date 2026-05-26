import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbChatBubblesComponent } from './bmb-chat-bubbles.component';
import { ComponentRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

describe('BmbChatBubblesComponent', () => {
  let component: BmbChatBubblesComponent;
  let fixture: ComponentFixture<BmbChatBubblesComponent>;
  let componentRef: ComponentRef<BmbChatBubblesComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbChatBubblesComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('message', {
      userProfile: 'userProfile',
      isUserMessage: true,
      type: 'text',
      content: { text: 'content' },
      time: new Date(),
      loading: false,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
