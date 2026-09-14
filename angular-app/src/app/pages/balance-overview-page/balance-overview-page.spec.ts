import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalanceOverviewPage } from './balance-overview-page';

describe('BalanceOverviewPage', () => {
  let component: BalanceOverviewPage;
  let fixture: ComponentFixture<BalanceOverviewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceOverviewPage],
    }).compileComponents();
    fixture = TestBed.createComponent(BalanceOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should expose every status', () =>
    expect(component.statuses).toEqual(['gray', 'success', 'error', 'warning']));
  it('should update a valid percentage', () => {
    component.setPercent('40');
    expect(component.percent()).toBe(40);
  });
});
