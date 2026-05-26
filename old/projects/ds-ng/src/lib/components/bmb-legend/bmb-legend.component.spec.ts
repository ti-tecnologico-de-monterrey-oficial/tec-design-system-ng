import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbLegendComponent } from './bmb-legend.component';

describe('BmbLegendComponent', () => {
  let component: BmbLegendComponent;
  let fixture: ComponentFixture<BmbLegendComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(BmbLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default values', () => {
    const component = new BmbLegendComponent();
    expect(component.label).toEqual('');
    expect(component.value).toEqual('');
    expect(component.indicatorAppearance).toEqual('normal');
  });
});
