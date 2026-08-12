import { ComponentRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BmbUserImageComponent } from './bmb-user-image.component';

describe('BmbUserImageComponent', () => {
  let component: BmbUserImageComponent;
  let fixture: ComponentFixture<BmbUserImageComponent>;
  let componentRef: ComponentRef<BmbUserImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbUserImageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbUserImageComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
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

  it('should render the image inputs and visual classes', () => {
    componentRef.setInput('size', 'mobile-large');
    componentRef.setInput(
      'image',
      '/assets/images/placeholders/user-icon-test.svg',
    );
    componentRef.setInput('altImage', 'Usuario');
    componentRef.setInput('bordered', true);
    fixture.detectChanges();

    const image: HTMLImageElement | null =
      fixture.nativeElement.querySelector('img');
    const container: HTMLElement | null =
      fixture.nativeElement.querySelector('.bmb_user_image');
    expect(container?.classList).toContain('bmb_user_image-mobile-large');
    expect(container?.classList).toContain('bmb_user_image-bordered');
    expect(image?.getAttribute('alt')).toBe('Usuario');
  });

  it('should emit interaction events without a link', () => {
    const clickSpy = jest.spyOn(component.buttonClick, 'emit');
    const pressSpy = jest.spyOn(component.buttonPress, 'emit');
    const keySpy = jest.spyOn(component.buttonKeyPress, 'emit');

    component.handleClick(new MouseEvent('click'));
    component.handlePress(new MouseEvent('mousedown'));
    component.handleKeyPress(new KeyboardEvent('keypress'));

    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(pressSpy).toHaveBeenCalledTimes(1);
    expect(keySpy).toHaveBeenCalledTimes(1);
  });
});
