import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbIconComponent } from './bmb-icon.component';

describe('BmbIconComponent', () => {
  let component: BmbIconComponent;
  let fixture: ComponentFixture<BmbIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbIconComponent],
    });

    fixture = TestBed.createComponent(BmbIconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default icon value', () => {
    expect(component.icon).toBe('face');
  });
});
