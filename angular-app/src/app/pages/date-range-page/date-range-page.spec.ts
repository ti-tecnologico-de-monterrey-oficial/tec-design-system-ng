import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateRangePage } from './date-range-page';
import { By } from '@angular/platform-browser';
import { BmbDateRangeComponent } from 'ui-angular';

describe('DateRangePage', () => {
  let component: DateRangePage;
  let fixture: ComponentFixture<DateRangePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateRangePage],
    }).compileComponents();

    fixture = TestBed.createComponent(DateRangePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the layout and validation controls', () => {
    component.setInputId('custom-id');
    component.setName('custom-name');
    component.setLabelStartDate('Inicio');
    component.setLabelEndDate('Fin');
    component.setIcon('event');
    component.setDateFormat('yyyy-MM-dd');
    component.setPlaceholderStartDate('yyyy-MM-dd');
    component.setPlaceholderEndDate('yyyy-MM-dd');
    component.setStepYearPicker(6);
    component.setDisableDatesBefore('01/01/2024');
    component.setDisableDatesAfter('31/12/2024');
    component.setInvalidFormatErrorMessage('Formato inválido');
    component.setRequiredFieldErrorMessage('Campo requerido');
    component.setErrorMessage('Error genérico');
    component.setMultipleRow(true);
    component.setIsRequired(true);
    component.setIsClearable(true);
    component.setDisabled(true);
    fixture.detectChanges();

    expect(component.inputId()).toBe('custom-id');
    expect(component.name()).toBe('custom-name');
    expect(component.labelStartDate()).toBe('Inicio');
    expect(component.labelEndDate()).toBe('Fin');
    expect(component.icon()).toBe('event');
    expect(component.dateFormat()).toBe('yyyy-MM-dd');
    expect(component.placeholderStartDate()).toBe('yyyy-MM-dd');
    expect(component.placeholderEndDate()).toBe('yyyy-MM-dd');
    expect(component.stepYearPicker()).toBe(6);
    expect(component.disableDatesBefore()).toBe('01/01/2024');
    expect(component.disableDatesAfter()).toBe('31/12/2024');
    expect(component.invalidFormatErrorMessage()).toBe('Formato inválido');
    expect(component.requiredFieldErrorMessage()).toBe('Campo requerido');
    expect(component.errorMessage()).toBe('Error genérico');
    expect(component.multipleRow()).toBe(true);
    expect(component.isRequired()).toBe(true);
    expect(component.isClearable()).toBe(true);
    expect(component.disabled()).toBe(true);
  });

  it('passes structured errors and custom validation to the rendered range', () => {
    component.useStructuredErrors.set(true);
    component.customValidationEnabled.set(true);
    fixture.detectChanges();
    component.setControlStartValue('15/06/2024');
    component.setControlEndValue('20/06/2024');
    component.validateControls();
    fixture.detectChanges();

    const range = fixture.debugElement.query(
      By.directive(BmbDateRangeComponent),
    ).componentInstance as BmbDateRangeComponent;
    expect(range.errorMessage()).toEqual({
      required: 'Selecciona una fecha.',
      customValidation: 'Fecha rechazada por la validación de ejemplo.',
    });
    expect(range.customValidation()).toBe(component.customValidation);
    expect(component.controlStartState()).toMatchObject({
      value: '15/06/2024',
      status: 'INVALID',
      touched: true,
      dirty: true,
      errors: { customValidation: true },
    });
    expect(component.controlEndState().status).toBe('INVALID');

    component.customValidationEnabled.set(false);
    component.validateControls();
    expect(component.controlStartState().status).toBe('VALID');
    expect(component.controlEndState().status).toBe('VALID');
  });

  it('updates values from page inputs and clears both controls', () => {
    const startInput = fixture.nativeElement.querySelector(
      '#date-range-control-start',
    ) as HTMLInputElement;
    startInput.value = '15/06/2024';
    startInput.dispatchEvent(new Event('input'));
    component.setControlEndValue('20/06/2024');
    fixture.detectChanges();

    expect(component.controlStart.value).toBe('15/06/2024');
    expect(fixture.nativeElement.textContent).toContain('20/06/2024');
    expect(component.lastModelEvent()).toBe(
      'Sin cambios de instancia de FormControl',
    );
    component.clearControls();
    expect(component.controlStartState()).toMatchObject({
      value: '',
      touched: false,
      dirty: false,
    });
    expect(component.controlEndState()).toMatchObject({
      value: '',
      touched: false,
      dirty: false,
    });
  });

  it('observes the range model outputs', () => {
    const range = fixture.debugElement.query(
      By.directive(BmbDateRangeComponent),
    );
    range.triggerEventHandler('controlStartChange', component.controlStart);
    expect(component.lastModelEvent()).toBe('controlStartChange: ""');
    range.triggerEventHandler('controlEndChange', component.controlEnd);
    expect(component.lastModelEvent()).toBe('controlEndChange: ""');
  });
});
