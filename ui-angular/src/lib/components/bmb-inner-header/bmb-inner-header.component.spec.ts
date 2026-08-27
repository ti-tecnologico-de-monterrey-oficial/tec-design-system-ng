import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbInnerHeaderComponent } from './bmb-inner-header.component';

describe('BmbTitleSectionComponent', () => {
  let component: BmbInnerHeaderComponent;
  let fixture: ComponentFixture<BmbInnerHeaderComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbInnerHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
