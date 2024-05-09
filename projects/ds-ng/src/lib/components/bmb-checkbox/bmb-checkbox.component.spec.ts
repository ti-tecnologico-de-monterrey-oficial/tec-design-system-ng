import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbCheckboxComponent } from './bmb-checkbox.component';

describe('BmbCheckboxComponent', () => {
  let component: BmbCheckboxComponent;
  let fixture: ComponentFixture<BmbCheckboxComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbCheckboxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
