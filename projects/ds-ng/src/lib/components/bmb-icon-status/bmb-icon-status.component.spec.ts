import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbIconStatusComponent } from './bmb-icon-status.component';

describe('BmbIconStatusComponent', () => {
  let component: BmbIconStatusComponent;
  let fixture: ComponentFixture<BmbIconStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbIconStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbIconStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
