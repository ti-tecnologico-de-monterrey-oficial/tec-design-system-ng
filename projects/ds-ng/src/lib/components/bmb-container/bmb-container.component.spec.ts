import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbContainerComponent } from './bmb-container.component';

describe('BmbContainerComponent', () => {
  let component: BmbContainerComponent;
  let fixture: ComponentFixture<BmbContainerComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
