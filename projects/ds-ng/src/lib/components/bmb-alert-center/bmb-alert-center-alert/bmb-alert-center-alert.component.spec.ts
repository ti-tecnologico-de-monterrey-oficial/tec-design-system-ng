import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbAlertCenterAlertComponent } from './bmb-alert-center-alert.component';

describe('BmbAlertCenterAlertComponent', () => {
  let component: BmbAlertCenterAlertComponent;
  let fixture: ComponentFixture<BmbAlertCenterAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbAlertCenterAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbAlertCenterAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
