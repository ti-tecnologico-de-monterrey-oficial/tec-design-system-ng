import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BmbExternalLinkComponent,
  IBmbMenuEvent,
} from './bmb-external-link.component';
import { ComponentRef, ElementRef } from '@angular/core';
import { IBmbFooterEvent } from '../bmb-bottom-navigation-bar/bmb-bottom-navigation-bar.component';
import { BmbProjectionContentService } from '../../services/projection.service';

describe('BmbExternalLinkComponent', () => {
  let component: BmbExternalLinkComponent;
  let fixture: ComponentFixture<BmbExternalLinkComponent>;
  let componentRef: ComponentRef<BmbExternalLinkComponent>;
  let projectionService: BmbProjectionContentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbExternalLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbExternalLinkComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('title', 'Test Title');
    componentRef.setInput('subtitle', 'https://www.example.com');
    projectionService = TestBed.inject(BmbProjectionContentService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClose event when handleClose is called', () => {
    spyOn(component.onClose, 'emit');
    const event = { some: 'data' };
    component.handleClose(event);
    expect(component.onClose.emit).toHaveBeenCalledWith(event);
  });

  it('should emit menuEvent on menu option click', () => {
    spyOn(component.menuEvent, 'emit');
    const event: IBmbMenuEvent = 'link';
    component.onMenuOptionClick(event);
    expect(component.menuEvent.emit).toHaveBeenCalledWith(event);
  });

  it('should emit footerEvent on footer option click', () => {
    spyOn(component.footerEvent, 'emit');
    const event: IBmbFooterEvent = 'back';
    component.onFooterOptionClick(event);
    expect(component.footerEvent.emit).toHaveBeenCalledWith(event);
  });

  it('should return "lock" icon if subtitle is an external link', () => {
    componentRef.setInput('subtitle', 'https://external.com');
    expect(component.getSubtitleIcon()).toBe('lock');
  });

  it('should return true for getSubtitleIcon if subtitle is a URL', () => {
    componentRef.setInput('subtitle', 'https://www.example.com');
    fixture.detectChanges();
    expect(component.getSubtitleIcon()).toBe('lock');
  });

  it('should return empty string if subtitle is not an external link', () => {
    componentRef.setInput('subtitle', 'internal-page');
    expect(component.getSubtitleIcon()).toBe('');
  });

  it('should return false for getSubtitleIcon if subtitle is not a URL', () => {
    componentRef.setInput('subtitle', 'Not a URL');
    fixture.detectChanges();
    expect(component.getSubtitleIcon()).toBe('');
  });

  it('should call projectionService.openContent when handleOpenMenu is called', () => {
    const openContentSpy = spyOn(projectionService, 'openContent');
    // Mock contentRef
    component.contentRef = {
      nativeElement: document.createElement('div'),
    } as ElementRef;
    component.handleOpenMenu();
    expect(openContentSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        content: jasmine.any(Function),
        targetRef: component.contentRef.nativeElement,
        inputContext: { items: component.menuItems },
        showBackdrop: false,
      }),
    );
  });

  it('should have correct default navigationBarIcons', () => {
    expect(component.navigationBarIcons()).toEqual({
      one: { name: 'arrow_back_ios', label: '' },
      two: { name: 'arrow_forward_ios', label: '' },
      three: { name: 'share', label: '' },
      four: { name: 'refresh', label: '' },
    });
  });

  it('should call menu item actions', () => {
    const spy = spyOn(component, 'onMenuOptionClick');
    component.menuItems.forEach((item) => {
      if (item?.action) {
        item.action();
      }
    });
    expect(spy).toHaveBeenCalledTimes(component.menuItems.length);
  });
});
