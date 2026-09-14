export const handleDropdownItemSelection = <T>(
  item: T,
  emit: (selectedItem: T) => void,
  close: () => void,
): void => {
  emit(item);
  close();
};
