import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationBarPage } from './navigation-bar-page';

describe('NavigationBarPage', () => {
  let component: NavigationBarPage;
  let fixture: ComponentFixture<NavigationBarPage>;

  beforeEach(async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
      text: async () => '<svg viewBox="0 0 24 24"></svg>',
    } as Response);

    await TestBed.configureTestingModule({
      imports: [NavigationBarPage],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationBarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update every navigation property', () => {
    component.setIconSize(32);
    component.setGapSize('l');
    component.setJustify('center');
    component.setAlignItems('stretch');
    component.isMitecHeader.set(true);

    expect(component.iconSize()).toBe(32);
    expect(component.gapSize()).toBe('l');
    expect(component.justify()).toBe('center');
    expect(component.alignItems()).toBe('stretch');
    expect(component.isMitecHeader()).toBe(true);
  });

  it('should support undefined icon size and an empty action state', () => {
    component.setIconSize(0);
    component.emptyState.set(true);

    expect(component.iconSize()).toBeUndefined();
    expect(component.actionHeaders()).toEqual([]);
  });

  it('should record action interactions', () => {
    component.actionHeaders()[0].action?.();

    expect(component.lastEvent()).toBe('action: Inicio');
  });

  it('should render the real Bamboo component', () => {
    const navigationBar = fixture.nativeElement.querySelector(
      'bmb-navigation-bar.navigation-bar-demo',
    );

    expect(navigationBar).not.toBeNull();
  });
});
