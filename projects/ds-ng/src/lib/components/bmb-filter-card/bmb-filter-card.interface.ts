export interface IBmbControlType {
  title: string;
  control: {
    name: string;
    type: 'radial' | 'checkbox' | 'switch' | 'tag';
    label: string;
    checked: boolean;
    rightText?: string;
    value?: string;
    id?: string;
  }[];
}
