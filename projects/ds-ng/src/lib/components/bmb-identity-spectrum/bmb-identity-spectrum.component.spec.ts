import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbIdentitySpectrumComponent } from './bmb-identity-spectrum.component';

describe('BmbIdentitySpectrumComponent', () => {
  let component: BmbIdentitySpectrumComponent;
  let fixture: ComponentFixture<BmbIdentitySpectrumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbIdentitySpectrumComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbIdentitySpectrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
