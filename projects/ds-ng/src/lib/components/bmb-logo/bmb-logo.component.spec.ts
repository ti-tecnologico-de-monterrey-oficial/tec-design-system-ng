import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbLogoComponent } from './bmb-logo.component';

describe('BmbLogoComponent', () => {
  let component: BmbLogoComponent;
  let fixture: ComponentFixture<BmbLogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbLogoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbLogoComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set default values for inputs', () => {
    expect(component.size).toEqual('');
    expect(component.image).toEqual('');
    expect(component.altImage).toEqual('');
  });

  it('should set image and altImage properties when image input is provided', () => {
    component.image = 'path/to/image.jpg';
    component.altImage = 'Alt Text';
    fixture.detectChanges();
    expect(component.image).toEqual('path/to/image.jpg');
    expect(component.altImage).toEqual('Alt Text');
  });
});
