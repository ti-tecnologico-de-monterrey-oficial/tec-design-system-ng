import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbNoticeCardComponent } from './bmb-notice-card.component';
import { ComponentRef } from '@angular/core';

describe('BmbNoticeCardComponent', () => {
  let component: BmbNoticeCardComponent;
  let fixture: ComponentFixture<BmbNoticeCardComponent>;
  let componentRef: ComponentRef<BmbNoticeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbNoticeCardComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(BmbNoticeCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('description', {
      pageOne: 'Página 1',
      pageTwo: 'Página 2',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onDotPress', () => {
    it('should update the active index', () => {
      component.onDotPress(1);
      expect(component.activeIndex).toBe(1);
    });
  });

  describe('handleClose', () => {
    it('should emit onClose', () => {
      const emitSpy = jest.spyOn(component.onClose, 'emit');
      component.handleClose();
      expect(emitSpy).toHaveBeenCalled();
    });
  });

  describe('handleClickBtn', () => {
    it('should emit onClickBtn', () => {
      const emitSpy = jest.spyOn(component.onClickBtn, 'emit');
      component.handleClickBtn();
      expect(emitSpy).toHaveBeenCalled();
    });
  });

  describe('getPage', () => {
    it('returns no page content when description is absent', () => {
      componentRef.setInput('description', undefined);
      expect(component.getPage('pageOne')).toBeUndefined();
    });
    it('should return sanitized content for an existing page', () => {
      const result = component.getPage('pageOne');
      expect(result).toBeTruthy();
    });

    it('should return undefined for a missing page', () => {
      componentRef.setInput('description', { pageOne: 'Página 1' });
      fixture.detectChanges();

      expect(component.getPage('pageTwo')).toBeUndefined();
    });
  });
});
