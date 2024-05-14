import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbOverlayComponent } from './bmb-overlay.component';

describe('BmbOverlayComponent', () => {
  let component: BmbOverlayComponent;
  let fixture: ComponentFixture<BmbOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BmbOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
