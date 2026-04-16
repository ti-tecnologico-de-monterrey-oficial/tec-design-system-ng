import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { BmbCustomIconsComponent, BmbCustomIconListType } from './bmb-custom-icons.component';

describe('BmbCustomIconsComponent', () => {
  let component: BmbCustomIconsComponent;
  let fixture: ComponentFixture<BmbCustomIconsComponent>;
  let componentRef: ComponentRef<BmbCustomIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCustomIconsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbCustomIconsComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('icon', 'bmb_android');
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an svg element', () => {
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  const icons: BmbCustomIconListType[] = [
    'bmb_android',
    'bmb_apple',
    'bmb_facebook',
    'bmb_instagram',
    'bmb_twitter',
    'bmb_whatsapp',
    'bmb_youtube',
  ];

  icons.forEach((icon) => {
    it(`should render a path for icon "${icon}"`, () => {
      componentRef.setInput('icon', icon);
      fixture.detectChanges();
      const path = fixture.nativeElement.querySelector('svg path');
      expect(path).toBeTruthy();
    });
  });

  it('should reflect the icon input value', () => {
    componentRef.setInput('icon', 'bmb_youtube');
    expect(component.icon()).toBe('bmb_youtube');
  });
});
