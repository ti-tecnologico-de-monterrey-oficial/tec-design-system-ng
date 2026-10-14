import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbDatepickerModalComponent } from './bmb-datepicker-modal.component';

describe('BmbDatepickerModalComponent', () => {
  let component: BmbDatepickerModalComponent;
  let fixture: ComponentFixture<BmbDatepickerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbDatepickerModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbDatepickerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build a centered range of years through getYears', () => {
    fixture.componentRef.setInput('stepYearPicker', 4);
    component.selectedYear = 2024;

    expect(component.getYears()).toEqual(['2023', '2024', '2025', '2026']);
  });

  it('should adjust the selected year through handleChangeYear', () => {
    component.selectedYear = 2024;

    component.handleChangeYear('less', 1);
    expect(component.selectedYear).toBe(2023);

    component.handleChangeYear('more', 1);
    expect(component.selectedYear).toBe(2024);
  });

  it('should adjust the selected month and year through handleChangeMonth', () => {
    component.selectedMonth = 1;
    component.selectedYear = 2024;

    component.handleChangeMonth('less');

    expect(component.selectedMonth).toBe(12);
    expect(component.selectedYear).toBe(2023);
  });

  it('should match the selected year through isSelectedYear', () => {
    component.selectedYear = 2024;

    expect(component.isSelectedYear('2024')).toBe(true);
    expect(component.isSelectedYear('2025')).toBe(false);
  });
});
