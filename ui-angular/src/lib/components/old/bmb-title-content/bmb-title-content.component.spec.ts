import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbTitleContentComponent } from './bmb-title-content.component';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

describe('BmbTitleContentTemplateComponent', () => {
  let component: BmbTitleContentComponent;
  let fixture: ComponentFixture<BmbTitleContentComponent>;
  let componentRef: ComponentRef<BmbTitleContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTitleContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTitleContentComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('componentTitle', 'Title');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a plain icon using the requested size', () => {
    componentRef.setInput('icon', 'assets/svg/warning_fill.svg');
    componentRef.setInput('iconSize', 48);
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.directive(BmbIconComponent));

    expect(icon).toBeTruthy();
    expect(icon.componentInstance.size()).toBe(48);
    expect(fixture.nativeElement.querySelector('bmb-box-icon')).toBeNull();
  });

  it('should preserve the boxed icon when a background is requested', () => {
    componentRef.setInput('icon', 'home');
    componentRef.setInput('bgIconAppearance', 'white-primary');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('bmb-box-icon')).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector(
        '.bmb_title-content-container-icon bmb-icon',
      ),
    ).toBeNull();
  });
});
