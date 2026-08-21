import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbSkeletonComponent } from './bmb-skeleton.component';
import type { BmbSkeletonType } from './bmb-skeleton.component';

describe('BmbSkeletonComponent', () => {
  let component: BmbSkeletonComponent;
  let fixture: ComponentFixture<BmbSkeletonComponent>;
  let componentRef: ComponentRef<BmbSkeletonComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbSkeletonComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it.each<[BmbSkeletonType, string]>([
    ['header', '.bmb_skeleton-header'],
    ['input', '.bmb_skeleton-input'],
    ['stray', '.bmb_skeleton-stray'],
    ['generic1', '.bmb_skeleton-generic1'],
    ['generic2', '.bmb_skeleton-generic2'],
    ['generic3', '.bmb_skeleton-generic3'],
  ])('should render the %s skeleton', (type, selector) => {
    componentRef.setInput('type', type);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector(selector)).toBeTruthy();
  });
});
