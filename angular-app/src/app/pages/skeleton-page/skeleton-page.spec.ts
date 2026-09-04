import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonPage } from './skeleton-page';

describe('SkeletonPage', () => {
  let component: SkeletonPage;
  let fixture: ComponentFixture<SkeletonPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose every skeleton type', () => {
    expect(component.types).toEqual([
      'header',
      'input',
      'stray',
      'generic1',
      'generic2',
      'generic3',
    ]);
  });

  it('should update the selected type', () => {
    component.setType('generic3');
    expect(component.type()).toBe('generic3');
  });
});
