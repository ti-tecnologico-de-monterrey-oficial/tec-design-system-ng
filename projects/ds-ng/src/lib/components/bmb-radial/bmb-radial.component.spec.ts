import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbRadialComponent } from './bmb-radial.component';

describe('BmbRadialComponent', () => {
  let component: BmbRadialComponent;
  let fixture: ComponentFixture<BmbRadialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbRadialComponent],
    });

    fixture = TestBed.createComponent(BmbRadialComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
