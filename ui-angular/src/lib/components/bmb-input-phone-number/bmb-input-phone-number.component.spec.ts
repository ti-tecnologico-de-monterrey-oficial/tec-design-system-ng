import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbInputPhoneNumberComponent } from './bmb-input-phone-number.component';

describe('BmbInputPhoneNumberComponent', () => {
  let component: BmbInputPhoneNumberComponent;
  let fixture: ComponentFixture<BmbInputPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbInputPhoneNumberComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbInputPhoneNumberComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
