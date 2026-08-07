import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BmbUserImageComponent } from './bmb-user-image.component';

describe('BmbUserImageComponent', () => {
  let component: BmbUserImageComponent;
  let fixture: ComponentFixture<BmbUserImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbUserImageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbUserImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit imageNotFoundError when image fails to load', () => {
    const spy = jest.spyOn(component.imageNotFoundError, 'emit');

    component.handleImageNotFoundError('broken-image.jpg', new Event('error'));

    expect(spy).toHaveBeenCalled();
  });
});
