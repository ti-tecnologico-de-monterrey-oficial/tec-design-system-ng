import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbTooltipBaseComponent } from './bmb-tooltip-base.component';

describe('BmbTooltipBaseComponent', () => {
  let component: BmbTooltipBaseComponent;
  let fixture: ComponentFixture<BmbTooltipBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTooltipBaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTooltipBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.hideTooltip();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update floating tooltip content when inputs change while open', () => {
    fixture.componentRef.setInput('componentTitle', 'Initial title');
    fixture.componentRef.setInput('text', 'Initial text');
    fixture.detectChanges();

    component.showTooltip();

    let tooltip = document.body.querySelector('.bmb_tooltip-dialog');

    expect(tooltip?.textContent).toContain('Initial title');
    expect(tooltip?.textContent).toContain('Initial text');

    fixture.componentRef.setInput('componentTitle', 'Updated title');
    fixture.componentRef.setInput('text', 'Updated text');
    fixture.detectChanges();

    tooltip = document.body.querySelector('.bmb_tooltip-dialog');

    expect(tooltip?.textContent).toContain('Updated title');
    expect(tooltip?.textContent).toContain('Updated text');
    expect(tooltip?.textContent).not.toContain('Initial title');
    expect(tooltip?.textContent).not.toContain('Initial text');
  });
});
