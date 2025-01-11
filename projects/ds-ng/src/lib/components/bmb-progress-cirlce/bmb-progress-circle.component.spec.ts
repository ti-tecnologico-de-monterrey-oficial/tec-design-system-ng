import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbProgressCircleComponent } from './bmb-progress-circle.component';
import { CommonModule } from '@angular/common';

// describe('BmbProgressCirlceComponent', () => {
//   let component: BmbProgressCircleComponent;
//   let fixture: ComponentFixture<BmbProgressCircleComponent>;

//   beforeEach(async () => {
//     fixture = TestBed.createComponent(BmbProgressCircleComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

// });

describe('BmbProgressCircleComponent', () => {
  let component: BmbProgressCircleComponent;
  let fixture: ComponentFixture<BmbProgressCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BmbProgressCircleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbProgressCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default options', () => {
    expect(component.options.showValueLabel).toBeFalse();
  });

  it('should update options on input change', () => {
    component.percent = 75;
    component.showTitle = false;
    component.ngOnChanges({});
    expect(component.options.percent).toBe(75);
    expect(component.options.showTitle).toBeFalse();
  });

  it('should draw the correct SVG path', () => {
    component.percent = 75;
    component.render();
    const path = component.svg.path.d;
    expect(path).toContain('A 100 100 0 1 0');
  });

  it('should display the correct value label', () => {
    component.valueLabel = '$5000';
    component.render();
    const valueLabel = component.svg.valueLabel.texts[0];
    expect(valueLabel).toBe('$5000');
  });
});
