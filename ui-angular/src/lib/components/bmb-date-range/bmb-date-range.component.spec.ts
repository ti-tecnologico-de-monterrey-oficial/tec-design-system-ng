import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { BmbDateRangeComponent } from './bmb-date-range.component';

describe('BmbDateRangeComponent', () => {
  let component: BmbDateRangeComponent;
  let fixture: ComponentFixture<BmbDateRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbDateRangeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ignore invalid start date values when updating disabled dates', () => {
    const controlStart = new FormControl('');
    const controlEnd = new FormControl('');

    fixture.componentRef.setInput('controlStart', controlStart);
    fixture.componentRef.setInput('controlEnd', controlEnd);
    fixture.detectChanges();
    component.ngOnInit();

    component.disableDatesBeforeCurrent = 'existing-date';

    controlStart.setValue('not-a-date');

    expect(component.disableDatesBeforeCurrent).toBe('existing-date');
  });

  it('should update disableDatesBeforeCurrent when the start date is valid', () => {
    const controlStart = new FormControl('');
    const controlEnd = new FormControl('');

    fixture.componentRef.setInput('controlStart', controlStart);
    fixture.componentRef.setInput('controlEnd', controlEnd);
    fixture.detectChanges();
    component.ngOnInit();

    controlStart.setValue('15/06/2024');

    expect(component.disableDatesBeforeCurrent).toBe('14/06/2024');
  });

  it('should update disableDatesAfterCurrent when the end date changes', () => {
    const controlStart = new FormControl('');
    const controlEnd = new FormControl('');

    fixture.componentRef.setInput('controlStart', controlStart);
    fixture.componentRef.setInput('controlEnd', controlEnd);
    fixture.detectChanges();
    component.ngOnInit();

    controlEnd.setValue('20/06/2024');

    expect(component.disableDatesAfterCurrent).toBe('20/06/2024');
  });

  it('should assign a new control when controlStart or controlEnd is not provided', () => {
    // null must be set before the first detectChanges, since ngOnInit only runs once
    const freshFixture = TestBed.createComponent(BmbDateRangeComponent);
    freshFixture.componentRef.setInput('controlStart', null);
    freshFixture.componentRef.setInput('controlEnd', null);
    freshFixture.detectChanges();

    const freshComponent = freshFixture.componentInstance;

    expect(freshComponent.isControlStartNull).toBe(true);
    expect(freshComponent.isControlEndNull).toBe(true);
    expect(freshComponent.controlStart()).toBeInstanceOf(FormControl);
    expect(freshComponent.controlEnd()).toBeInstanceOf(FormControl);
  });

  it('should toggle the column class based on multipleRow', () => {
    expect(component.getClassList()).toContain('bmb_date-range-column');

    fixture.componentRef.setInput('multipleRow', true);
    fixture.detectChanges();

    expect(component.getClassList()).not.toContain('bmb_date-range-column');
  });
});
