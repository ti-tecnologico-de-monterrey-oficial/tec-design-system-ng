export function isInsideClickOutsideContainer(
  elementToCheck: HTMLElement,
  containerElement: HTMLElement,
): boolean {
  return (
    elementToCheck === containerElement ||
    containerElement.contains(elementToCheck) ||
    elementToCheck?.classList?.contains('modal-persist')
  );
}
