import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTagComponent } from './bmb-tags.component';
import { ComponentRef } from '@angular/core';

describe('BmbTagComponent', () => {
  let component: BmbTagComponent;
  let fixture: ComponentFixture<BmbTagComponent>;
  let componentRef: ComponentRef<BmbTagComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbTagComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not apply badge class when appearance is not provided', () => {
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const badgeElement = element.querySelector('.bmb_tag');

    expect(badgeElement?.classList).not.toContain('bmb_tag-');
  });

  it('should display text inside the badge', () => {
    componentRef.setInput('text', 'Sample Text');
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const textElement = element.querySelector('.bmb_tag span');

    expect(textElement?.textContent).toContain('Sample Text');
  });

  it('should respect isActive when enableClick is true', () => {
    componentRef.setInput('text', 'Escuela');
    componentRef.setInput('enableClick', true);
    componentRef.setInput('isActive', true);
    fixture.detectChanges();

    const button: HTMLElement | null =
      fixture.nativeElement.querySelector('button');
    expect(button?.classList).toContain('bmb_tag-active');

    componentRef.setInput('isActive', false);
    fixture.detectChanges();

    expect(button?.classList).not.toContain('bmb_tag-active');
  });

  it('should emit clickedTag without toggling local active state', () => {
    componentRef.setInput('text', 'Depto');
    componentRef.setInput('enableClick', true);
    componentRef.setInput('isActive', true);
    fixture.detectChanges();

    const emitSpy = jest.spyOn(component.clickedTag, 'emit');
    component.clickTag('Depto');

    expect(emitSpy).toHaveBeenCalledWith('Depto');
    expect(component.getClasses()).toContain('bmb_tag-active');
  });
});
