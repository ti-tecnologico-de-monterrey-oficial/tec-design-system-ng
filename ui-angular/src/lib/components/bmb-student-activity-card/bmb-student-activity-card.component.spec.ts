import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbStudentActivityCardComponent } from './bmb-student-activity-card.component';
import { ComponentRef } from '@angular/core';

describe('BmbStudentActivityCardComponent', () => {
  let component: BmbStudentActivityCardComponent;
  let fixture: ComponentFixture<BmbStudentActivityCardComponent>;
  let componentRef: ComponentRef<BmbStudentActivityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbStudentActivityCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbStudentActivityCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('startDate', '2021-12-24 10:00:00');
    componentRef.setInput('endDate', '2021-12-24 11:00:00');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse start and end dates on init', () => {
    expect(component.parsedStartDate.year).toBe(2021);
    expect(component.parsedStartDate.month).toBe(12);
    expect(component.parsedStartDate.day).toBe(24);
    expect(component.parsedStartDate.hour).toBe(10);

    expect(component.parsedEndDate.year).toBe(2021);
    expect(component.parsedEndDate.month).toBe(12);
    expect(component.parsedEndDate.day).toBe(24);
    expect(component.parsedEndDate.hour).toBe(11);
  });

  it('should update parsed dates when inputs change', () => {
    componentRef.setInput('startDate', '2026-09-07 14:00:00');
    componentRef.setInput('endDate', '2026-09-07 15:30:00');
    fixture.detectChanges();

    expect(component.parsedStartDate.hour).toBe(14);
    expect(component.parsedEndDate.hour).toBe(15);
    expect(component.parsedEndDate.minute).toBe(30);
  });

  it('should return correct card classes', () => {
    componentRef.setInput('isListItem', true);
    componentRef.setInput('type', 'academic');
    expect(component.getCardClasses()).toEqual([
      'bmb_student-activity-card',
      'bmb_student-activity-card-list-item',
      'bmb_student-activity-card-academic',
    ]);

    componentRef.setInput('isListItem', false);
    componentRef.setInput('type', 'life');
    expect(component.getCardClasses()).toEqual([
      'bmb_student-activity-card',
      'bmb_student-activity-card-life',
    ]);

    componentRef.setInput('isListItem', true);
    componentRef.setInput('disableImage', true);
    expect(component.getCardClasses()).toEqual([
      'bmb_student-activity-card',
      'bmb_student-activity-card-list-item',
      'bmb_student-activity-card-list-item-no-image',
    ]);
  });

  it('should return correct badge type', () => {
    componentRef.setInput('type', 'academic');
    expect(component.getBadgeType()).toBe('creative-use-strong');

    componentRef.setInput('type', 'life');
    expect(component.getBadgeType()).toBe('mitec_green');

    componentRef.setInput('type', 'events');
    expect(component.getBadgeType()).toBe('mitec_purple');

    componentRef.setInput('type', 'save_the_date');
    expect(component.getBadgeType()).toBe('mitec_orange');
  });

  it('should return correct bullet styles', () => {
    componentRef.setInput('bulletColor', 'error-primary');
    expect(component.getBulletStyles()).toEqual({
      'background-color': 'rgb(var(--error-primary))',
    });
  });

  it('should keep the deprecated title as a visual fallback', () => {
    componentRef.setInput('componentTitle', '');
    componentRef.setInput('title', 'Legacy activity');
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.bmb_student-activity-card-title')
        .textContent,
    ).toContain('Legacy activity');
  });

  it('should render the image variant for list items', () => {
    componentRef.setInput('isListItem', true);
    componentRef.setInput('image', 'activity.png');
    componentRef.setInput('componentTitle', 'Activity title');
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector(
        '.bmb_student-activity-card-image-pic',
      ).src,
    ).toContain('activity.png');
    expect(
      fixture.nativeElement.querySelector(
        '.bmb_student-activity-card-content-location',
      ).textContent,
    ).not.toContain('undefined');
  });

  it('should render the bullet variant when the image is disabled', () => {
    componentRef.setInput('isListItem', true);
    componentRef.setInput('disableImage', true);
    componentRef.setInput('bulletColor', 'warning-primary');
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.bmb_student-activity-card-bullet'),
    ).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector(
        '.bmb_student-activity-card-image',
      ),
    ).toBeNull();
  });

  it('should omit the responsible person from list items', () => {
    componentRef.setInput('isListItem', true);
    componentRef.setInput('location', 'Campus');
    componentRef.setInput('responsible', 'Responsible person');
    fixture.detectChanges();

    const location = fixture.nativeElement.querySelector(
      '.bmb_student-activity-card-content-location',
    );

    expect(location.textContent).toContain('Campus');
    expect(location.textContent).not.toContain('Responsible person');
  });
});
