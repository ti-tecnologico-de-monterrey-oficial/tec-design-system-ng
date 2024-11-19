import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbAlertCenterComponent } from './bmb-alert-center.component';

describe('BmbAlertCenterComponent', () => {
  let component: BmbAlertCenterComponent;
  let fixture: ComponentFixture<BmbAlertCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbAlertCenterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbAlertCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
