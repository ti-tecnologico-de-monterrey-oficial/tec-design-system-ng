import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbUserSummaryContentComponent } from './bmb-user-summary-content.component';

describe('BmbUserSummaryContentComponent', () => {
  let component: BmbUserSummaryContentComponent;
  let fixture: ComponentFixture<BmbUserSummaryContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbUserSummaryContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbUserSummaryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
