import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbDelayProfileComponent } from './bmb-delay-profile.component';

describe('BmbDelayProfileComponent', () => {
  let component: BmbDelayProfileComponent;
  let fixture: ComponentFixture<BmbDelayProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbDelayProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmbDelayProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
