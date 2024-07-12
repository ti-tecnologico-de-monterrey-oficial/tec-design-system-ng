import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbSearchInputComponent } from './bmb-inner-header.component';

describe('BmbTitleSectionComponent', () => {
  let component: BmbSearchInputComponent;
  let fixture: ComponentFixture<BmbSearchInputComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbSearchInputComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
