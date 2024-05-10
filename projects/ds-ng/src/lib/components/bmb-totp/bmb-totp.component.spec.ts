import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTotpComponent } from './bmb-totp.component';

describe('BmbTotpComponent', () => {
  let component: BmbTotpComponent;
  let fixture: ComponentFixture<BmbTotpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbTotpComponent],
    });

    fixture = TestBed.createComponent(BmbTotpComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
