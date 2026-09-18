import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { BmbHeaderSectionComponent } from './bmb-header-section.component';

describe('BmbHeaderSectionComponent', () => {
  let component: BmbHeaderSectionComponent;
  let componentRef: ComponentRef<BmbHeaderSectionComponent>;
  let fixture: ComponentFixture<BmbHeaderSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbHeaderSectionComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
            paramMap: {
              subscribe: () => ({ unsubscribe: () => undefined }),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbHeaderSectionComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create with its default input values', () => {
    expect(component).toBeTruthy();
    expect(component.subtitle()).toBeUndefined();
    expect(component.dataLocalNav()).toEqual([]);
    expect(component.leftIcon()).toBe('');
    expect(component.actionHeaders()).toEqual([]);
    expect(component.icon()).toBe('');
    expect(component.iconSize()).toBe(16);
    expect(component.transparentBgC()).toBeUndefined();
  });

  it('should return an empty style object without an image or appearance', () => {
    expect(component.getStyles()).toEqual({});
  });

  it('should use the transparent background for image icons', () => {
    componentRef.setInput('icon', 'https://example.com/icon.png');

    expect(component.getStyles()).toEqual({ 'background-color': 'transparent' });
  });

  it('should create the background style from the icon appearance', () => {
    componentRef.setInput('bgIconAppearance', 'green-light');

    expect(component.getStyles()).toEqual({
      'background-color': 'rgb(var(--green-light))',
    });
  });

  it('should evaluate boolean and truthy conditionals', () => {
    expect(component.evaluateConditional(true)).toBe(true);
    expect(component.evaluateConditional(false)).toBe(false);
    expect(component.evaluateConditional('value')).toBe(true);
    expect(component.evaluateConditional('')).toBe(false);
    expect(component.evaluateConditional(null)).toBe(false);
  });

  it('should return the conditional class when enabled', () => {
    expect(
      component.getClassNameByConditional('header', true, 'active'),
    ).toEqual(['header-active']);
    expect(
      component.getClassNameByConditional('header', false, 'active'),
    ).toEqual([]);
  });

  it('should identify image icons', () => {
    expect(component.isImage('https://example.com/icon.svg')).toBe(true);
    expect(component.isImage('home')).toBe(false);
  });

  it('should show breadcrumbs only when local navigation has items', () => {
    expect(component.showBreadcrumbs()).toBe(false);

    componentRef.setInput('dataLocalNav', [{ text: 'Home' }]);

    expect(component.showBreadcrumbs()).toBe(true);
  });

  it('should render the title and subtitle when breadcrumbs are absent', () => {
    componentRef.setInput('componentTitle', 'Page title');
    componentRef.setInput('subtitle', 'Page subtitle');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h1').textContent).toContain(
      'Page title',
    );
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain(
      'Page subtitle',
    );
    expect(
      fixture.nativeElement.querySelector('bmb-breadcrumb'),
    ).toBeNull();
  });

  it('should render breadcrumbs instead of the subtitle when navigation exists', () => {
    componentRef.setInput('subtitle', 'Page subtitle');
    componentRef.setInput('dataLocalNav', [{ text: 'Home' }]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('bmb-breadcrumb')).not.toBeNull();
    expect(
      fixture.nativeElement.querySelector('h2'),
    ).toBeNull();
  });

  it('should emit the left click event', () => {
    const event = new MouseEvent('click');
    const listener = jest.fn();
    component.onClickLeft.subscribe(listener);

    component.handleClickLeft(event);

    expect(listener).toHaveBeenCalledWith(event);
  });
});
