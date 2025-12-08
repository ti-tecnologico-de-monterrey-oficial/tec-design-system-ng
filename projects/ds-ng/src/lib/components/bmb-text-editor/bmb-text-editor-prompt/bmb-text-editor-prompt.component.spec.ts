import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BmbTextEditorPromptComponent } from './bmb-text-editor-prompt.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BmbTextEditorPromptComponent', () => {
  let component: BmbTextEditorPromptComponent;
  let fixture: ComponentFixture<BmbTextEditorPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTextEditorPromptComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmbTextEditorPromptComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('type', 'link');
    component.formGroup = new FormGroup({
      prompt_url: new FormControl(''),
      target: new FormControl('_self'),
      rel: new FormControl(false)
    });
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have required type input', () => {
      expect(component.type()).toBe('link');
    });

    it('should have formGroup property', () => {
      expect(component.formGroup).toBeInstanceOf(FormGroup);
    });
  });

  describe('Input Properties', () => {
    it('should accept "link" as type', () => {
      fixture.componentRef.setInput('type', 'link');
      expect(component.type()).toBe('link');
    });

    it('should accept "image" as type', () => {
      fixture.componentRef.setInput('type', 'image');
      expect(component.type()).toBe('image');
    });
  });

  describe('Form Controls', () => {
    it('should get form control by name', () => {
      const urlControl = component.getFormControl('prompt_url');
      expect(urlControl).toBeInstanceOf(FormControl);
    });

    it('should return form control with correct initial value', () => {
      const targetControl = component.getFormControl('target');
      expect(targetControl.value).toBe('_self');
    });
  });

  describe('Form Submission', () => {
    it('should emit form values when form is valid', () => {
      component.formGroup = new FormGroup({
        prompt_url: new FormControl('https://example.com', Validators.required),
        target: new FormControl('_blank')
      });

      const formValuesSpy = jasmine.createSpy('formValues');
      component.formValues.subscribe(formValuesSpy);

      component.handleFormGroupState();

      expect(formValuesSpy).toHaveBeenCalledWith({
        prompt_url: 'https://example.com',
        target: '_blank'
      });
    });

    it('should not emit form values when form is invalid', () => {
      component.formGroup = new FormGroup({
        prompt_url: new FormControl('', Validators.required),
        target: new FormControl('_blank')
      });

      const formValuesSpy = jasmine.createSpy('formValues');
      component.formValues.subscribe(formValuesSpy);

      component.handleFormGroupState();

      expect(formValuesSpy).not.toHaveBeenCalled();
    });
  });

  describe('Output Events', () => {
    it('should have formValues output', () => {
      expect(component.formValues).toBeDefined();
    });

    it('should have cancelForm output', () => {
      expect(component.cancelForm).toBeDefined();
    });

    it('should emit cancelForm when called', () => {
      const cancelFormSpy = jasmine.createSpy('cancelForm');
      component.cancelForm.subscribe(cancelFormSpy);

      component.cancelForm.emit();

      expect(cancelFormSpy).toHaveBeenCalled();
    });
  });

  describe('Form Validation Integration', () => {
    it('should work with form validation when form is valid', () => {
      component.formGroup = new FormGroup({
        prompt_url: new FormControl('https://valid-url.com', Validators.required)
      });

      const formValuesSpy = jasmine.createSpy('formValues');
      component.formValues.subscribe(formValuesSpy);

      component.handleFormGroupState();

      expect(formValuesSpy).toHaveBeenCalledWith({
        prompt_url: 'https://valid-url.com'
      });
    });

    it('should not emit when form has validation errors', () => {
      component.formGroup = new FormGroup({
        prompt_url: new FormControl('', Validators.required)
      });

      const formValuesSpy = jasmine.createSpy('formValues');
      component.formValues.subscribe(formValuesSpy);

      component.handleFormGroupState();

      expect(formValuesSpy).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty form gracefully', () => {
      component.formGroup = new FormGroup({});

      const formValuesSpy = jasmine.createSpy('formValues');
      component.formValues.subscribe(formValuesSpy);

      component.handleFormGroupState();

      expect(formValuesSpy).toHaveBeenCalledWith({});
    });

    it('should handle form control that does not exist', () => {
      expect(() => {
        component.getFormControl('nonexistent');
      }).not.toThrow();
    });

    it('should handle form with null values', () => {
      component.formGroup = new FormGroup({
        prompt_url: new FormControl(null),
        target: new FormControl(null)
      });

      const formValuesSpy = jasmine.createSpy('formValues');
      component.formValues.subscribe(formValuesSpy);

      component.handleFormGroupState();

      expect(formValuesSpy).toHaveBeenCalledWith({
        prompt_url: null,
        target: null
      });
    });
  });
});
