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

  it('should expose the selectable bullet colors and default controls', () => {
    expect(component.bulletColors).toEqual([
      'success-primary',
      'warning-primary',
      'error-primary',
      'info-primary',
      'branding-primary',
    ]);
    expect(component.startDate()).toBe('2026-09-07 10:00:00');
    expect(component.endDate()).toBe('2026-09-07 12:00:00');
    expect(component.isListItem()).toBe(false);
    expect(component.disableImage()).toBe(false);
  });

  it('should update the demo controls used by the component', () => {
    component.type.set('events');
    component.isListItem.set(true);
    component.disableImage.set(true);
    component.componentTitle.set('Updated activity');
    component.bulletColor.set('error-primary');

    expect(component.type()).toBe('events');
    expect(component.isListItem()).toBe(true);
    expect(component.disableImage()).toBe(true);
    expect(component.componentTitle()).toBe('Updated activity');
    expect(component.bulletColor()).toBe('error-primary');
  });
});
