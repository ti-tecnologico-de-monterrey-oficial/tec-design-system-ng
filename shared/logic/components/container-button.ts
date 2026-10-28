import type { IBmbContainerButtonClassOptions } from '../../types/components/container-button';

export function getContainerButtonClassList(
  options: IBmbContainerButtonClassOptions,
): string[] {
  const classList = ['bmb_container-button'];
  if (options.square) {
    classList.push('bmb_container-button-square');
  }

  if (options.square && options.small && !options.iconLeft) {
    classList.push('bmb_container-button-square-no-icon');
  }

  if (options.small) {
    classList.push('bmb_container-button-small');
  }

  if (options.state === 'disabled') {
    classList.push('bmb_container-button-disabled');
  }

  if (options.state === 'error') {
    classList.push('bmb_container-button-error');
  }

  if (options.alternative) {
    classList.push('bmb_container-button-alternative');
  }
  return classList;
}
