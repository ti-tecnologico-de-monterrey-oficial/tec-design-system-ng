import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbHeaderMobileComponent } from './bmb-header-mobile.component';

describe('BmbHeaderMobileComponent', () => {
  let component: BmbHeaderMobileComponent;
  let fixture: ComponentFixture<BmbHeaderMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbHeaderMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbHeaderMobileComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
