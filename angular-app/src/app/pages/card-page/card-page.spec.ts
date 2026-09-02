import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardPage } from './card-page';

describe('CardPage', () => {
  let component: CardPage;
  let fixture: ComponentFixture<CardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the card appearance', () => {
    component.setType('warning');
    component.setShadow('box-shadow-6');
    component.setBorderRadius('xl');
    component.setMargin('s');
    component.setState('error');
    component.setBorderColor('contrasts-75');
    component.setHeaderPadding('l');
    component.setHeaderColor('contrasts-25');
    component.setFooterPadding('xs');
    component.setFooterColor('none');
    component.setRoundedContent(true);

    expect(component.type()).toBe('warning');
    expect(component.shadow()).toBe('box-shadow-6');
    expect(component.borderRadius()).toBe('xl');
    expect(component.margin()).toBe('s');
    expect(component.state()).toBe('error');
    expect(component.borderColor()).toBe('contrasts-75');
    expect(component.headerPadding()).toBe('l');
    expect(component.headerColor()).toBe('contrasts-25');
    expect(component.footerPadding()).toBe('xs');
    expect(component.footerColor()).toBe('none');
    expect(component.roundedContent()).toBe(true);
  });

  it('should convert the none section color to null', () => {
    expect(component.toSectionColor('none')).toBeNull();
    expect(component.toSectionColor('contrasts-50')).toBe('contrasts-50');
  });
});
