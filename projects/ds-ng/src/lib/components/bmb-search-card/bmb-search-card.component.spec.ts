import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbSearchCardComponent } from './bmb-search-card.component';

describe('BmbSearchCardComponent', () => {
  let component: BmbSearchCardComponent;
  let fixture: ComponentFixture<BmbSearchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbSearchCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
