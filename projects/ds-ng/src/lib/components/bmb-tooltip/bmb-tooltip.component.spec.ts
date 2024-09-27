import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTooltipComponent } from './bmb-tooltip.component';

describe('BmbTooltipComponent', () => {
  let component: BmbTooltipComponent;
  let fixture: ComponentFixture<BmbTooltipComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(BmbTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
