import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BotIconPage } from './bot-icon-page';

describe('BotIconPage', () => {
  let component: BotIconPage;
  let fixture: ComponentFixture<BotIconPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotIconPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BotIconPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose every supported preset', () => {
    expect(component.presets).toContain('bot_tecGPT');
    expect(component.presets).toContain('google');
    expect(component.presets).toContain('empty');
  });

  it('should update the icon name with presets and custom values', () => {
    component.setIconName('google');
    expect(component.iconName()).toBe('google');

    component.setIconName('/assets/icons/custom-bot.svg');
    expect(component.iconName()).toBe('/assets/icons/custom-bot.svg');
  });

  it('should expose and update the icon color', () => {
    expect(component.iconColor()).toBe('#ffffff');
    expect(component.colorOptions).toContainEqual({
      label: 'Azul Bamboo',
      value: '#0057b8',
    });

    component.setIconColor('#0057b8');

    expect(component.iconColor()).toBe('#0057b8');
  });

  it('should render the real Bamboo component', () => {
    expect(fixture.nativeElement.querySelector('bmb-bot-icon')).not.toBeNull();
  });
});
