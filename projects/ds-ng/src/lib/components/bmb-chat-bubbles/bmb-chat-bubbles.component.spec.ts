import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbChatBubblesComponent } from './bmb-chat-bubbles.component';

describe('BmbChatBubblesComponent', () => {
  let component: BmbChatBubblesComponent;
  let fixture: ComponentFixture<BmbChatBubblesComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbChatBubblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
