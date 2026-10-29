import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TemplateRef } from '@angular/core';
import { BmbModalComponent } from './bmb-modal.component';
import { ModalDataConfig } from '../../_shared/types';

describe('BmbModalComponent', () => {
  let component: BmbModalComponent;
  let fixture: ComponentFixture<BmbModalComponent>;
  let dialogRef: { close: jest.Mock };
  let modalData: ModalDataConfig;

  const setup = async (data: ModalDataConfig) => {
    dialogRef = { close: jest.fn() };
    modalData = data;

    await TestBed.configureTestingModule({
      imports: [BmbModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: modalData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbModalComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  };

  it('should create', async () => {
    await setup({ title: 'Test' });
    expect(component).toBeTruthy();
  });

  it('should keep the template content when it is not a string', async () => {
    const template = {} as TemplateRef<any>;
    await setup({ content: template });

    expect(component.isModalTemplate()).toBe(true);
    expect(component.getContent()).toBe(template);
  });

  it('should not set a template when content is a string', async () => {
    await setup({ content: 'plain text' });

    expect(component.isModalTemplate()).toBe(false);
    expect(component.getContent()).toBe('plain text');
  });

  describe('closeModal', () => {
    it('should run the primary action and not close when primary is clicked', async () => {
      const primaryAction = jest.fn();
      await setup({ primaryAction });

      component.closeModal('primary', true);

      expect(primaryAction).toHaveBeenCalled();
      expect(dialogRef.close).not.toHaveBeenCalled();
    });

    it('should run the secondary action and not close when secondary is clicked', async () => {
      const secondaryAction = jest.fn();
      await setup({ secondaryAction });

      component.closeModal('secondary', true);

      expect(secondaryAction).toHaveBeenCalled();
      expect(dialogRef.close).not.toHaveBeenCalled();
    });

    it('should run the close action and close when close is clicked', async () => {
      const closeAction = jest.fn();
      await setup({ closeAction });

      component.closeModal('close', true);

      expect(closeAction).toHaveBeenCalled();
      expect(dialogRef.close).toHaveBeenCalledWith(true);
    });

    it('should close directly when there is no matching action', async () => {
      await setup({});

      component.closeModal('close', false);

      expect(dialogRef.close).toHaveBeenCalledWith(false);
    });
  });

  describe('getModalClasses', () => {
    it('should return the base class when there is no size', async () => {
      await setup({});
      expect(component.getModalClasses()).toEqual(['bmb_modal']);
    });

    it('should add the size class when size is set', async () => {
      await setup({ size: 'large' });
      expect(component.getModalClasses()).toEqual([
        'bmb_modal',
        'bmb_modal-size-large',
      ]);
    });
  });

  describe('getDescriptionClasses', () => {
    it('should return the base section class by default', async () => {
      await setup({});
      expect(component.getDescriptionClasses('subtitle')).toEqual([
        'bmb_modal-content-subtitle',
      ]);
    });

    it('should add the scrollable class when scrollable is true', async () => {
      await setup({ scrollable: true });
      expect(component.getDescriptionClasses('subtitle')).toEqual([
        'bmb_modal-content-subtitle',
        'bmb_modal-content-scrollable',
      ]);
    });
  });

  describe('getButtonClass', () => {
    it('should return the secondary action classes', async () => {
      await setup({});
      expect(component.getButtonClass(true)).toEqual([
        'bmb_modal-footer-button',
        'bmb_modal-footer-btn',
        'bmb_modal-footer-button-secondary_action',
      ]);
    });

    it('should return the neutral alert class when type is alert without alertStyle', async () => {
      await setup({ type: 'alert' });
      expect(component.getButtonClass(false)).toEqual([
        'bmb_modal-footer-button',
        'bmb_modal-footer-button-neutral',
      ]);
    });

    it('should return the alertStyle class when type is alert with alertStyle', async () => {
      await setup({ type: 'alert', alertStyle: 'success' });
      expect(component.getButtonClass(false)).toEqual([
        'bmb_modal-footer-button',
        'bmb_modal-footer-button-success',
      ]);
    });

    it('should return the base class when type is not alert', async () => {
      await setup({ type: 'action' });
      expect(component.getButtonClass(false)).toEqual([
        'bmb_modal-footer-button',
      ]);
    });
  });

  describe('getImage', () => {
    it('should return an empty string when type is not alert', async () => {
      await setup({});
      expect(component.getImage()).toBe('');
    });

    it('should return the neutral image when type is alert without alertStyle', async () => {
      await setup({ type: 'alert' });
      expect(component.getImage()).toBe('assets/svg/neutral_fill.svg');
    });

    it('should return the alertStyle image when type is alert with alertStyle', async () => {
      await setup({ type: 'alert', alertStyle: 'warning' });
      expect(component.getImage()).toBe('assets/svg/warning_fill.svg');
    });
  });

  describe('getTitle / getSubtitle / getPrimaryBtnLabel / getSecondaryBtnLabel', () => {
    it('should return the data values', async () => {
      await setup({
        title: 'My title',
        subtitle: 'My subtitle',
        primaryBtnLabel: 'Accept',
        secondaryBtnLabel: 'Cancel',
      });

      expect(component.getTitle()).toBe('My title');
      expect(component.getSubtitle()).toBe('My subtitle');
      expect(component.getPrimaryBtnLabel()).toBe('Accept');
      expect(component.getSecondaryBtnLabel()).toBe('Cancel');
    });

    it('should default the primary button label to OK', async () => {
      await setup({});
      expect(component.getPrimaryBtnLabel()).toBe('OK');
    });
  });

  describe('showFooter / showPrimaryButton / showSecondaryButton / isSingleButton / extendButtons', () => {
    it('should show the footer by default', async () => {
      await setup({});
      expect(component.showFooter()).toBe(true);
      expect(component.showPrimaryButton()).toBe(true);
      expect(component.showSecondaryButton()).toBe(true);
      expect(component.isSingleButton()).toBe(false);
      expect(component.extendButtons()).toBe(false);
    });

    it('should hide the footer when both buttons are hidden', async () => {
      await setup({ hidePrimaryButton: true, hideSecondaryButton: true });
      expect(component.showFooter()).toBe(false);
    });

    it('should hide the footer when type is informative', async () => {
      await setup({ type: 'informative' });
      expect(component.showFooter()).toBe(false);
    });

    it('should report a single button when only the primary one shows', async () => {
      await setup({ hideSecondaryButton: true });
      expect(component.isSingleButton()).toBe(true);
    });

    it('should report extendButtons as true when set', async () => {
      await setup({ extendButtons: true });
      expect(component.extendButtons()).toBe(true);
    });
  });
});
