import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbCheckExternalLinkButtonComponent } from './bmb-check-external-link-button.component';
import { ComponentRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('BmbCheckExternalLinkButtonComponent', () => {
  let component: BmbCheckExternalLinkButtonComponent;
  let fixture: ComponentFixture<BmbCheckExternalLinkButtonComponent>;
  let componentRef: ComponentRef<BmbCheckExternalLinkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCheckExternalLinkButtonComponent],
      providers: [provideRouter([])],
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
    componentRef.setInput('link', 'https://external.com');
    fixture.detectChanges();
    const anchor = fixture.nativeElement.querySelector('a');
    expect(anchor).toBeTruthy();
    expect(anchor.href).toBe('https://external.com/');
  });

  it('should show an Angular router link for an internal link', () => {
    componentRef.setInput('link', '/internal');
    fixture.detectChanges();
    const anchor = fixture.nativeElement.querySelector('a');
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('href')).toBe('/internal');
  });

  it('should emit buttonClick event when button is clicked', () => {
    componentRef.setInput('link', '');
    fixture.detectChanges();
    jest.spyOn(component.buttonClick, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.buttonClick.emit).toHaveBeenCalled();
  });

  it('should set target to _blank for external links', () => {
    componentRef.setInput('link', 'https://external.com');
    componentRef.setInput('target', '_self');
    fixture.detectChanges();
    const anchor = fixture.nativeElement.querySelector('a');
    expect(anchor).toBeTruthy();
    expect(anchor.target).toBe('_self');
  });

  it('should disable the button', () => {
    componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
    expect(button.classList).toContain(
      'bmb_check-external-link-button-element-disabled',
    );
  });

  it('should emit press and keyboard events', () => {
    const press = jest.spyOn(component.buttonPress, 'emit');
    const keyPress = jest.spyOn(component.buttonKeyPress, 'emit');
    const button = fixture.nativeElement.querySelector('button');

    button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    button.dispatchEvent(
      new KeyboardEvent('keypress', { key: 'Enter', bubbles: true }),
    );

    expect(press).toHaveBeenCalled();
    expect(keyPress).toHaveBeenCalled();
  });
});
