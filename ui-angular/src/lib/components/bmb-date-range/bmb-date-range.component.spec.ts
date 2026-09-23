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
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should ignore invalid start date values when updating disabled dates', () => {
    const controlStart = new FormControl('');
    const controlEnd = new FormControl('');

    fixture.componentRef.setInput('controlStart', controlStart);
    fixture.componentRef.setInput('controlEnd', controlEnd);
    fixture.detectChanges();

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

    controlStart.setValue('15/06/2024');

    expect(component.disableDatesBeforeCurrent).toBe('14/06/2024');
  });

  it('should update disableDatesAfterCurrent when the end date changes', () => {
    const controlStart = new FormControl('');
    const controlEnd = new FormControl('');

    fixture.componentRef.setInput('controlStart', controlStart);
    fixture.componentRef.setInput('controlEnd', controlEnd);
    fixture.detectChanges();

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

  it('retains boundaries when both date controls are cleared', () => {
    fixture.detectChanges();
    component.controlStart().setValue('15/06/2024');
    component.controlEnd().setValue('20/06/2024');
    component.controlStart().reset('');
    component.controlEnd().reset('');

    expect(component.disableDatesBeforeCurrent).toBe('14/06/2024');
    expect(component.disableDatesAfterCurrent).toBe('20/06/2024');
  });

  it('unsubscribes from supplied controls on destruction', () => {
    const start = new FormControl('');
    const end = new FormControl('');
    fixture.componentRef.setInput('controlStart', start);
    fixture.componentRef.setInput('controlEnd', end);
    fixture.detectChanges();
    start.setValue('15/06/2024');
    end.setValue('20/06/2024');

    fixture.destroy();
    start.setValue('16/06/2024');
    end.setValue('21/06/2024');

    expect(component.disableDatesBeforeCurrent).toBe('14/06/2024');
    expect(component.disableDatesAfterCurrent).toBe('20/06/2024');
  });

  it('emits replacement controls through the existing model outputs', () => {
    const startChanges = jest.fn();
    const endChanges = jest.fn();
    component.controlStart.subscribe(startChanges);
    component.controlEnd.subscribe(endChanges);
    fixture.componentRef.setInput('controlStart', null);
    fixture.componentRef.setInput('controlEnd', null);
    fixture.detectChanges();

    expect(startChanges).toHaveBeenCalledWith(component.controlStart());
    expect(endChanges).toHaveBeenCalledWith(component.controlEnd());
    startChanges.mockClear();
    endChanges.mockClear();
    component.controlStart().setValue('15/06/2024');
    component.controlEnd().setValue('20/06/2024');
    expect(startChanges).not.toHaveBeenCalled();
    expect(endChanges).not.toHaveBeenCalled();
  });
});
