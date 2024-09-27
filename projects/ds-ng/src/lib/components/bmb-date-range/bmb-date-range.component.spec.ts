import { ComponentFixture, TestBed } from '@angular/core/testing';

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
});
