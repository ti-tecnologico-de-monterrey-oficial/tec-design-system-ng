import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BmbFilterCardComponent } from './bmb-filter-card.component';

describe('BmbFilterCardComponent', () => {
  let component: BmbFilterCardComponent;
  let fixture: ComponentFixture<BmbFilterCardComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbFilterCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
