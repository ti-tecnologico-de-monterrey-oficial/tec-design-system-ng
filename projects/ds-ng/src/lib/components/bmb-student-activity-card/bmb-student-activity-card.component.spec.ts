import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BmbStudentActivityCardComponent } from './bmb-student-activity-card.component';
import { BmbStudentActivityCardComponent } from './bmb-student-activity-card.component';
import { CommonModule } from '@angular/common';
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

  it('should return correct card classes', () => {
    componentRef.setInput('isListItem', true);
    componentRef.setInput('type', 'academic');
    expect(component.getCardClasses()).toEqual([
      'bmb_student-activity-card',
      'bmb_student-activity-card-list-item',
    ]);

    componentRef.setInput('isListItem', false);
    componentRef.setInput('type', 'life');
    expect(component.getCardClasses()).toEqual([
      'bmb_student-activity-card',
      'bmb_student-activity-card-life',
    ]);
  });

  it('should return correct badge type', () => {
    componentRef.setInput('type', 'academic');
    expect(component.getBadgeType()).toBe('strong');

    componentRef.setInput('type', 'life');
    expect(component.getBadgeType()).toBe('mitec_green');

    componentRef.setInput('type', 'events');
    expect(component.getBadgeType()).toBe('mitec_purple');
  });
});
