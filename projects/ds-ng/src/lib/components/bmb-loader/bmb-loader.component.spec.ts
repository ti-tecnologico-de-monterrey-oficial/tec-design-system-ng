import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbLoaderComponent } from './bmb-loader.component';

describe('BmbLoaderComponent', () => {
  let component: BmbLoaderComponent;
  let fixture: ComponentFixture<BmbLoaderComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbLoaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
