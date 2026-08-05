import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbSkeletonComponent } from './bmb-skeleton.component';

describe('BmbSkeletonComponent', () => {
  let component: BmbSkeletonComponent;
  let fixture: ComponentFixture<BmbSkeletonComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbSkeletonComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
