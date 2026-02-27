import { IBmbDropdownItem } from '../bmb-dropdown/bmb-dropdown.component';

export interface IBmbControlType {
  title: string;
  control: {
    name: string;
    type: 'radial' | 'checkbox' | 'switch' | 'tag' | 'dropdown';
    label: string;
    checked?: boolean;
    placeholder?: string;
    rightText?: string;
    value?: string;
    id?: string;
    options?: string[] | IBmbDropdownItem[];
    isMultiSelect?: boolean;
  }[];
}
