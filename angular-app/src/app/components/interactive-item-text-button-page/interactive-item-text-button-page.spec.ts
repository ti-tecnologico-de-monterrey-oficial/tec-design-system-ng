import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InteractiveItemTextButtonPage } from './interactive-item-text-button-page';

describe('InteractiveItemTextButtonPage', () => {
  let component: InteractiveItemTextButtonPage;
  let fixture: ComponentFixture<InteractiveItemTextButtonPage>;

  beforeEach(async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
      text: async () => '<svg viewBox="0 0 24 24"></svg>',
    } as Response);

    await TestBed.configureTestingModule({
      imports: [InteractiveItemTextButtonPage],
    }).compileComponents();

    fixture = TestBed.createComponent(InteractiveItemTextButtonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create and render the Bamboo component', () => {
    expect(component).toBeTruthy();
    expect(component.label()).toBe('Title');
    expect(component.value()).toBe('info');
    expect(
      fixture.nativeElement.querySelector('bmb-interactive-item-text-button'),
    ).not.toBeNull();
  });

  it('should update controls and record click events', () => {
    component.icon.set('home');
    component.label.set('Inicio');
    component.value.set('Disponible');
    component.handleActionClick(new MouseEvent('click'));

    expect(component.icon()).toBe('home');
    expect(component.label()).toBe('Inicio');
    expect(component.value()).toBe('Disponible');
    expect(component.lastEvent()).toBe('click: click');
  });

  it('should disable the rendered button', () => {
    component.isDisabled.set(true);
    fixture.detectChanges();

    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });
});
