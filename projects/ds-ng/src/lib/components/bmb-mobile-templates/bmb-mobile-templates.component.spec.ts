import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BmbMobileTemplatesComponent } from './bmb-mobile-templates.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';

describe('BmbMobileTemplatesComponent', () => {
  let component: BmbMobileTemplatesComponent;
  let fixture: ComponentFixture<BmbMobileTemplatesComponent>;
  let componentRef: ComponentRef<BmbMobileTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbMobileTemplatesComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test template inputs
  it('should set template input correctly', () => {
    componentRef.setInput('template', 'header-with-footer');
    fixture.detectChanges();
    expect(component.getSectionClass()).toContain(
      'bmb_mobile-template-header-with-footer',
    );
  });

  // Test external link inputs
  it('should set external link inputs correctly', () => {
    componentRef.setInput('template', 'external-link');
    componentRef.setInput('buttonList', { subtitle: 'External Link Subtitle' });
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.bmb_external-link')),
    ).toBeTruthy();
  });
});
