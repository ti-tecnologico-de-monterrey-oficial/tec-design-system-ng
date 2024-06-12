import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbFrequentAppsSelectorComponent } from './bmb-frequent-apps-selector.component';

describe('BmbFrequentAppsSelectorComponent', () => {
  let component: BmbFrequentAppsSelectorComponent;
  let fixture: ComponentFixture<BmbFrequentAppsSelectorComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbFrequentAppsSelectorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
