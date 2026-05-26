import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbAcademicProgressComponent } from './bmb-academic-progress.component';
import { ComponentRef } from '@angular/core';

describe('BmbAcademicProgressComponent', () => {
  let component: BmbAcademicProgressComponent;
  let fixture: ComponentFixture<BmbAcademicProgressComponent>;
  let componentRef: ComponentRef<BmbAcademicProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbAcademicProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbAcademicProgressComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('accredited', { name: 'Accredited', value: '100' });
    componentRef.setInput('average', { name: 'Average', value: '85' });
    componentRef.setInput('summary', { name: 'Summary', value: '75' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should return the correct name from getName', () => {
  //   const element: IBmbNameValuePair = { name: 'Test Name', value: '100' };
  //   expect(component.getName(element)).toBe('Test Name');
  // });

  // it('should return the correct value from getValue', () => {
  //   const element: IBmbNameValuePair = { name: 'Test Name', value: '100' };
  //   expect(component.getValue(element)).toBe(100);
  // });
});
