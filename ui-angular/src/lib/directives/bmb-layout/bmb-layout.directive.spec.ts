import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BmbLayoutDirective } from './bmb-layout.directive';

@Component({
  standalone: true,
  imports: [BmbLayoutDirective],
  template: '<div bmbLayout></div><div bmbLayout [horizontalScroll]="scroll()"></div>',
})
class LayoutHost {
  scroll = signal(true);
}

describe('BmbLayoutDirective', () => {
  it('keeps scrolling opt-in and updates it when the binding changes', () => {
    const fixture = TestBed.createComponent(LayoutHost);
    fixture.detectChanges();
    const [defaultLayout, scrollingLayout] = fixture.debugElement.queryAll(
      By.directive(BmbLayoutDirective),
    );
    expect(defaultLayout.injector.get(BmbLayoutDirective).horizontalScroll()).toBe(false);
    expect(defaultLayout.nativeElement.classList.contains('bmb_layout-horizontal-scroll')).toBe(false);
    expect(scrollingLayout.nativeElement.classList.contains('bmb_layout-horizontal-scroll')).toBe(true);

    fixture.componentInstance.scroll.set(false);
    fixture.detectChanges();
    expect(scrollingLayout.nativeElement.classList.contains('bmb_layout-horizontal-scroll')).toBe(false);
    expect(scrollingLayout.nativeElement.classList.contains('bmb_layout')).toBe(true);
  });
});
