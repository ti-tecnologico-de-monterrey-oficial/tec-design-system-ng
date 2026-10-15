import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { BmbNativeModalComponent } from './bmb-native-modal.component';
import { BmbNativeModalService } from '../../services/old/modal/native-modal.service';

@Component({
  standalone: true,
  template: `<ng-template #tpl>content</ng-template>`,
})
class TemplateHostComponent {
  @ViewChild('tpl') templateRef!: TemplateRef<any>;
}

@Component({
  standalone: true,
  template: ``,
})
class DynamicChildComponent {
  @Input() greeting = '';
  @Output() ping = new EventEmitter<void>();
}

describe('BmbNativeModalComponent', () => {
  let component: BmbNativeModalComponent;
  let fixture: ComponentFixture<BmbNativeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbNativeModalComponent, TemplateHostComponent, DynamicChildComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbNativeModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('modalId', 'modal-1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getContainerClass', () => {
    it('should default to medium', () => {
      expect(component.getContainerClass()).toBe(
        'bmb_native-modal-container-medium',
      );
    });

    it('should return the class for the given size', () => {
      fixture.componentRef.setInput('size', 'x-small');
      fixture.detectChanges();
      expect(component.getContainerClass()).toBe(
        'bmb_native-modal-container-x-small',
      );
    });
  });

  describe('modalIcon', () => {
    it('should be empty when there is no iconStyle', () => {
      expect(component.modalIcon()).toBe('');
    });

    it('should build the icon path when iconStyle is set', () => {
      fixture.componentRef.setInput('componentTitle', 'Title');
      fixture.componentRef.setInput('iconStyle', 'success');
      fixture.detectChanges();
      expect(component.modalIcon()).toBe('assets/svg/success_fill.svg');
    });
  });

  describe('isTemplateRef / isStringContent / getContent', () => {
    it('should report string content', () => {
      fixture.componentRef.setInput('content', 'hello');
      fixture.detectChanges();
      expect(component.isStringContent()).toBe(true);
      expect(component.isTemplateRef()).toBe(false);
      expect(component.getContent()).toBeNull();
    });

    it('should report empty string content by default', () => {
      expect(component.isStringContent()).toBe(true);
      expect(component.isTemplateRef()).toBe(false);
    });

    it('should report template ref content', () => {
      const hostFixture = TestBed.createComponent(TemplateHostComponent);
      hostFixture.detectChanges();
      const templateRef = hostFixture.componentInstance.templateRef;

      fixture.componentRef.setInput('content', templateRef);
      fixture.detectChanges();

      expect(component.isTemplateRef()).toBe(true);
      expect(component.isStringContent()).toBe(false);
      expect(component.getContent()).toBe(templateRef);
    });
  });

  describe('renderContent', () => {
    it('should create the dynamic component and wire its input/output context', () => {
      const ping = jest.fn();

      fixture.componentRef.setInput('content', DynamicChildComponent);
      fixture.componentRef.setInput('inputContext', { greeting: 'hi' });
      fixture.componentRef.setInput('outputContext', { ping });
      fixture.detectChanges();

      const childDebugElement = fixture.debugElement.query(
        By.directive(DynamicChildComponent),
      );
      const childInstance: DynamicChildComponent =
        childDebugElement.componentInstance;

      expect(childInstance.greeting).toBe('hi');

      childInstance.ping.emit();

      expect(ping).toHaveBeenCalled();
    });

    it('should do nothing when content is not a Type', () => {
      expect(() => {
        component.renderContent();
      }).not.toThrow();
    });

    it('should destroy the previous dynamic component when content changes again', () => {
      fixture.componentRef.setInput('content', DynamicChildComponent);
      fixture.detectChanges();

      const firstInstance = fixture.debugElement.query(
        By.directive(DynamicChildComponent),
      ).componentInstance;

      component.renderContent();
      fixture.detectChanges();

      const secondInstance = fixture.debugElement.query(
        By.directive(DynamicChildComponent),
      ).componentInstance;

      expect(secondInstance).not.toBe(firstInstance);
    });

    it('should ignore outputContext keys that are not observable', () => {
      fixture.componentRef.setInput('content', DynamicChildComponent);
      fixture.componentRef.setInput('outputContext', { greeting: jest.fn() });

      expect(() => fixture.detectChanges()).not.toThrow();
    });
  });

  describe('handleButtonClick', () => {
    it('should emit actionsClicked', () => {
      const emitSpy = jest.spyOn(component.actionsClicked, 'emit');
      const event = new MouseEvent('click');

      component.handleButtonClick('primary', event);

      expect(emitSpy).toHaveBeenCalledWith({ buttonName: 'primary', event });
    });
  });

  describe('handleCloseModal', () => {
    it('should emit closeModalClicked and close the modal via the service', () => {
      const service = TestBed.inject(BmbNativeModalService);
      const closeSpy = jest.spyOn(service, 'closeModal');
      const emitSpy = jest.spyOn(component.closeModalClicked, 'emit');
      const event = new MouseEvent('click');

      component.handleCloseModal(event);

      expect(emitSpy).toHaveBeenCalledWith({ modalId: 'modal-1', event });
      expect(closeSpy).toHaveBeenCalledWith('modal-1');
    });
  });

  describe('handleBackdropClick', () => {
    it('should close the modal when backdrop close is not disabled', () => {
      fixture.componentRef.setInput('disableBackdropClose', false);
      fixture.detectChanges();
      const service = TestBed.inject(BmbNativeModalService);
      const closeSpy = jest.spyOn(service, 'closeModal');

      component.handleBackdropClick();

      expect(closeSpy).toHaveBeenCalledWith('modal-1');
    });

    it('should not close the modal when backdrop close is disabled', () => {
      const service = TestBed.inject(BmbNativeModalService);
      const closeSpy = jest.spyOn(service, 'closeModal');

      component.handleBackdropClick();

      expect(closeSpy).not.toHaveBeenCalled();
    });
  });
});
