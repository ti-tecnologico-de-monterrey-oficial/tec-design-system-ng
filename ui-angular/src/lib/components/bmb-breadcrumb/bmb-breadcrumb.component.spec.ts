/* eslint-disable @typescript-eslint/no-empty-function */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbBreadcrumbComponent } from './bmb-breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  provideRouter,
} from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

describe('BmbBreadcrumbComponent', () => {
  beforeEach(async () => {
    (globalThis as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => '<svg width="24" height="24"></svg>',
      json: async () => ({}),
    });

    await TestBed.configureTestingModule({
      imports: [
        BmbBreadcrumbComponent,
        RouterTestingModule,
        CommonModule,
        BmbIconComponent,
      ],
      providers: [
        {
          provide: Router,
          useValue: {
            events: of(new NavigationEnd(0, '/emprendedor/vivencia', '/')),
            navigate: () => Promise.resolve(true),
            navigateByUrl: () => Promise.resolve(true),
            createUrlTree: () => {},
            serializeUrl: () => '',
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
            paramMap: of({ get: () => '1' }),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BmbBreadcrumbComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render top bar breadcrumb', () => {
    const fixture = TestBed.createComponent(BmbBreadcrumbComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('dataTopBar', [
      { text: 'Tec. Sign', link: '/' },
      { text: 'Borem ipsum dolor sit amet 1 Borem ipsum dolor sit amet 1' },
    ]);
    fixture.componentRef.setInput('isTopBar', true);

    fixture.detectChanges();
    const topBarElement = fixture.nativeElement.querySelector(
      '.bmb_breadcrumb-top',
    );
    expect(topBarElement).toBeTruthy();
  });

  it('should render local navigation breadcrumb', () => {
    const fixture = TestBed.createComponent(BmbBreadcrumbComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('dataLocalNav', [
      { text: 'Borem ipsum dolor sit amet 1', link: '/' },
      { text: 'Borem ipsum dolor sit amet 2', link: '/emprendedor' },
      { text: 'Borem ipsum dolor sit amet 3', link: '/emprendedor/vivencia' },
    ]);
    fixture.componentRef.setInput('isTopBar', false);

    fixture.detectChanges();
    const localNavElement = fixture.nativeElement.querySelector(
      '.bmb_breadcrumb-link',
    );
    expect(localNavElement).toBeTruthy();
  });

  it('should toggle and expose dropdown items for long paths', () => {
    const fixture = TestBed.createComponent(BmbBreadcrumbComponent);
    const component = fixture.componentInstance;
    const items = [
      { text: 'One', link: '/one' },
      { text: 'Two', link: '/two' },
      { text: 'Three', link: '/three' },
      { text: 'Four', link: '/four' },
      { text: 'Five', link: '/five' },
    ];

    expect(component.getDropdownItems(items)).toEqual(items.slice(1, 3));
    expect(component.dropdownOpen()).toBe(false);
    component.toggleDropdown();
    expect(component.dropdownOpen()).toBe(true);
  });

  it('should return the penultimate link without changing the input contract', () => {
    const fixture = TestBed.createComponent(BmbBreadcrumbComponent);
    const component = fixture.componentInstance;
    fixture.componentRef.setInput('dataLocalNav', [
      { text: 'One', link: '/one' },
      { text: 'Two', link: '/two' },
      { text: 'Three' },
    ]);

    expect(component.getPenultimateLink()).toBe('/two');
  });
});

describe('BmbBreadcrumb full-text interaction', () => {
  let fixture: ComponentFixture<BmbBreadcrumbComponent>;
  let navigate: jest.SpyInstance;
  const tooltip = () => document.querySelector('.bmb_tooltip-dialog--manual');
  const path = [
    { text: 'Inicio', link: '/start' },
    { text: 'Mis evidencias académicas', link: '/evidence' },
    {
      text: 'Vitalidad intelectual y desarrollo de estrategias de innovación educativa',
    },
  ];

  function truncated(selector: string): HTMLElement {
    const element = fixture.nativeElement.querySelector(
      selector,
    ) as HTMLElement;
    expect(element).not.toBeNull();
    Object.defineProperties(element, {
      clientWidth: { configurable: true, value: 100 },
      scrollWidth: { configurable: true, value: 300 },
    });
    return element;
  }

  function pointer(type: string, element: HTMLElement): void {
    const event = new Event(type, { bubbles: true, cancelable: true });
    Object.assign(event, {
      pointerId: 1,
      pointerType: 'touch',
      button: 0,
      isPrimary: true,
      clientX: 0,
      clientY: 0,
    });
    element.dispatchEvent(event);
  }

  function click(element: HTMLElement, detail = 1): MouseEvent {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      detail,
    });
    element.dispatchEvent(event);
    return event;
  }

  beforeEach(() => {
    jest.useFakeTimers();
    TestBed.configureTestingModule({
      imports: [BmbBreadcrumbComponent],
      providers: [provideRouter([])],
    });
    navigate = jest
      .spyOn(TestBed.inject(Router), 'navigateByUrl')
      .mockResolvedValue(true);
    fixture = TestBed.createComponent(BmbBreadcrumbComponent);
    fixture.componentRef.setInput('dataLocalNav', path);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    jest.clearAllTimers();
    jest.useRealTimers();
    expect(tooltip()).toBeNull();
  });

  it('keeps the feature off by default and preserves navigation after a hold', () => {
    expect(fixture.componentInstance.showFullText()).toBe(false);
    const link = truncated('a.bmb_breadcrumb-link');
    pointer('pointerdown', link);
    jest.advanceTimersByTime(600);
    pointer('pointerup', link);
    click(link);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(tooltip()).toBeNull();
  });

  it('reveals a route without navigating on long press, then preserves a brief click', () => {
    fixture.componentRef.setInput('showFullText', true);
    fixture.detectChanges();
    const link = truncated('a.bmb_breadcrumb-link');
    pointer('pointerdown', link);
    jest.advanceTimersByTime(500);
    expect(tooltip()?.textContent).toBe(path[0].text);
    pointer('pointerup', link);
    expect(click(link).defaultPrevented).toBe(true);
    expect(navigate).not.toHaveBeenCalled();
    expect(tooltip()).not.toBeNull();
    pointer('pointerdown', link);
    pointer('pointerup', link);
    click(link);
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('preserves navigation for keyboard activation', () => {
    fixture.componentRef.setInput('showFullText', true);
    fixture.detectChanges();
    const link = truncated('a.bmb_breadcrumb-link');
    expect(link.getAttribute('tabindex')).toBe('0');
    jest.spyOn(link, 'matches').mockReturnValue(true);
    link.dispatchEvent(new FocusEvent('focusin'));
    expect(tooltip()?.textContent).toBe(path[0].text);
    click(link, 0);
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('allows keyboard consultation of an inactive route without adding navigation', () => {
    fixture.componentRef.setInput('showFullText', true);
    fixture.componentRef.setInput('isInactive', true);
    fixture.detectChanges();
    const text = truncated('.bmb_breadcrumb-text-active');
    expect(text.getAttribute('tabindex')).toBe('0');
    jest.spyOn(text, 'matches').mockReturnValue(true);
    text.dispatchEvent(new FocusEvent('focusin'));
    expect(tooltip()?.textContent).toBe(path[0].text);
    expect(navigate).not.toHaveBeenCalled();
  });

  it('reveals the current top-bar route through keyboard focus', () => {
    fixture.componentRef.setInput('showFullText', true);
    fixture.componentRef.setInput('isTopBar', true);
    fixture.componentRef.setInput('dataTopBar', path.slice(0, 2));
    fixture.detectChanges();
    const current = truncated('.bmb_breadcrumb-top-current');
    expect(current.getAttribute('tabindex')).toBe('0');
    jest.spyOn(current, 'matches').mockReturnValue(true);
    current.dispatchEvent(new FocusEvent('focusin'));
    expect(tooltip()?.textContent).toBe(path[1].text);
    current.dispatchEvent(new FocusEvent('focusout'));
    expect(tooltip()).toBeNull();
  });

  it('reveals a route in the dropdown without navigating or closing the menu', () => {
    fixture.componentRef.setInput('showFullText', true);
    fixture.componentRef.setInput('dataLocalNav', [
      path[0],
      path[1],
      {
        text: 'Herramientas tecnológicas para la formación de capital humano',
        link: '/tools',
      },
      {
        text: 'FormacionDeCompetenciasProfesionalesSinEspacios',
        link: '/training',
      },
      path[2],
    ]);
    fixture.componentRef.setInput('dropdownOpen', true);
    fixture.detectChanges();
    const link = truncated('.bmb_breadcrumb-dropdown-items a');
    pointer('pointerdown', link);
    jest.advanceTimersByTime(500);
    expect(tooltip()?.textContent).toBe(path[1].text);
    pointer('pointerup', link);
    click(link);
    expect(navigate).not.toHaveBeenCalled();
    expect(fixture.componentInstance.dropdownOpen()).toBe(true);
  });

  it('adds no tabindex to static text when the feature is disabled', () => {
    expect(
      fixture.nativeElement
        .querySelector('.bmb_breadcrumb-text')
        .hasAttribute('tabindex'),
    ).toBe(false);
  });
});
