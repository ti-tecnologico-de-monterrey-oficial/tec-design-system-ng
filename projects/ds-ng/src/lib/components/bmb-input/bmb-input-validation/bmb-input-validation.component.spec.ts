import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbInputValidationComponent } from './bmb-input-validation.component';

describe('BmbInputValidationComponent', () => {
  let component: BmbInputValidationComponent;
  let fixture: ComponentFixture<BmbInputValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbInputValidationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbInputValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
