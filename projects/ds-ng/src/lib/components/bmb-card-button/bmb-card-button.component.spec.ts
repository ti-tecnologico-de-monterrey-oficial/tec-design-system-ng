import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardButtonComponent } from './bmb-card-button.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { CommonModule } from '@angular/common';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';

describe('CardButtonComponent', () => {
  let component: CardButtonComponent;
  let fixture: ComponentFixture<CardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardButtonComponent, BmbIconComponent, BmbBadgeComponent],
      imports: [CommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('.bmb_card_button-title').textContent,
    ).toContain('Test Title');
  });

  it('should display the correct body', () => {
    component.body = 'Test Body';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('.bmb_card_button-body').textContent,
    ).toContain('Test Body');
  });

  it('should display the correct badges', () => {
    component.badges = [{ text: 'Badge 1' }, { text: 'Badge 2' }];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.bmb_card_button-badge').length).toBe(2);
  });

  it('should display the correct icons', () => {
    component.icons = ['icon1', 'icon2'];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.bmb_card_button-icon').length).toBe(2);
  });

  it('should toggle the icon', () => {
    component.hasIcon = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.bmb_card_button-icon')).toBeTruthy();

    component.hasIcon = false;
    fixture.detectChanges();
    expect(compiled.querySelector('.bmb_card_button-icon')).toBeNull();
  });

  it('should toggle the menu', () => {
    component.hasMenu = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.bmb_card_button-menu')).toBeTruthy();

    component.hasMenu = false;
    fixture.detectChanges();
    expect(compiled.querySelector('.bmb_card_button-menu')).toBeNull();
  });

  it('should toggle the add content mode', () => {
    component.isAddContent = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('.bmb_card_button-container.add-content'),
    ).toBeTruthy();

    component.isAddContent = false;
    fixture.detectChanges();
    expect(
      compiled.querySelector('.bmb_card_button-container.add-content'),
    ).toBeNull();
  });
});
