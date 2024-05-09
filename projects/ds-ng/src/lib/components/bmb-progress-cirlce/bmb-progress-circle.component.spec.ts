import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbProgressCircleComponent } from './bmb-progress-circle.component';

describe('BmbProgressCirlceComponent', () => {
  let component: BmbProgressCircleComponent;
  let fixture: ComponentFixture<BmbProgressCircleComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(BmbProgressCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
