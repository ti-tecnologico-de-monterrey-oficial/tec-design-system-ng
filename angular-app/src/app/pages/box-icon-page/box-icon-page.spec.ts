import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoxIconPage } from './box-icon-page';

describe('BoxIconPage', () => {
  let component: BoxIconPage;
  let fixture: ComponentFixture<BoxIconPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxIconPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BoxIconPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should keep default values', () => {
    expect(component.iconName()).toBe('home');
    expect(component.boxColor()).toBe('semantic-success');
    expect(component.boxSize()).toBe('small');
    expect(component.boxShape()).toBe('square');
    expect(component.isIconFilled()).toBe(true);
  });
});
