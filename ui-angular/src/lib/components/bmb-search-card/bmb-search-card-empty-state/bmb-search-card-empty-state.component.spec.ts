import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbSearchCardEmptyStateComponent } from './bmb-search-card-empty-state.component';

describe('BmbSearchCardEmptyStateComponent', () => {
  let component: BmbSearchCardEmptyStateComponent;
  let fixture: ComponentFixture<BmbSearchCardEmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbSearchCardEmptyStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbSearchCardEmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
