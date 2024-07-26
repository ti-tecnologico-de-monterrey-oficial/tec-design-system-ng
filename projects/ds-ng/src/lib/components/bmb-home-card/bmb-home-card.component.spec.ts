import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbHomeCardComponent } from './bmb-home-card.component';

describe('BmbHomeCardComponent', () => {
  let component: BmbHomeCardComponent;
  let fixture: ComponentFixture<BmbHomeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbHomeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbHomeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
