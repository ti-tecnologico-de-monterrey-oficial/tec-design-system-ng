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

  it('should return true for getSubtitleIcon if subtitle is a URL', () => {
    componentRef.setInput('subtitle', 'https://www.example.com');
    fixture.detectChanges();
    expect(component.getSubtitleIcon()).toBe('lock');
  });

  it('should return false for getSubtitleIcon if subtitle is not a URL', () => {
    componentRef.setInput('subtitle', 'Not a URL');
    fixture.detectChanges();
    expect(component.getSubtitleIcon()).toBe('');
  });
});
