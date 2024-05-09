import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbHomeSectionComponent } from './bmb-home-section.component';

describe('BmbHomeSectionComponent', () => {
  let component: BmbHomeSectionComponent;
  let fixture: ComponentFixture<BmbHomeSectionComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbHomeSectionComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
