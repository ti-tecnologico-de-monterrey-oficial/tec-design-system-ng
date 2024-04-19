import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbCheckboxComponent } from './bmb-checkbox.component';

describe('BmbCheckboxComponent', () => {
  let component: BmbCheckboxComponent;
  let fixture: ComponentFixture<BmbCheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbCheckboxComponent],
    });

    fixture = TestBed.createComponent(BmbCheckboxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default icon value', () => {
    expect(component.icon).toBe('face');
  });
});
