import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbInputValidatorComponent } from './bmb-input-validator.component';

describe('BmbInputValidatorComponent', () => {
  let component: BmbInputValidatorComponent;
  let fixture: ComponentFixture<BmbInputValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbInputValidatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbInputValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
