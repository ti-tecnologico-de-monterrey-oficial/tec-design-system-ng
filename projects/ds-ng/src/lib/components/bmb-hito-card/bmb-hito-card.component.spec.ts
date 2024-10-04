import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbHitoCardComponent } from './bmb-hito-card.component';

describe('BmbHitoCardComponent', () => {
  let component: BmbHitoCardComponent;
  let fixture: ComponentFixture<BmbHitoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbHitoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbHitoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
