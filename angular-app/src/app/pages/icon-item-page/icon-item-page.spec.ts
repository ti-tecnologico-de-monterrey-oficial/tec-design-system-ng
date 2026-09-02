import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconItemPage } from './icon-item-page';

describe('IconItemPage', () => {
  let component: IconItemPage;
  let fixture: ComponentFixture<IconItemPage>;
  let warnSpy: jest.SpyInstance;

  beforeEach(async () => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => '<svg viewBox="0 0 24 24"></svg>',
    } as Response);

    await TestBed.configureTestingModule({
      imports: [IconItemPage],
    }).compileComponents();

    fixture = TestBed.createComponent(IconItemPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update every component property', () => {
    component.setIcon('home');
    component.setIconSize(32);
    component.setLabel('Campus');
    component.setValue('Monterrey');
    component.setShowDivider(false);

    expect(component.icon()).toBe('home');
    expect(component.iconSize()).toBe(32);
    expect(component.label()).toBe('Campus');
    expect(component.value()).toBe('Monterrey');
    expect(component.showDivider()).toBe(false);
  });

  it('should expose the selectable icon options', () => {
    expect(component.icons).toContain('person');
    expect(component.icons).toContain('home');
    expect(component.icons).toContain(component.icon());
  });
});
