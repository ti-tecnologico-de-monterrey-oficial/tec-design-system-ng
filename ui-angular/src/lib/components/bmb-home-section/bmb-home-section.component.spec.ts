import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbHomeSectionComponent } from './bmb-home-section.component';

describe('BmbHomeSectionComponent', () => {
  let component: BmbHomeSectionComponent;
  let fixture: ComponentFixture<BmbHomeSectionComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbHomeSectionComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should warn when using the deprecated title input without componentTitle', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

    fixture.componentRef.setInput('title', 'Deprecated title');
    fixture.detectChanges();

    expect(warnSpy).toHaveBeenCalledWith(
      'The "title" input is deprecated and will be removed in future versions. Please use "componentTitle" instead.',
    );

    warnSpy.mockRestore();
  });

  it('should not warn when only componentTitle is used', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

    fixture.componentRef.setInput('componentTitle', 'Section name');
    fixture.detectChanges();

    expect(warnSpy).not.toHaveBeenCalled();

    warnSpy.mockRestore();
  });
});

