import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTabStudentActivityComponent } from './bmb-student-activity-tab.component';

describe('BmbTabStudentActivityComponent', () => {
  let component: BmbTabStudentActivityComponent;
  let fixture: ComponentFixture<BmbTabStudentActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTabStudentActivityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTabStudentActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
