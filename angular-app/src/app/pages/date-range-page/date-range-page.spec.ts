import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateRangePage } from './date-range-page';

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
});
