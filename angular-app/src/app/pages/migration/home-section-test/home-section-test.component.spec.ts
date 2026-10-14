import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeSectionTestComponent } from './home-section-test.component';

describe('HomeSectionTestComponent', () => {
  let component: HomeSectionTestComponent;
  let fixture: ComponentFixture<HomeSectionTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSectionTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeSectionTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the componentTitle signal', () => {
    component.componentTitle.set('New title');
    expect(component.componentTitle()).toBe('New title');
  });
});
