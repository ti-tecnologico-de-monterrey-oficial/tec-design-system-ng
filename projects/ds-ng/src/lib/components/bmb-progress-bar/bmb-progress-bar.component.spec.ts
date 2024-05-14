import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbProgressBarComponent } from './bmb-progress-bar.component';

describe('BmbProgressBarComponent', () => {
  let component: BmbProgressBarComponent;
  let fixture: ComponentFixture<BmbProgressBarComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbProgressBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
