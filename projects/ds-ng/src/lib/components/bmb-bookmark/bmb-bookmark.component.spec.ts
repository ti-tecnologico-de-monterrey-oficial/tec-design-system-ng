import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbBookmarkComponent } from './bmb-bookmark.component';

describe('BmbBookmarkComponent', () => {
  let component: BmbBookmarkComponent;
  let fixture: ComponentFixture<BmbBookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbBookmarkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isActive when handleClick is called', () => {
    expect(component.isActive()).toBeFalse();
    component.handleClick();
    expect(component.isActive()).toBeTrue();
    component.handleClick();
    expect(component.isActive()).toBeFalse();
  });

  it('should return correct class list based on isActive', () => {
    expect(component.getClassList()).toEqual(['bmb_bookmark']);
    component.isActive.set(true);
    expect(component.getClassList()).toEqual([
      'bmb_bookmark',
      'bmb_bookmark-active',
    ]);
  });
});
