import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbIconStatusComponent } from './bmb-icon-status.component';
import { ComponentRef } from '@angular/core';

describe('BmbIconStatusComponent', () => {
  let component: BmbIconStatusComponent;
  let fixture: ComponentFixture<BmbIconStatusComponent>;
  let componentRef: ComponentRef<BmbIconStatusComponent>;

  beforeEach(async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => '<svg viewBox="0 0 24 24"></svg>',
    } as Response);

    await TestBed.configureTestingModule({
      imports: [BmbIconStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbIconStatusComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('icon', 'close');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the icon size from statusAppearance', () => {
    expect(component.getIconSize()).toBe(120);

    componentRef.setInput('statusAppearance', 'success');
    expect(component.getIconSize()).toBe(60);
  });

  it('should build the status appearance class name', () => {
    expect(component.getClassName('status', 'warning')).toBe(
      'status-warning',
    );
    expect(component.getClassName('status', '')).toBe('');
  });
});
