import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { BmbFormValidatorComponent } from './bmb-form-validator.component';
import { CommonModule } from '@angular/common';

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
		spyOn(component.formGroupState, 'emit');
		component.onSubmit();
		expect(component.formGroupState.emit).toHaveBeenCalledWith(component.formGroup());
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
});
