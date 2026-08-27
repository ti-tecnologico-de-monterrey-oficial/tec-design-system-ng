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
});
