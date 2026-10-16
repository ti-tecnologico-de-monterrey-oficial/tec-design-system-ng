import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbWebTemplatesComponent } from './bmb-web-templates.component';

describe('BmbWebTemplatesComponent', () => {
  let component: BmbWebTemplatesComponent;
  let fixture: ComponentFixture<BmbWebTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbWebTemplatesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbWebTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getSectionClass', () => {
    it('should return the base and default template classes', () => {
      expect(component.getSectionClass()).toEqual([
        'bmb_web-template',
        'bmb_web-template-full-width-card',
      ]);
    });

    it('should reflect the given template name', () => {
      fixture.componentRef.setInput('template', 'two-aside-card');
      fixture.detectChanges();

      expect(component.getSectionClass()).toEqual([
        'bmb_web-template',
        'bmb_web-template-two-aside-card',
      ]);
    });
  });

  describe('handleLogOut', () => {
    it('should emit topBarLogOut', () => {
      const emitSpy = jest.spyOn(component.topBarLogOut, 'emit');

      component.handleLogOut('param');

      expect(emitSpy).toHaveBeenCalledWith('param');
    });
  });

  describe('handleLangChange', () => {
    it('should emit topBarOnLangChange', () => {
      const emitSpy = jest.spyOn(component.topBarOnLangChange, 'emit');

      component.handleLangChange('en');

      expect(emitSpy).toHaveBeenCalledWith('en');
    });
  });
});
