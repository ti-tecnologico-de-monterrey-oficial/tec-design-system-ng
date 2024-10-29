// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BmbFormControlDirective } from './bmb-form-control.directive';
// import { BmbFormService } from './bmb-form-control.service';
// import { BmbFormValidationComponent } from '../../../public-api';

// describe('BmbFormControlDirective', () => {
//   let component: BmbFormValidationComponent;
//   let fixture: ComponentFixture<BmbFormValidationComponent>;
//   let directive: BmbFormControlDirective;

//   it('should create an instance', () => {
//     TestBed.runInInjectionContext(() => {
//       component = fixture.componentInstance;
//       const formService = TestBed.inject(BmbFormService);
//       directive = new BmbFormControlDirective(formService, fixture.nativeElement);
//       expect(directive).toBeTruthy();
//     });
//   });
// });

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BmbFormControlDirective } from './bmb-form-control.directive';
// import { BmbFormService } from './bmb-form-control.service';
// import { ReactiveFormsModule } from '@angular/forms';
// import { BmbFormValidationComponent } from '../../../public-api';

// describe('BmbFormControlDirective', () => {
//   let component: BmbFormValidationComponent;
//   let fixture: ComponentFixture<BmbFormValidationComponent>;
//   let directive: BmbFormControlDirective;
//   let formService: BmbFormService;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [BmbFormValidationComponent, BmbFormControlDirective],
//       providers: [BmbFormService],
//       imports: [ReactiveFormsModule],
//     }).compileComponents();
//     fixture = TestBed.createComponent(BmbFormValidationComponent);
//     component = fixture.componentInstance;
//     formService = TestBed.inject(BmbFormService);
//     directive = new BmbFormControlDirective(formService, fixture.nativeElement);
//   });

//   // it('should initialize and set form controls', () => {
//   //   spyOn(formService, 'setFormControlByType');
//   //   directive.ngOnInit();
//   //   expect(formService.setFormControlByType).toHaveBeenCalled();
//   // });

//   // it('should emit form group state on valid submit', () => {
//   //   const formGroup = formService.getFormGroup();
//   //   spyOn(directive.formGroupState, 'emit');
//   //   spyOn(formGroup, 'valid').and.returnValue(true);
//   //   directive.submit();
//   //   expect(directive.formGroupState.emit).toHaveBeenCalledWith(formGroup);
//   // });
// });
