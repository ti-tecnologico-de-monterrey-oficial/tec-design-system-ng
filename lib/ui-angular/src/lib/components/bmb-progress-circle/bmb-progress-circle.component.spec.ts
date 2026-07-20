import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbProgressCircleComponent } from './bmb-progress-circle.component';
import { ComponentRef } from '@angular/core';

describe('BmbProgressCircleComponent', () => {
  let component: BmbProgressCircleComponent;
  let fixture: ComponentFixture<BmbProgressCircleComponent>;
  let componentRef: ComponentRef<BmbProgressCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbProgressCircleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbProgressCircleComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default options', () => {
    expect(component.options().showValueLabel).toBeFalse();
  });

  it('should update options on input change', () => {
    componentRef.setInput('percent', 75);
    componentRef.setInput('showTitle', false);
    component.ngOnChanges({});
    expect(component.options().percent).toBe(75);
    expect(component.options().showTitle).toBeFalse();
  });

  it('should draw the correct SVG path', () => {
    componentRef.setInput('percent', 75);
    component.render();
    const path = component?.svg?.path.d;
    expect(path).toContain(`
          M 105 5
          A 100 100 0 1 1 5 105.00000000000001`);
  });
});
