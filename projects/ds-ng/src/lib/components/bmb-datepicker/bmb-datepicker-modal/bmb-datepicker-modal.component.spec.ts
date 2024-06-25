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
});
