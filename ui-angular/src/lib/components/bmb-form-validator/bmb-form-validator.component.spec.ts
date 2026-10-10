import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { BmbFormValidatorComponent } from './bmb-form-validator.component';
import { BmbRadialComponent } from '../bmb-radial/bmb-radial.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [BmbFormValidatorComponent, BmbRadialComponent],
  template: `
    <bmb-form-validator>
      <bmb-radial name="controlledGroup" value="A" [checked]="true" />
      <bmb-radial name="controlledGroup" value="B" />
    </bmb-form-validator>
  `,
})
class ControlledRadialsHostComponent {}

@Component({
  standalone: true,
  imports: [BmbFormValidatorComponent, BmbRadialComponent],
  template: `
    <bmb-form-validator>
      <bmb-radial
        name="uncontrolledGroup"
        value="C"
        [checked]="true"
        [control]="null!"
      />
      <bmb-radial name="uncontrolledGroup" value="D" />
    </bmb-form-validator>
  `,
})
class UncontrolledRadialsHostComponent {}

describe('BmbFormValidatorComponent', () => {
  let component: BmbFormValidatorComponent;
  let fixture: ComponentFixture<BmbFormValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, BmbFormValidatorComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(BmbFormValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a control', () => {
    const control = new FormControl('test');
    component.addControl('testControl', control, false);
    expect(component.getFormControl('testControl')).toBe(control);
  });

  it('should emit formGroupState on submit', () => {
    jest.spyOn(component.formGroupState, 'emit');
    component.onSubmit();
    expect(component.formGroupState.emit).toHaveBeenCalledWith(
      component.formGroup(),
    );
  });

  it('should update error state', () => {
    const control = new FormControl('test');
    component.addControl('testControl', control, false);
    expect(() => component.updateErrorState()).not.toThrow();
  });

  it('should get form control by name', () => {
    const control = new FormControl('value');
    component.addControl('myControl', control, false);
    expect(component.getFormControl('myControl')).toBe(control);
  });

  it('should replace the control when the existing one is marked as null', () => {
    const originalControl = new FormControl('original');
    component.addControl('duplicateControl', originalControl, false);

    const replacementControl = new FormControl('replacement');
    component.addControl('duplicateControl', replacementControl, true);

    expect(component.getFormControl('duplicateControl')).toBe(
      replacementControl,
    );
  });

  it('should keep the existing control when the duplicate is not marked as null', () => {
    const originalControl = new FormControl('original');
    component.addControl('duplicateControl', originalControl, false);

    const replacementControl = new FormControl('replacement');
    component.addControl('duplicateControl', replacementControl, false);

    expect(component.getFormControl('duplicateControl')).toBe(
      originalControl,
    );
  });

  it('should not throw when there are no radials', () => {
    expect(() => component.addRadials()).not.toThrow();
  });

  describe('addRadials', () => {
    it('should assign the checked radial control to the whole group when every radial is controlled', async () => {
      const hostFixture = TestBed.createComponent(
        ControlledRadialsHostComponent,
      );
      hostFixture.detectChanges();
      await hostFixture.whenStable();

      const formValidatorDebugElement = hostFixture.debugElement.children[0];
      const formValidator: BmbFormValidatorComponent =
        formValidatorDebugElement.componentInstance;

      formValidator.addRadials();

      const control = formValidator.getFormControl('controlledGroup');
      expect(control).toBeTruthy();
      expect(control.value).toBe('A');
    });

    it('should generate and sync a shared control when radials are not controlled', async () => {
      const hostFixture = TestBed.createComponent(
        UncontrolledRadialsHostComponent,
      );
      hostFixture.detectChanges();
      await hostFixture.whenStable();

      const formValidatorDebugElement = hostFixture.debugElement.children[0];
      const formValidator: BmbFormValidatorComponent =
        formValidatorDebugElement.componentInstance;
      const radials = formValidator.bmbRadials();

      formValidator.addRadials();

      const control = formValidator.getFormControl('uncontrolledGroup');
      expect(control).toBeTruthy();
      expect(control.value).toBe('C');
      expect(radials[1].control()).toBe(control);
    });
  });
});
