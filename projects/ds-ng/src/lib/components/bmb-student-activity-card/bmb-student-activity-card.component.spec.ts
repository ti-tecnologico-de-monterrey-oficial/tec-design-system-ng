import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbStudentActivityCardComponent } from './bmb-student-activity-card.component';

describe('BmbStudentActivityCardComponent', () => {
  let component: BmbStudentActivityCardComponent;
  let fixture: ComponentFixture<BmbStudentActivityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbStudentActivityCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbStudentActivityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
