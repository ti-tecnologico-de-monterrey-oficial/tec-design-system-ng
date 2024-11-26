import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbBalanceOverviewComponent } from './bmb-balance-overview.component';

describe('BmbBalanceOverviewComponent', () => {
  let component: BmbBalanceOverviewComponent;
  let fixture: ComponentFixture<BmbBalanceOverviewComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbBalanceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.progressCirclePercent).toBe(0);
    expect(component.progressCircleValue).toBe('Progress Value');
    expect(component.showProgressCircleValue).toBe(true);
    expect(component.progressCircleTitle).toBe('Title');
    expect(component.showProgressCircleTitle).toBe(true);
    expect(component.showProgressCircleBackground).toBe(true);
    expect(component.labelPrimary).toBe('Text');
    expect(component.valuePrimary).toBe('$0');
    expect(component.labelSecondary).toBe('Text');
    expect(component.valueSecondary).toBe('$0');
  });

  it('should update input values', () => {
    component.progressCirclePercent = 50;
    component.progressCircleValue = '50%';
    component.showProgressCircleValue = false;
    component.progressCircleTitle = 'Updated Title';
    component.showProgressCircleTitle = false;
    component.showProgressCircleBackground = false;
    component.labelPrimary = 'Updated Primary';
    component.valuePrimary = '$100';
    component.labelSecondary = 'Updated Secondary';
    component.valueSecondary = '$200';
    fixture.detectChanges();

    expect(component.progressCirclePercent).toBe(50);
    expect(component.progressCircleValue).toBe('50%');
    expect(component.showProgressCircleValue).toBe(false);
    expect(component.progressCircleTitle).toBe('Updated Title');
    expect(component.showProgressCircleTitle).toBe(false);
    expect(component.showProgressCircleBackground).toBe(false);
    expect(component.labelPrimary).toBe('Updated Primary');
    expect(component.valuePrimary).toBe('$100');
    expect(component.labelSecondary).toBe('Updated Secondary');
    expect(component.valueSecondary).toBe('$200');
  });
});
