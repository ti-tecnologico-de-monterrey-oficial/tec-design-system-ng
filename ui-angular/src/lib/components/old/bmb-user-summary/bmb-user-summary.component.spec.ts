import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbUserSummaryComponent } from './bmb-user-summary.component';

describe('BmbUserSummaryComponent', () => {
  let component: BmbUserSummaryComponent;
  let fixture: ComponentFixture<BmbUserSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbUserSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbUserSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
