import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconStatusPage } from './icon-status-page';

describe('IconStatusPage', () => {
  let component: IconStatusPage;
  let fixture: ComponentFixture<IconStatusPage>;

  beforeEach(async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => '<svg viewBox="0 0 24 24"></svg>',
    } as Response);

    await TestBed.configureTestingModule({
      imports: [IconStatusPage],
    }).compileComponents();

    fixture = TestBed.createComponent(IconStatusPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update every icon status property', () => {
    component.setIcon('warning');
    component.setStatusAppearance('warning');
    component.setIconColor('secondary');

    expect(component.icon()).toBe('warning');
    expect(component.statusAppearance()).toBe('warning');
    expect(component.iconColor()).toBe('secondary');
  });

  it('should support the variant without status appearance', () => {
    component.setStatusAppearance('');

    expect(component.statusAppearance()).toBeUndefined();
  });
});
