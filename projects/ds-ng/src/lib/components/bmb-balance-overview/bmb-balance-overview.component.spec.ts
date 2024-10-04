import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbBalanceOverviewComponent } from './bmb-balance-overview.component';

describe('BmbBalanceOverviewComponent', () => {
  let component: BmbBalanceOverviewComponent;
  let fixture: ComponentFixture<BmbBalanceOverviewComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbBalanceOverviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
