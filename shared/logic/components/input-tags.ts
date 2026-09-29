import { IBmbDropdownItem } from '../../types/components/dropdown';
import { IDropdownItem } from '../../types';

export const parseInputTagsValue = (value: string): string[] =>
  value.split(',').map((item) => item.trim());

export const getSelectedInputTags = (
  items: IDropdownItem[],
  controlValue: string[],
): IDropdownItem[] =>
  items.filter(({ value }) => controlValue.includes(value!));

export const buildInputTagsOptions = (
  tagOptions: string[] | IBmbDropdownItem[],
  value: string,
  newOptionId: string,
): string[] | IBmbDropdownItem[] => {
  if (typeof tagOptions[0] === 'string') {
    const newTagOptions: string[] = [...(tagOptions as string[]), value];
    return [...new Set(newTagOptions)];
  }

  const newOption: IBmbDropdownItem = {
    name: value,
    value,
    selectedText: value,
    id: newOptionId,
  };
  const newList: IBmbDropdownItem[] = [
    ...(tagOptions as IBmbDropdownItem[]),
    newOption,
  ];

  return [...new Set(newList)];
};
