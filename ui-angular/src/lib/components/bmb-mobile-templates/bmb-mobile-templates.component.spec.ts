import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BmbMobileTemplatesComponent } from './bmb-mobile-templates.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';

describe('BmbMobileTemplatesComponent', () => {
  let component: BmbMobileTemplatesComponent;
  let fixture: ComponentFixture<BmbMobileTemplatesComponent>;
  let componentRef: ComponentRef<BmbMobileTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbMobileTemplatesComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test template inputs
  it('should set template input correctly', () => {
    componentRef.setInput('template', 'header-with-footer');
    fixture.detectChanges();
    expect(component.getSectionClass()).toContain(
      'bmb_mobile-template-header-with-footer',
    );
  });

  // Test external link inputs
  it('should set external link inputs correctly', () => {
    componentRef.setInput('template', 'external-link');
    componentRef.setInput('componentTitle', 'External Link Title');
    componentRef.setInput('buttonList', { subtitle: 'External Link Subtitle' });
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.bmb_external-link')),
    ).toBeTruthy();
  });

  describe('handleLeftClick / handleRightClick', () => {
    it('should emit onHeaderLeftClick', () => {
      const emitSpy = jest.spyOn(component.onHeaderLeftClick, 'emit');
      component.handleLeftClick('event-data');
      expect(emitSpy).toHaveBeenCalledWith('event-data');
    });

    it('should emit onHeaderRightClick', () => {
      const emitSpy = jest.spyOn(component.onHeaderRightClick, 'emit');
      component.handleRightClick('event-data');
      expect(emitSpy).toHaveBeenCalledWith('event-data');
    });
  });

  describe('handleAction', () => {
    it('should run the button action', () => {
      const actionSpy = jest.fn();
      component.handleAction({ action: actionSpy } as any);
      expect(actionSpy).toHaveBeenCalled();
    });
  });

  describe('handleLoginRequest', () => {
    it('should emit loginHandleRequest', () => {
      const emitSpy = jest.spyOn(component.loginHandleRequest, 'emit');
      component.handleLoginRequest('event-data');
      expect(emitSpy).toHaveBeenCalledWith('event-data');
    });
  });

  describe('handleClose', () => {
    it('should emit externalLinkOnClose', () => {
      const emitSpy = jest.spyOn(component.externalLinkOnClose, 'emit');
      component.handleClose('event-data');
      expect(emitSpy).toHaveBeenCalledWith('event-data');
    });
  });

  describe('handleMenuEvent', () => {
    it('should emit externalLinkMenuEvent', () => {
      const emitSpy = jest.spyOn(component.externalLinkMenuEvent, 'emit');
      component.handleMenuEvent('link');
      expect(emitSpy).toHaveBeenCalledWith('link');
    });
  });

  describe('handleFooterEvent', () => {
    it('should emit externalLinkFooterEvent', () => {
      const emitSpy = jest.spyOn(component.externalLinkFooterEvent, 'emit');
      component.handleFooterEvent('back');
      expect(emitSpy).toHaveBeenCalledWith('back');
    });
  });

  describe('getSectionClass', () => {
    it('should default to single-header', () => {
      expect(component.getSectionClass()).toEqual([
        'bmb_mobile-template',
        'bmb_mobile-template-single-header',
      ]);
    });
  });

  describe('ngOnInit', () => {
    it('should capture the window height', () => {
      expect(component.height).toBe(window.innerHeight);
    });
  });
});
