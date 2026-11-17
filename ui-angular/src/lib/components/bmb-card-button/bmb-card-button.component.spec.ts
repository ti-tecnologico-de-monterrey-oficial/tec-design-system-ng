import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { BmbCardButtonComponent } from './bmb-card-button.component';

describe('BmbCardButtonComponent', () => {
  let component: BmbCardButtonComponent;
  let fixture: ComponentFixture<BmbCardButtonComponent>;
  let componentRef: ComponentRef<BmbCardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCardButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbCardButtonComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('componentTitle', 'Test Title');
    componentRef.setInput('body', 'Test Body');
    componentRef.setInput('icon', 'test-icon');
    componentRef.setInput('isFullInteractive', true);
    componentRef.setInput('leftContentIcon', 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const titleElement = fixture.nativeElement.querySelector(
      '.bmb_card_button-header-text',
    );
    expect(titleElement.textContent).toBe(' Test Title ');
  });

  it('should render body', () => {
    const bodyElement = fixture.nativeElement.querySelector(
      '.bmb_card_button-body',
    );
    expect(bodyElement.textContent).toBe(' Test Body ');
  });

  it('should render icon', () => {
    const iconElement = fixture.nativeElement.querySelector(
      '.bmb_card_button-header-icon',
    );
    expect(iconElement).toBeTruthy();
  });

  it('should render in full interactive mode', () => {
    const wrapperElement = fixture.nativeElement.querySelector(
      '.bmb_card_button-wrapper',
    );
    expect(wrapperElement).toBeTruthy();
  });

  it('should render in add content mode', () => {
    componentRef.setInput('isFullInteractive', false);
    fixture.detectChanges();
    const addContentElement = fixture.nativeElement.querySelector(
      '.bmb_card_button-add',
    );
    expect(addContentElement).toBeTruthy();
  });

  describe('truncateText', () => {
    it('should truncate text longer than maxLength', () => {
      expect(component.truncateText('abcdefgh', 4)).toBe('abcd...');
    });

    it('should return the text unchanged when within maxLength', () => {
      expect(component.truncateText('abc', 4)).toBe('abc');
    });
  });

  describe('handleAddContent', () => {
    it('should emit when not fully interactive', () => {
      componentRef.setInput('isFullInteractive', false);
      fixture.detectChanges();
      const emitSpy = jest.spyOn(component.onAddContentClick, 'emit');
      const event = new MouseEvent('click');

      component.handleAddContent(event);

      expect(emitSpy).toHaveBeenCalledWith(event);
    });

    it('should emit when fully interactive with a left content image and no icon or textLink', () => {
      componentRef.setInput('isFullInteractive', true);
      componentRef.setInput('leftContent', true);
      componentRef.setInput('leftContentIcon', '');
      componentRef.setInput('leftContentImage', { src: 'img.png' });
      componentRef.setInput('textLink', undefined);
      fixture.detectChanges();
      const emitSpy = jest.spyOn(component.onAddContentClick, 'emit');
      const event = new MouseEvent('click');

      component.handleAddContent(event);

      expect(emitSpy).toHaveBeenCalledWith(event);
    });

    it('should not emit when fully interactive without a left content image', () => {
      componentRef.setInput('isFullInteractive', true);
      componentRef.setInput('leftContent', false);
      fixture.detectChanges();
      const emitSpy = jest.spyOn(component.onAddContentClick, 'emit');

      component.handleAddContent(new MouseEvent('click'));

      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  describe('handleTitleClick', () => {
    it('should emit onTitleClick', () => {
      const emitSpy = jest.spyOn(component.onTitleClick, 'emit');
      const event = new MouseEvent('click');

      component.handleTitleClick(event);

      expect(emitSpy).toHaveBeenCalledWith(event);
    });
  });

  describe('handleSmallClick', () => {
    it('should toggle isFlipped and emit onSmallClick', () => {
      const emitSpy = jest.spyOn(component.onSmallClick, 'emit');
      const event = new MouseEvent('click');

      component.handleSmallClick(event);

      expect(component.isFlipped).toBe(true);
      expect(emitSpy).toHaveBeenCalledWith(event);

      component.handleSmallClick(event);
      expect(component.isFlipped).toBe(false);
    });
  });

  describe('isABotTemplate', () => {
    it('should delegate to the shared bot icon check', () => {
      expect(component.isABotTemplate('bot_tecGPT')).toBe(true);
      expect(component.isABotTemplate('home')).toBe(false);
    });
  });
});
