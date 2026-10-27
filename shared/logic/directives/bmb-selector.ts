export function getBmbSelectorElementClass(options: {
  idSelector: number | string;
  activeSelectorID: number | string;
}): string[] {
  const classList = ['bmb_selector'];
  const idSelector = String(options.idSelector);
  const activeSelectorID = String(options.activeSelectorID);

  if (idSelector !== activeSelectorID) {
    classList.push('bmb_selector-hidden');
  }
  return classList;
}
