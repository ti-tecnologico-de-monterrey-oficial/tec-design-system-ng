import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BmbExternalLinkComponent,
  IBmbMenuEvent,
} from './bmb-external-link.component';
import { ComponentRef } from '@angular/core';
import { IBmbFooterEvent } from '../bmb-bottom-navigation-bar/bmb-bottom-navigation-bar.component';

describe('BmbExternalLinkComponent', () => {
  let component: BmbExternalLinkComponent;
  let fixture: ComponentFixture<BmbExternalLinkComponent>;
  let componentRef: ComponentRef<BmbExternalLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbExternalLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbExternalLinkComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('title', 'Test Title');
    componentRef.setInput('subtitle', 'https://www.example.com');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the provided title', () => {
    componentRef.setInput('title', 'Test Title');
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector(
      'span.bmb_chevron-content-title',
    );
    expect(titleElement.textContent).toBe('Test Title');
  });

  it('should display the provided subtitle', () => {
    componentRef.setInput('subtitle', 'Test subtitle');
    fixture.detectChanges();
    const subtitleElement = fixture.nativeElement.querySelector(
      'span.bmb_chevron-content-subtitle',
    );
    expect(subtitleElement.textContent.trim()).toBe('Test subtitle');
  });

  it('should emit onClose event when handleClose is called', () => {
    spyOn(component.onClose, 'emit');
    const event = { some: 'data' };
    component.handleClose(event);
    expect(component.onClose.emit).toHaveBeenCalledWith(event);
  });

  it('should toggle showMenu when handleOpenMenu is called', () => {
    expect(component.showMenu).toBeFalse();
    component.handleOpenMenu();
    expect(component.showMenu).toBeTrue();
    component.handleOpenMenu();
    expect(component.showMenu).toBeFalse();
  });

  it('should emit menuEvent on menu option click', () => {
    spyOn(component.menuEvent, 'emit');
    const event: IBmbMenuEvent = 'link';
    component.onMenuOptionClick(event);
    expect(component.menuEvent.emit).toHaveBeenCalledWith(event);
    expect(component.showMenu).toBeFalse();
  });

  it('should emit footerEvent on footer option click', () => {
    spyOn(component.footerEvent, 'emit');
    const event: IBmbFooterEvent = 'back';
    component.onFooterOptionClick(event);
    expect(component.footerEvent.emit).toHaveBeenCalledWith(event);
  });

  it('should return true for isIconSubtitle if subtitle is a URL', () => {
    componentRef.setInput('subtitle', 'https://www.example.com');
    fixture.detectChanges();
    expect(component.isIconSubtitle()).toBeTrue();
  });

  it('should return false for isIconSubtitle if subtitle is not a URL', () => {
    componentRef.setInput('subtitle', 'Not a URL');
    fixture.detectChanges();
    expect(component.isIconSubtitle()).toBeFalse();
  });
});
