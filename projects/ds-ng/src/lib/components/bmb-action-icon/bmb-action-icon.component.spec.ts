import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbActionIconComponent } from './bmb-action-icon.component';
import { ChangeDetectionStrategy, ComponentRef } from '@angular/core';

describe('BmbActionIconComponent', () => {
  let component: BmbActionIconComponent;
  let fixture: ComponentFixture<BmbActionIconComponent>;
  let componentRef: ComponentRef<BmbActionIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbActionIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbActionIconComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('icon', 'face');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit buttonPress on handlePress', () => {
    spyOn(component.buttonPress, 'emit');
    component.handlePress();
    expect(component.buttonPress.emit).toHaveBeenCalled();
  });

  it('should emit buttonClick on handleClick', () => {
    spyOn(component.buttonClick, 'emit');
    component.handleClick();
    expect(component.buttonClick.emit).toHaveBeenCalled();
  });

  it('should return correct icon when isToggleActive is true', () => {
    componentRef.setInput('isToggleActive', true);
    componentRef.setInput('toggleIconActive', 'toggle');
    expect(component.getIcon()).toBe('toggle');
  });

  it('should return correct icon when isToggleActive is false', () => {
    componentRef.setInput('isToggleActive', false);
    componentRef.setInput('toggleIconActive', 'toggle');
    expect(component.getIcon()).toBe('face');
  });

  it('should return correct icon when toggleIconActive is undefined', () => {
    componentRef.setInput('isToggleActive', true);
    componentRef.setInput('toggleIconActive', undefined);
    expect(component.getIcon()).toBe('face');
  });
});
