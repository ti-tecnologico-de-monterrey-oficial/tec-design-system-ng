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
});
