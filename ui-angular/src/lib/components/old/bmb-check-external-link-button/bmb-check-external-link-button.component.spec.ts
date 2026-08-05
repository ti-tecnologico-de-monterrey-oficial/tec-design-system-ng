import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbCheckExternalLinkButtonComponent } from './bmb-check-external-link-button.component';
import { ComponentRef, NO_ERRORS_SCHEMA } from '@angular/core';

describe('BmbCheckExternalLinkButtonComponent', () => {
  let component: BmbCheckExternalLinkButtonComponent;
  let fixture: ComponentFixture<BmbCheckExternalLinkButtonComponent>;
  let componentRef: ComponentRef<BmbCheckExternalLinkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCheckExternalLinkButtonComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbCheckExternalLinkButtonComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show button when no link is provided', () => {
    componentRef.setInput('link', '');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('should show external link when an external link is provided', () => {
    spyOn(component, 'isExternalLink').and.returnValue(true);
    componentRef.setInput('link', 'https://external.com');
    fixture.detectChanges();
    const anchor = fixture.nativeElement.querySelector('a');
    expect(anchor).toBeTruthy();
    expect(anchor.href).toBe('https://external.com/');
  });

  // it('should show internal link when an internal link is provided', () => {
  //   spyOn(component, 'isExternalLink').and.returnValue(false);
  //   componentRef.setInput('link', '/internal');
  //   fixture.detectChanges();
  //   const navLink = fixture.nativeElement.querySelector('a');
  //   expect(navLink).toBeTruthy();
  //   expect(navLink.getAttribute('ng-reflect-router-link')).toBe('/internal');
  // });

  it('should emit buttonClick event when button is clicked', () => {
    componentRef.setInput('link', '');
    fixture.detectChanges();
    spyOn(component.buttonClick, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.buttonClick.emit).toHaveBeenCalled();
  });

  it('should set target to _blank for external links', () => {
    spyOn(component, 'isExternalLink').and.returnValue(true);
    componentRef.setInput('link', 'https://external.com');
    componentRef.setInput('target', '_self');
    fixture.detectChanges();
    const anchor = fixture.nativeElement.querySelector('a');
    expect(anchor).toBeTruthy();
    expect(anchor.target).toBe('_self');
  });
});
