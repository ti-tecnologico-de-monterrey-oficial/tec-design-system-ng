import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbOverlayComponent } from './bmb-overlay.component';
import { ComponentRef } from '@angular/core';

describe('BmbOverlayComponent', () => {
  let component: BmbOverlayComponent;
  let fixture: ComponentFixture<BmbOverlayComponent>;
  let componentRef: ComponentRef<BmbOverlayComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbOverlayComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should only render the overlay when active', () => {
    expect(fixture.nativeElement.querySelector('.bmb_overlay')).toBeNull();

    componentRef.setInput('active', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.bmb_overlay')).toBeTruthy();
  });

  it('should emit its uid when clicked', () => {
    const emit = jest.spyOn(component.onClick, 'emit');
    componentRef.setInput('active', true);
    componentRef.setInput('uid', 'overlay-demo');
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.bmb_overlay').click();

    expect(emit).toHaveBeenCalledWith('overlay-demo');
  });
});
