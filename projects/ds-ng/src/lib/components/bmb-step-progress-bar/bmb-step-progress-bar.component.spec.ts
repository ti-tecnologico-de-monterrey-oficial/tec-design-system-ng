import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbStepProgressBarComponent } from './bmb-step-progress-bar.component';

describe('BmbStepProgressBarComponent', () => {
  let component: BmbStepProgressBarComponent;
  let fixture: ComponentFixture<BmbStepProgressBarComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbStepProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
