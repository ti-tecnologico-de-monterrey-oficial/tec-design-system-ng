import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentActivityCardPage } from './student-activity-card-page';

describe('StudentActivityCardPage', () => {
  let component: StudentActivityCardPage;
  let fixture: ComponentFixture<StudentActivityCardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentActivityCardPage],
    }).compileComponents();
    fixture = TestBed.createComponent(StudentActivityCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should expose every activity type', () =>
    expect(component.types).toEqual([
      'academic',
      'life',
      'events',
      'save_the_date',
    ]));
});
