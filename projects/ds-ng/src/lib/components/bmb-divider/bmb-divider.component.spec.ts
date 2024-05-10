import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbDividerComponent } from './bmb-divider.component';

describe('BmbDividerComponent', () => {
  let component: BmbDividerComponent;
  let fixture: ComponentFixture<BmbDividerComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbDividerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
