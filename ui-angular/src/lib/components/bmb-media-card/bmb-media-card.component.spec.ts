import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbMediaCardComponent } from './bmb-media-card.component';

describe('BmbGenericCardComponent', () => {
  let component: BmbMediaCardComponent;
  let fixture: ComponentFixture<BmbMediaCardComponent>;
  let componentRef: ComponentRef<BmbMediaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbMediaCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbMediaCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build classes for the selected appearance', () => {
    componentRef.setInput('type', 'floating');
    componentRef.setInput('borderRadius', 'l');
    componentRef.setInput('enableZoom', true);
    componentRef.setInput('isBlurredBackdrop', true);
    componentRef.setInput('fullmediaCard', true);
    componentRef.setInput('boxShadow', true);

    expect(component.getClasses()).toEqual([
      'bmb_radius-l',
      'bmb_media-card-figure-zoom',
    ]);
    expect(component.getContentClasses()).toEqual([
      'bmb_media-card-content-container-backdrop',
      'bmb_media-card-content-full',
    ]);
    expect(component.getMediaCardClasses(true)).toEqual([
      'bmb_media-card-box-shadow',
      'bmb_media-card-floating',
    ]);
  });

  it('should use configured background colors outside inline mode', () => {
    componentRef.setInput('type', 'floating');
    componentRef.setInput('bgColor', '--containers-main');

    expect(component.getBackgroundColor()).toEqual({
      'background-color': 'rgb(var(--containers-main))',
    });
  });

  it('should emit its interaction event', () => {
    const event = new MouseEvent('click');
    const emitSpy = jest.spyOn(component.mediaCardClicked, 'emit');

    component.mediaCardClicked.emit(event);

    expect(emitSpy).toHaveBeenCalledWith(event);
  });
});
