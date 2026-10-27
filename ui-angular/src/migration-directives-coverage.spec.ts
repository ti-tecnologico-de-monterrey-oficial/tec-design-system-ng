import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BmbButtonGroupDirective } from './lib/directives/old/bmb-button-group/bmb-button-group.directive';
import { BmbSelectorDirective } from './lib/directives/old/bmb-selector/bmb-selector.directive';
import {
  BmbLayoutGridDirective,
  BmbLayoutGridItemDirective,
} from './lib/directives/old/bmb-layout-grid/bmb-layout-grid.directive';

@Component({
  standalone: true,
  imports: [
    BmbButtonGroupDirective,
    BmbSelectorDirective,
    BmbLayoutGridDirective,
    BmbLayoutGridItemDirective,
  ],
  template: `
    <div bmbButtonGroup [size]="size()"></div>
    <div bmbSelector [idSelector]="id()" [activeSelectorID]="activeId()"></div>
    <div
      bmbLayoutGrid
      [columns]="3"
      [rows]="2"
      [columnSize]="['100px', '1fr']"
      [height]="height()"
    >
      <div
        bmbLayoutGridItem
        [colStart]="2"
        [rowStart]="1"
        [numberOfColumns]="2"
        [numberOfRows]="2"
      ></div>
    </div>
  `,
})
class HostComponent {
  size = signal<'small' | 'large'>('small');
  id = signal<string | number>(1);
  activeId = signal<string | number>('1');
  height = signal<string | number>(240);
}

describe('migration directives coverage', () => {
  function createHost() {
    const fixture = TestBed.configureTestingModule({
      imports: [HostComponent],
    }).createComponent(HostComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('updates button-group classes when the bound size changes', () => {
    const fixture = createHost();
    const group = fixture.debugElement.query(
      By.directive(BmbButtonGroupDirective),
    );
    expect(
      group.nativeElement.classList.contains('bmb_button-group-small'),
    ).toBe(true);
    fixture.componentInstance.size.set('large');
    fixture.detectChanges();
    expect(
      group.nativeElement.classList.contains('bmb_button-group-large'),
    ).toBe(true);
    expect(
      group.nativeElement.classList.contains('bmb_button-group-small'),
    ).toBe(false);
  });

  it('normalizes selector IDs and hides only the inactive selector', () => {
    const fixture = createHost();
    const selector = fixture.debugElement.query(
      By.directive(BmbSelectorDirective),
    );
    expect(
      selector.nativeElement.classList.contains('bmb_selector-hidden'),
    ).toBe(false);
    fixture.componentInstance.activeId.set('other');
    fixture.detectChanges();
    expect(
      selector.nativeElement.classList.contains('bmb_selector-hidden'),
    ).toBe(true);
  });

  it('applies grid and item classes, dimensions, and existing public track helpers', () => {
    const fixture = createHost();
    const grid = fixture.debugElement.query(
      By.directive(BmbLayoutGridDirective),
    );
    const directive = grid.injector.get(BmbLayoutGridDirective);
    const item = fixture.debugElement.query(
      By.directive(BmbLayoutGridItemDirective),
    );
    expect(grid.nativeElement.classList.contains('bmb_layout-grid')).toBe(true);
    expect(item.nativeElement.classList.contains('bmb_layout-grid-item')).toBe(
      true,
    );
    expect(directive.elementStyle).toContain('height: 240px');
    expect(directive.generateArray(['100px', '1fr'], 3)).toBe(
      '100px repeat(2, 1fr)',
    );
    expect(directive.getRules('1fr', 2)).toBe('repeat(2, 1fr)');
    expect(directive.getRules(['1fr', '2fr'], 2)).toBe('1fr 2fr');
    expect(
      item.injector.get(BmbLayoutGridItemDirective).elementStyle,
    ).toContain('grid-area: 1 / 2 / 3 / 4');
    fixture.componentInstance.height.set('auto');
    fixture.detectChanges();
    expect(directive.elementStyle).toContain('height: auto');
  });
});
