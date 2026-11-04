import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbProgressBarComponent } from './bmb-progress-bar.component';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BmbActionContainerComponent } from '../bmb-action-container/bmb-action-container.component';

describe('BmbProgressBarComponent', () => {
  let component: BmbProgressBarComponent;
  let fixture: ComponentFixture<BmbProgressBarComponent>;
  let componentRef: ComponentRef<BmbProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BmbIconComponent, BmbProgressBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbProgressBarComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default values', () => {
    expect(component.type()).toBe('simple');
    expect(component.totalCount()).toBe(0);
    expect(component.counter()).toBe(0);
    expect(component.title()).toBe('');
    expect(component.appearance()).toBe('info');
    expect(component.textLink()).toBe('');
    expect(component.href()).toBe('');
    expect(component.target()).toBe('_blank');
  });

  it('should calculate progress correctly', () => {
    componentRef.setInput('totalCount', 100);
    componentRef.setInput('counter', 50);
    expect(component.progressValue()).toBe('50.00');

    componentRef.setInput('counter', 0);
    expect(component.progressValue()).toBe('0.00');

    componentRef.setInput('counter', 150);
    expect(component.progressValue()).toBe('100');
  });

  it('should not set progress below 0', () => {
    componentRef.setInput('totalCount', 100);
    componentRef.setInput('counter', 10);
    expect(component.progressValue()).toBe('10.00');
  });

  it('should not set progress above 100', () => {
    componentRef.setInput('totalCount', 100);
    componentRef.setInput('counter', 200);
    expect(component.progressValue()).toBe('100');
  });

  it('should clamp a negative progress value to 0', () => {
    componentRef.setInput('totalCount', 100);
    componentRef.setInput('counter', -10);
    expect(component.progressValue()).toBe('0');
  });

  describe('progressBarColorClass', () => {
    it('should build the class from the status color', () => {
      componentRef.setInput('statusColor', 'success');
      expect(component.progressBarColorClass()).toBe(
        'bmb_progress-bar-active-success',
      );
    });
  });

  describe('container', () => {
    it('should render bmb-action-container and re-emit actionClick', () => {
      componentRef.setInput('isContainer', true);
      componentRef.setInput('actionIcon', 'delete');
      fixture.detectChanges();

      const container = fixture.debugElement.query(
        By.directive(BmbActionContainerComponent),
      );
      expect(container).toBeTruthy();

      const emitSpy = jest.spyOn(component.actionClick, 'emit');
      const event = new MouseEvent('click');
      (container.componentInstance as BmbActionContainerComponent).actionClick.emit(
        event,
      );
      expect(emitSpy).toHaveBeenCalledWith(event);
    });

    it('should hide the avatar icon for the simple type', () => {
      componentRef.setInput('isContainer', true);
      componentRef.setInput('avatarIcon', 'description');
      fixture.detectChanges();

      const container = fixture.debugElement.query(
        By.directive(BmbActionContainerComponent),
      ).componentInstance as BmbActionContainerComponent;
      expect(container.avatarIcon()).toBe('');

      componentRef.setInput('type', 'counter');
      fixture.detectChanges();
      expect(container.avatarIcon()).toBe('description');
    });
  });
});
