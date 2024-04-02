import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbLegendComponent } from './bmb-legend.component';

describe('BmbLegendComponent', () => {
  let component: BmbLegendComponent;
  let fixture: ComponentFixture<BmbLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbLegendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BmbLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
