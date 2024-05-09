import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbStatCounterComponent } from './bmb-stat-counter.component';

describe('BmbStatCounterComponent', () => {
  let component: BmbStatCounterComponent;
  let fixture: ComponentFixture<BmbStatCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbStatCounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbStatCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
