import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbContainerButtonComponent } from './bmb-container-button.component';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { BmbGradeValueComponent } from '../bmb-grade-value/bmb-grade-value.component';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { ComponentRef } from '@angular/core';

describe('BmbContainerButtonComponent', () => {
  let component: BmbContainerButtonComponent;
  let fixture: ComponentFixture<BmbContainerButtonComponent>;
  let componentRef: ComponentRef<BmbContainerButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BmbIconComponent,
        BmbBadgeComponent,
        BmbGradeValueComponent,
        BmbLayoutDirective,
        BmbLayoutItemDirective,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbContainerButtonComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return the correct score', () => {
    componentRef.setInput('score', '10');
    expect(component.score()).toBe('10');
  });

  it('should return the correct class list', () => {
    componentRef.setInput('square', true);
    componentRef.setInput('small', true);
    componentRef.setInput('state', 'disabled');
    componentRef.setInput('alternative', true);
    const classList = component.getClassList();
    expect(classList).toContain('bmb_container-button');
    expect(classList).toContain('bmb_container-button-square');
    expect(classList).toContain('bmb_container-button-small');
    expect(classList).toContain('bmb_container-button-disabled');
    expect(classList).toContain('bmb_container-button-alternative');
  });
});
