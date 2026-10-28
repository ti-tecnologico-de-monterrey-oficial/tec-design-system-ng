export function getInnerHeaderLeftIcon(
  showClose: boolean,
  showReturn: boolean,
): string {
  if (!showClose && showReturn) return 'arrow_back';
  if (showClose && !showReturn) return 'close';

  return '';
}
