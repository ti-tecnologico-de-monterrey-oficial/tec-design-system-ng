import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbChevronTitleSelectorComponent } from './bmb-chevron-title-selector.component';

describe('BmbTitleSectionComponent', () => {
  let component: BmbChevronTitleSelectorComponent;
  let fixture: ComponentFixture<BmbChevronTitleSelectorComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbChevronTitleSelectorComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
