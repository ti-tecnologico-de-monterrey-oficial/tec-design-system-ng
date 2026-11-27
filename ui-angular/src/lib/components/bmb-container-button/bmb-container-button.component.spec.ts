import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbContainerButtonComponent } from './bmb-container-button.component';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { BmbGradeValueComponent } from '../bmb-grade-value/bmb-grade-value.component';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BmbFullTextDirective } from '../../directives/bmb-full-text/bmb-full-text.directive';

const FULL_TEXT_FIXTURE = {
  title:
    'Development strategies for professional competencies in higher education',
  subtitle: 'A long subtitle used to verify the full-text behavior',
} as const;

describe('BmbContainerButtonComponent', () => {
  let component: BmbContainerButtonComponent;
  let fixture: ComponentFixture<BmbContainerButtonComponent>;
  let componentRef: ComponentRef<BmbContainerButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BmbIconComponent,
        BmbBadgeComponent,
        BmbGradeValueComponent,
        BmbLayoutDirective,
        BmbLayoutItemDirective,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbContainerButtonComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('keeps full-text disabled by default and binds the full title and subtitle', () => {
    componentRef.setInput('componentTitle', FULL_TEXT_FIXTURE.title);
    componentRef.setInput('subtitle', FULL_TEXT_FIXTURE.subtitle);
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.bmb_container-button-title'));
    const subtitle = fixture.debugElement.query(
      By.css('.bmb_container-button-subtitle'),
    );
    const directives = fixture.debugElement.queryAll(
      By.directive(BmbFullTextDirective),
    );

    expect(component.showFullText()).toBe(false);
    expect(directives).toHaveLength(2);
    expect(directives[0].injector.get(BmbFullTextDirective).bmbFullText()).toBe(
      FULL_TEXT_FIXTURE.title,
    );
    expect(
      directives[0].injector.get(BmbFullTextDirective).bmbFullTextEnabled(),
    ).toBe(false);
    expect(directives[1].injector.get(BmbFullTextDirective).bmbFullText()).toBe(
      FULL_TEXT_FIXTURE.subtitle,
    );
    expect(title.nativeElement.hasAttribute('tabindex')).toBe(false);
    expect(subtitle.nativeElement.hasAttribute('tabindex')).toBe(false);
  });

  it('shows full text on long press without triggering the container click', () => {
    jest.useFakeTimers();
    componentRef.setInput('componentTitle', FULL_TEXT_FIXTURE.title);
    componentRef.setInput('subtitle', FULL_TEXT_FIXTURE.subtitle);
    componentRef.setInput('showFullText', true);
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector(
      '.bmb_container-button-title',
    ) as HTMLElement;
    Object.defineProperties(title, {
      clientWidth: { configurable: true, value: 80 },
      scrollWidth: { configurable: true, value: 240 },
    });

    const onButton = jest.fn();
    component.onButton.subscribe(onButton);
    const pointerDown = new Event('pointerdown', {
      bubbles: true,
      cancelable: true,
    });
    Object.assign(pointerDown, {
      pointerId: 1,
      pointerType: 'touch',
      button: 0,
      isPrimary: true,
      clientX: 0,
      clientY: 0,
    });
    title.dispatchEvent(pointerDown);
    jest.advanceTimersByTime(500);

    expect(
      document.querySelector('.bmb_tooltip-dialog--manual')?.textContent,
    ).toContain(FULL_TEXT_FIXTURE.title);

    document.dispatchEvent(
      Object.assign(
        new Event('pointerup', { bubbles: true, cancelable: true }),
        { pointerId: 1 },
      ),
    );
    title.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        detail: 1,
      }),
    );

    expect(onButton).not.toHaveBeenCalled();
  });

  it('should return the correct score', () => {
    componentRef.setInput('score', '10');
    expect(component.score()).toBe('10');
  });

  it('should return the correct class list', () => {
    componentRef.setInput('square', true);
    componentRef.setInput('small', true);
    componentRef.setInput('state', 'disabled');
    componentRef.setInput('alternative', true);
    const classList = component.getClassList();
    expect(classList).toContain('bmb_container-button');
    expect(classList).toContain('bmb_container-button-square');
    expect(classList).toContain('bmb_container-button-small');
    expect(classList).toContain('bmb_container-button-disabled');
    expect(classList).toContain('bmb_container-button-alternative');
  });
  it('preserves independent primary and secondary click outputs', () => {
    const event = new MouseEvent('click');
    const primary = jest.fn(),
      secondary = jest.fn();
    component.onButton.subscribe(primary);
    component.secondaryAction.subscribe(secondary);
    component.handleClick(event);
    expect(primary).toHaveBeenCalledWith(event);
    expect(secondary).not.toHaveBeenCalled();
    component.handleSecondaryClick(event);
    expect(secondary).toHaveBeenCalledWith(event);
  });
});
