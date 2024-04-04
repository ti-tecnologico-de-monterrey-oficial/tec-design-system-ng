import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTitleSectionComponent } from './bmb-title-section.component';

describe('BmbTitleSectionComponent', () => {
  let component: BmbTitleSectionComponent;
  let fixture: ComponentFixture<BmbTitleSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbTitleSectionComponent],
    });

    fixture = TestBed.createComponent(BmbTitleSectionComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
