import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbTooltipBaseComponent } from './bmb-tooltip-base.component';

describe('BmbTooltipBaseComponent', () => {
  let component: BmbTooltipBaseComponent;
  let fixture: ComponentFixture<BmbTooltipBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTooltipBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmbTooltipBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
