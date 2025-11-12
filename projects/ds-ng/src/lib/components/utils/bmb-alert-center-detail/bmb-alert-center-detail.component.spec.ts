import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbAlertCenterDetailComponent } from './bmb-alert-center-detail.component';

describe('BmbAlertCenterDetailComponent', () => {
  let component: BmbAlertCenterDetailComponent;
  let fixture: ComponentFixture<BmbAlertCenterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbAlertCenterDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmbAlertCenterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
