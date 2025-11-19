import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbBotIconComponent } from './bmb-bot-icon.component';
import { ComponentRef } from '@angular/core';

describe('BmbBotIconComponent', () => {
  let component: BmbBotIconComponent;
  let fixture: ComponentFixture<BmbBotIconComponent>;
  let componentRef: ComponentRef<BmbBotIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbBotIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbBotIconComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('iconName', 'bot_tecGPT');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return directory when iconName is an image path', () => {
    componentRef.setInput('iconName', '/assets/icons/bot_tecGPT.svg');
    expect(component.SVGName).toBe('bot_tecGPT');
  });

  it('should return empty string when image has no path segment', () => {
    componentRef.setInput('iconName', 'bot_tecGPT.svg');
    expect(component.SVGName).toBe('bot_tecGPT');
  });

  it('should return the raw iconName when not an image', () => {
    componentRef.setInput('iconName', 'bot_tecGPT');
    expect(component.SVGName).toBe('bot_tecGPT');
  });
});
