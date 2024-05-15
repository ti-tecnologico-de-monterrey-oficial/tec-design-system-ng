import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbProgressBarComponent } from './bmb-progress-bar.component';

describe('BmbLogoComponent', () => {
  let component: BmbProgressBarComponent;
  let fixture: ComponentFixture<BmbProgressBarComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbProgressBarComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});