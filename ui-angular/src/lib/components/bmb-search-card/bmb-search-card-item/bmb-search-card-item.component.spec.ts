import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbSearchCardItemComponent } from './bmb-search-card-item.component';
import { ComponentRef } from '@angular/core';

describe('BmbSearchCardItemComponent', () => {
  let component: BmbSearchCardItemComponent;
  let fixture: ComponentFixture<BmbSearchCardItemComponent>;
  let componentRef: ComponentRef<BmbSearchCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbSearchCardItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbSearchCardItemComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getStyles', () => {
    it('should return the RGB color key value for the background color icon', () => {
      componentRef.setInput('backgroundColorIcon', 'white_primary');
      fixture.detectChanges();
      expect(component.getStyles()).toBeTruthy();
    });
  });

  describe('getClassBox', () => {
    it('should return the class based on the background color icon', () => {
      componentRef.setInput('backgroundColorIcon', 'white_primary');
      fixture.detectChanges();
      expect(component.getClassBox()).toBe(
        'bmb_search-card-item-box-white_primary',
      );
    });
  });

  describe('handleClick', () => {
    it('should emit triggerClick', () => {
      jest.spyOn(component.triggerClick, 'emit');
      component.handleClick();
      expect(component.triggerClick.emit).toHaveBeenCalled();
    });
  });

  describe('handleBookmarkClick', () => {
    it('should emit getBookmarkClick', () => {
      jest.spyOn(component.getBookmarkClick, 'emit');
      component.handleBookmarkClick();
      expect(component.getBookmarkClick.emit).toHaveBeenCalled();
    });
  });
});
