import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbBadgeComponent } from './bmb-badge.component';

describe('BmbBadgeComponent', () => {
  let component: BmbBadgeComponent;
  let fixture: ComponentFixture<BmbBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbBadgeComponent],
    });

    fixture = TestBed.createComponent(BmbBadgeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
