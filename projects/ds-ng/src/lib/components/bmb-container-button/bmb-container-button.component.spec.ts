import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbContainerButtonComponent } from './bmb-container-button.component';

describe('BmbContainerButtonComponent', () => {
  let component: BmbContainerButtonComponent;
  let fixture: ComponentFixture<BmbContainerButtonComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbContainerButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
