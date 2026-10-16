import { ModalDataConfig } from '../../types/components/modal';
import {
  getModalButtonClass,
  getModalClasses,
  getModalDescriptionClasses,
  getModalImage,
  getNativeModalContainerClass,
  isModalSingleButton,
  showModalFooter,
  showModalPrimaryButton,
  showModalSecondaryButton,
} from './modal';

describe('modal', () => {
  describe('getModalClasses', () => {
    it('should return the base class when there is no size', () => {
      expect(getModalClasses({})).toEqual(['bmb_modal']);
    });

    it('should add the size class when size is set', () => {
      expect(getModalClasses({ size: 'large' })).toEqual([
        'bmb_modal',
        'bmb_modal-size-large',
      ]);
    });
  });

  describe('getModalDescriptionClasses', () => {
    it('should return the base section class by default', () => {
      expect(getModalDescriptionClasses('subtitle', {})).toEqual([
        'bmb_modal-content-subtitle',
      ]);
    });

    it('should add the scrollable class when scrollable is true', () => {
      expect(
        getModalDescriptionClasses('subtitle', { scrollable: true }),
      ).toEqual(['bmb_modal-content-subtitle', 'bmb_modal-content-scrollable']);
    });
  });

  describe('getModalButtonClass', () => {
    it('should return the secondary action classes', () => {
      expect(getModalButtonClass(true, {})).toEqual([
        'bmb_modal-footer-button',
        'bmb_modal-footer-btn',
        'bmb_modal-footer-button-secondary_action',
      ]);
    });

    it('should return the neutral alert class when type is alert without alertStyle', () => {
      expect(getModalButtonClass(false, { type: 'alert' })).toEqual([
        'bmb_modal-footer-button',
        'bmb_modal-footer-button-neutral',
      ]);
    });

    it('should return the alertStyle class when type is alert with alertStyle', () => {
      const data: ModalDataConfig = { type: 'alert', alertStyle: 'success' };
      expect(getModalButtonClass(false, data)).toEqual([
        'bmb_modal-footer-button',
        'bmb_modal-footer-button-success',
      ]);
    });

    it('should return the base class when type is not alert', () => {
      expect(getModalButtonClass(false, { type: 'action' })).toEqual([
        'bmb_modal-footer-button',
      ]);
    });
  });

  describe('getModalImage', () => {
    it('should return an empty string when type is not alert', () => {
      expect(getModalImage('assets/svg/', {})).toBe('');
    });

    it('should return the neutral image when type is alert without alertStyle', () => {
      expect(getModalImage('assets/svg/', { type: 'alert' })).toBe(
        'assets/svg/neutral_fill.svg',
      );
    });

    it('should return the alertStyle image when type is alert with alertStyle', () => {
      const data: ModalDataConfig = { type: 'alert', alertStyle: 'warning' };
      expect(getModalImage('assets/svg/', data)).toBe(
        'assets/svg/warning_fill.svg',
      );
    });
  });

  describe('showModalFooter', () => {
    it('should show the footer by default', () => {
      expect(showModalFooter({})).toBe(true);
    });

    it('should hide the footer when both buttons are hidden', () => {
      expect(
        showModalFooter({ hidePrimaryButton: true, hideSecondaryButton: true }),
      ).toBe(false);
    });

    it('should hide the footer when type is informative', () => {
      expect(showModalFooter({ type: 'informative' })).toBe(false);
    });
  });

  describe('showModalPrimaryButton / showModalSecondaryButton', () => {
    it('should show both buttons by default', () => {
      expect(showModalPrimaryButton({})).toBe(true);
      expect(showModalSecondaryButton({})).toBe(true);
    });

    it('should hide the buttons when hidden flags are set', () => {
      expect(showModalPrimaryButton({ hidePrimaryButton: true })).toBe(false);
      expect(showModalSecondaryButton({ hideSecondaryButton: true })).toBe(
        false,
      );
    });
  });

  describe('isModalSingleButton', () => {
    it('should be false when both buttons show', () => {
      expect(isModalSingleButton({})).toBe(false);
    });

    it('should be true when only the primary button shows', () => {
      expect(isModalSingleButton({ hideSecondaryButton: true })).toBe(true);
    });

    it('should be true when only the secondary button shows', () => {
      expect(isModalSingleButton({ hidePrimaryButton: true })).toBe(true);
    });

    it('should be false when both buttons are hidden', () => {
      expect(
        isModalSingleButton({
          hidePrimaryButton: true,
          hideSecondaryButton: true,
        }),
      ).toBe(false);
    });
  });

  describe('getNativeModalContainerClass', () => {
    it('should return the class for each known size', () => {
      expect(getNativeModalContainerClass('x-small')).toBe(
        'bmb_native-modal-container-x-small',
      );
      expect(getNativeModalContainerClass('small')).toBe(
        'bmb_native-modal-container-small',
      );
      expect(getNativeModalContainerClass('large')).toBe(
        'bmb_native-modal-container-large',
      );
      expect(getNativeModalContainerClass('x-large')).toBe(
        'bmb_native-modal-container-x-large',
      );
    });

    it('should default to medium', () => {
      expect(getNativeModalContainerClass('medium')).toBe(
        'bmb_native-modal-container-medium',
      );
    });
  });
});
