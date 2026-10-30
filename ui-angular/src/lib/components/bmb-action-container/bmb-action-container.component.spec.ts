import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BmbActionContainerComponent } from './bmb-action-container.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';

@Component({
  standalone: true,
  imports: [BmbActionContainerComponent],
  template: `<bmb-action-container><p class="projected">Content</p></bmb-action-container>`,
})
class HostComponent {}

describe('BmbActionContainerComponent', () => {
  let component: BmbActionContainerComponent;
  let fixture: ComponentFixture<BmbActionContainerComponent>;
  let componentRef: ComponentRef<BmbActionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbActionContainerComponent, HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbActionContainerComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create without icons by default', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('bmb-icon')).toBeNull();
    expect(fixture.nativeElement.querySelector('bmb-action-icon')).toBeNull();
  });

  it('should project content', () => {
    const host = TestBed.createComponent(HostComponent);
    host.detectChanges();
    expect(
      host.nativeElement.querySelector('.bmb_action-container .projected'),
    ).toBeTruthy();
  });

  it('should render the avatar icon with the error class', () => {
    componentRef.setInput('avatarIcon', 'description');
    componentRef.setInput('isError', true);
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector(
      '.bmb_action-container-icon',
    );
    expect(icon).toBeTruthy();
    expect(icon.classList).toContain('bmb_action-container-error');
  });

  it('should render the status icon', () => {
    componentRef.setInput('showStatusIcon', true);
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector(
        '.bmb_action-container-icon-successful',
      ),
    ).toBeTruthy();
  });

  it('should render the action icon with its id element', () => {
    componentRef.setInput('actionIcon', 'delete');
    componentRef.setInput('actionIdElement', 'custom_action');
    fixture.detectChanges();

    const actionIcon = fixture.debugElement.query(
      By.directive(BmbActionIconComponent),
    ).componentInstance as BmbActionIconComponent;
    expect(actionIcon.icon()).toBe('delete');
    expect(actionIcon.idElement()).toBe('custom_action');
  });

  it('should prevent default, stop propagation and emit actionClick', () => {
    const emitSpy = jest.spyOn(component.actionClick, 'emit');
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    } as unknown as MouseEvent;

    component.handleClick(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith(event);
  });
});
