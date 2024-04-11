import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbFocusElementComponent } from './bmb-focus-element.component';

describe('BmbFocusElementComponent', () => {
  let component: BmbFocusElementComponent;
  let fixture: ComponentFixture<BmbFocusElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbFocusElementComponent],
    });

    fixture = TestBed.createComponent(BmbFocusElementComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default icon value', () => {
    expect(component.icon).toBe('face');
  });
});
