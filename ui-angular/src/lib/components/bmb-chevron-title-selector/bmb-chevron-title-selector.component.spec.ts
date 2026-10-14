import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbChevronTitleSelectorComponent } from './bmb-chevron-title-selector.component';
import { ComponentRef } from '@angular/core';

describe('BmbChevronTitleSelectorComponent', () => {
  let component: BmbChevronTitleSelectorComponent;
  let fixture: ComponentFixture<BmbChevronTitleSelectorComponent>;
  let componentRef: ComponentRef<BmbChevronTitleSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BmbChevronTitleSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbChevronTitleSelectorComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('title', 'Test Title');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have required title input', () => {
    fixture.detectChanges();
    expect(componentRef.instance.title()).toBe('Test Title');
  });

  it('should have default values for optional inputs', () => {
    expect(componentRef.instance.iconSubtitle()).toBe('');
    expect(componentRef.instance.leadingIcon()).toBe('');
    expect(componentRef.instance.trailingIcon()).toBe('');
  });

  it('should emit onLeadingClick on handleLeadingClick', () => {
    jest.spyOn(component.onLeadingClick, 'emit');
    const event = new MouseEvent('click');

    component.handleLeadingClick(event);

    expect(component.onLeadingClick.emit).toHaveBeenCalledWith(event);
  });

  it('should emit onTrailingClick on handleTrailingClick', () => {
    jest.spyOn(component.onTrailingClick, 'emit');
    const event = new MouseEvent('click');

    component.handleTrailingClick(event);

    expect(component.onTrailingClick.emit).toHaveBeenCalledWith(event);
  });

  it('should throw when neither title nor componentTitle is provided', () => {
    const freshFixture = TestBed.createComponent(
      BmbChevronTitleSelectorComponent,
    );

    expect(() => freshFixture.detectChanges()).toThrow(
      'The "componentTitle" input is required. Please provide a value for it.',
    );
  });
});
