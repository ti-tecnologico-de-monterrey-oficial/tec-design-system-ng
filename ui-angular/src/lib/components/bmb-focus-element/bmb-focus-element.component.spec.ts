import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbFocusElementComponent } from './bmb-focus-element.component';

describe('BmbFocusElementComponent', () => {
  let component: BmbFocusElementComponent;
  let fixture: ComponentFixture<BmbFocusElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbFocusElementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbFocusElementComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the inherited background class when isInheritedBg is true', () => {
    fixture.componentRef.setInput('isInheritedBg', true);
    fixture.detectChanges();

    expect(component.getBackgroundClass()).toBe(
      'bmb_focus-element-inherited_bg',
    );
  });

  it('should use the normal background class by default', () => {
    fixture.detectChanges();

    expect(component.getBackgroundClass()).toBe('bmb_focus-element-normal_bg');
  });

  it('should add the container size class when isContainerSize is true', () => {
    fixture.componentRef.setInput('isContainerSize', true);
    fixture.detectChanges();

    expect(component.getCircleClass()).toContain(
      'bmb_focus-element-circle-container',
    );
  });

  it('should return the non-focused circle class when isNonFocused is true', () => {
    fixture.componentRef.setInput('isNonFocused', true);
    fixture.detectChanges();

    expect(component.getCircleClass()).toContain(
      'bmb_focus-element-non_focused',
    );
  });

  it('should return the normal circle class when isNormal is true', () => {
    fixture.componentRef.setInput('isNormal', true);
    fixture.detectChanges();

    expect(component.getCircleClass()).toContain(
      'bmb_focus-element-normal_circle',
    );
  });

  it('should return the focused circle class by default', () => {
    fixture.detectChanges();

    expect(component.getCircleClass()).toContain(
      'bmb_focus-element-circle_focused',
    );
  });

  it('should report isFocused as false when isNonFocused or isNormal is true', () => {
    fixture.detectChanges();
    expect(component.isFocused()).toBe(true);

    fixture.componentRef.setInput('isNonFocused', true);
    fixture.detectChanges();
    expect(component.isFocused()).toBe(false);

    fixture.componentRef.setInput('isNonFocused', false);
    fixture.componentRef.setInput('isNormal', true);
    fixture.detectChanges();
    expect(component.isFocused()).toBe(false);
  });
});
