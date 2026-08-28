import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbBotIconComponent } from './bmb-bot-icon.component';

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

  it('should resolve the SVG identifier from an image path', () => {
    componentRef.setInput('iconName', '/assets/icons/bot_tecGPT.svg');

    expect(component.SVGName).toBe('bot_tecGPT');
  });

  it('should resolve the SVG identifier from a file name', () => {
    componentRef.setInput('iconName', 'bot_tecGPT.svg');

    expect(component.SVGName).toBe('bot_tecGPT');
  });

  it('should preserve a built-in icon name and render its SVG', () => {
    componentRef.setInput('iconName', 'bot_tecGPT');
    fixture.detectChanges();

    expect(component.SVGName).toBe('bot_tecGPT');
    expect(fixture.nativeElement.querySelector('svg')).not.toBeNull();
  });

  it('should preserve an unknown non-image name without rendering an SVG', () => {
    componentRef.setInput('iconName', 'custom-bot');
    fixture.detectChanges();

    expect(component.SVGName).toBe('custom-bot');
    expect(fixture.nativeElement.querySelector('svg')).toBeNull();
  });
});
