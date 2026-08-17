import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbLogoComponent } from './bmb-logo.component';

describe('BmbLogoComponent', () => {
  let component: BmbLogoComponent;
  let fixture: ComponentFixture<BmbLogoComponent>;
  let componentRef: ComponentRef<BmbLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLogoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbLogoComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all inputs', () => {
    componentRef.setInput('size', 'large');
    componentRef.setInput('image', '/assets/images/tec-logo.svg');
    componentRef.setInput('altImage', 'Logo Tec');
    componentRef.setInput('link', 'https://tec.mx');
    componentRef.setInput('target', '_blank');
    componentRef.setInput('buttonName', 'tec-logo');
    fixture.detectChanges();

    const image: HTMLImageElement | null =
      fixture.nativeElement.querySelector('img');
    expect(component.getClasses()).toContain('bmb_logo-large');
    expect(image?.getAttribute('src')).toBe('/assets/images/tec-logo.svg');
    expect(image?.getAttribute('alt')).toBe('Logo Tec');
  });

  it('should emit interaction events', () => {
    const clickSpy = jest.spyOn(component.buttonClick, 'emit');
    const pressSpy = jest.spyOn(component.buttonPress, 'emit');
    const keySpy = jest.spyOn(component.buttonKeyPress, 'emit');

    component.handleClick(new MouseEvent('click'));
    component.handlePress(new MouseEvent('mousedown'));
    component.handleKeyPress(new KeyboardEvent('keypress'));

    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(pressSpy).toHaveBeenCalledTimes(1);
    expect(keySpy).toHaveBeenCalledTimes(1);
  });
});
