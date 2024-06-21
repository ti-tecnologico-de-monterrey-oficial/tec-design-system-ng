import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbDatepickerComponent } from './bmb-datepicker.component';

describe('BmbDatepickerComponent', () => {
  let component: BmbDatepickerComponent;
  let fixture: ComponentFixture<BmbDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbDatepickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
