import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressCirclePage } from './progress-circle-page';

describe('ProgressCirclePage', () => {
  let component: ProgressCirclePage;
  let fixture: ComponentFixture<ProgressCirclePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressCirclePage],
    }).compileComponents();
    fixture = TestBed.createComponent(ProgressCirclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should expose every status', () =>
    expect(component.statuses).toEqual([
      'gray',
      'success',
      'error',
      'warning',
    ]));
  it('should update a valid percentage', () => {
    component.setPercent('75');
    expect(component.percent()).toBe(75);
  });
});
