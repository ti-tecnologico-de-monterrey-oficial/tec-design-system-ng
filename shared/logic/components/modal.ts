import { IBmbNativeModalSize, ModalDataConfig } from '../../types/components/modal';

export function getModalClasses(data: ModalDataConfig): string[] {
  const baseClassName = 'bmb_modal';
  const classNames: string[] = [baseClassName];

  if (data.size) {
    return [...classNames, `${baseClassName}-size-${data.size}`];
  }

  return classNames;
}

export function getModalDescriptionClasses(
  sectionName: string,
  data: ModalDataConfig,
): string[] {
  const baseClassName = 'bmb_modal-content';
  const classNames: string[] = [`${baseClassName}-${sectionName}`];

  if (data.scrollable) {
    return [...classNames, `${baseClassName}-scrollable`];
  }

  return classNames;
}

export function getModalButtonClass(
  isSecondaryButton: boolean,
  data: ModalDataConfig,
): string[] {
  const footerClassName = 'bmb_modal-footer';
  const baseClassName = `${footerClassName}-button`;
  const classNames: string[] = [baseClassName];

  if (isSecondaryButton) {
    const newClassNames = [...classNames, `${footerClassName}-btn`];
    return [...newClassNames, `${baseClassName}-secondary_action`];
  }

  if (data.type === 'alert') {
    if (data.alertStyle) {
      return [...classNames, `${baseClassName}-${data.alertStyle}`];
    }
    return [...classNames, `${baseClassName}-neutral`];
  }

  return classNames;
}

export function getModalImage(svgUrl: string, data: ModalDataConfig): string {
  if (data.type === 'alert') {
    if (data.alertStyle) {
      return `${svgUrl}${data.alertStyle}_fill.svg`;
    }

    return `${svgUrl}neutral_fill.svg`;
  }

  return '';
}

export function showModalFooter(data: ModalDataConfig): boolean {
  const hiddenButtons = data.hidePrimaryButton && data.hideSecondaryButton;
  return data.type !== 'informative' && !hiddenButtons;
}

export function showModalPrimaryButton(data: ModalDataConfig): boolean {
  return !data.hidePrimaryButton;
}

export function showModalSecondaryButton(data: ModalDataConfig): boolean {
  return !data.hideSecondaryButton;
}

export function isModalSingleButton(data: ModalDataConfig): boolean {
  const showPrimary = showModalPrimaryButton(data);
  const showSecondary = showModalSecondaryButton(data);
  return (showPrimary && !showSecondary) || (!showPrimary && showSecondary);
}

export function getNativeModalContainerClass(
  size: IBmbNativeModalSize,
): string {
  switch (size) {
    case 'x-small':
      return 'bmb_native-modal-container-x-small';
    case 'x-large':
      return 'bmb_native-modal-container-x-large';
    case 'small':
      return 'bmb_native-modal-container-small';
    case 'large':
      return 'bmb_native-modal-container-large';
    default:
      return 'bmb_native-modal-container-medium';
  }
}
