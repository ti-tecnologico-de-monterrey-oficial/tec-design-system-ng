import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { BmbHitoCardComponent } from './bmb-hito-card.component';

describe('BmbHitoCardComponent', () => {
  let component: BmbHitoCardComponent;
  let fixture: ComponentFixture<BmbHitoCardComponent>;
  let componentRef: ComponentRef<BmbHitoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbHitoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbHitoCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('title', 'Test Title');
    componentRef.setInput('id', 'hito-id');
    componentRef.setInput('type', 'active');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getClassList', () => {
    it('should return only the base class by default', () => {
      expect(component.getClassList()).toEqual(['bmb_hito-card']);
    });

    it('should add the bullet, active and compact classes when enabled', () => {
      componentRef.setInput('enable_bullet', true);
      componentRef.setInput('is_active', true);
      componentRef.setInput('isCompact', true);
      fixture.detectChanges();

      expect(component.getClassList()).toEqual([
        'bmb_hito-card',
        'bmb_hito-card-bullet',
        'bmb_hito-card-active',
        'bmb_hito-card-compact',
      ]);
    });
  });

  describe('handleEventChange', () => {
    it('should emit handleClick with the id', () => {
      const emitSpy = jest.spyOn(component.handleClick, 'emit');

      component.handleEventChange();

      expect(emitSpy).toHaveBeenCalledWith('hito-id');
    });
  });

  describe('formatBadgeText', () => {
    it('should replace underscores for a string legend', () => {
      expect(component.formatBadgeText('under_review')).toBe('under review');
    });

    it('should replace underscores for a custom event legend', () => {
      expect(
        component.formatBadgeText({ text: 'custom_text', type: 'normal' }),
      ).toBe('custom text');
    });
  });

  describe('getHitoIconClass', () => {
    it('should return the type string directly', () => {
      componentRef.setInput('type', 'done');
      fixture.detectChanges();
      expect(component.getHitoIconClass()).toBe('done');
    });

    it('should return the custom event type', () => {
      componentRef.setInput('type', { text: 'Custom', type: 'warning' });
      fixture.detectChanges();
      expect(component.getHitoIconClass()).toBe('warning');
    });

    it('should default to custom when the custom event has no type', () => {
      componentRef.setInput('type', { text: 'Custom', type: '' });
      fixture.detectChanges();
      expect(component.getHitoIconClass()).toBe('custom');
    });
  });

  describe('appearanceBadge', () => {
    it.each([
      ['active', 'strong'],
      ['done', 'success'],
      ['pending', 'normal'],
      ['under_review', 'warning'],
      ['canceled', 'error'],
    ])('should map %s to %s', (type, expected) => {
      componentRef.setInput('type', type);
      fixture.detectChanges();
      expect(component.appearanceBadge()).toBe(expected);
    });

    it('should default to strong for an unknown string type', () => {
      componentRef.setInput('type', 'unknown' as any);
      fixture.detectChanges();
      expect(component.appearanceBadge()).toBe('strong');
    });

    it('should return the custom event type', () => {
      componentRef.setInput('type', { text: 'Custom', type: 'warning' });
      fixture.detectChanges();
      expect(component.appearanceBadge()).toBe('warning');
    });

    it('should default to normal when the custom event has no type', () => {
      componentRef.setInput('type', { text: 'Custom', type: '' });
      fixture.detectChanges();
      expect(component.appearanceBadge()).toBe('normal');
    });
  });

  describe('titleDisplayed', () => {
    it('should use componentTitle over the deprecated title', () => {
      componentRef.setInput('componentTitle', 'New title');
      fixture.detectChanges();
      expect(component.titleDisplayed()).toBe('New title');
    });

    it('should truncate the title on mobile', () => {
      componentRef.setInput(
        'componentTitle',
        'A very long title that definitely exceeds thirty characters',
      );
      fixture.detectChanges();
      component.isMobile.set(true);

      expect(component.titleDisplayed()?.length).toBeLessThanOrEqual(31);
      expect(component.titleDisplayed()).toContain('…');
    });
  });
});
