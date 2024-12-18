import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbContainerComponent } from './bmb-container.component';
import { CommonModule } from '@angular/common';
import { ComponentRef } from '@angular/core';

describe('BmbContainerComponent', () => {
  let component: BmbContainerComponent;
  let fixture: ComponentFixture<BmbContainerComponent>;
  let componentRef: ComponentRef<BmbContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, BmbContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbContainerComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return default class when not hidden and default appearance', () => {
    expect(component.getClasses()).toEqual([
      'bmb_container',
      'bmb_container-primary-container',
    ]);
  });

  it('should return hidden class when isHidden is true', () => {
    componentRef.setInput('isHidden', true);
    fixture.detectChanges();
    expect(component.getClasses()).toEqual(['bmb_container-hidden']);
  });

  it('should return correct class based on appearance', () => {
    componentRef.setInput('appearance', 'primary-header');
    fixture.detectChanges();
    expect(component.getClasses()).toEqual([
      'bmb_container',
      'bmb_container-primary-header',
    ]);
  });
});
