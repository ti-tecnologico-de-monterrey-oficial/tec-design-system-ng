import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbGradeValueComponent } from './bmb-grade-value.component';

describe('BmbGradeValueComponent', () => {
  let component: BmbGradeValueComponent;
  let fixture: ComponentFixture<BmbGradeValueComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbGradeValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
