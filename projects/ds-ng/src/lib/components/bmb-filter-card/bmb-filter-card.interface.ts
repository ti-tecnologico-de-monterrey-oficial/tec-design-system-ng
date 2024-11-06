export interface IBmbControlType {
  title: string;
  control: {
    name: string;
    value?: string;
    type: 'radial' | 'checkbox' | 'switch';
    label: string;
    checked: boolean;
    rightText?: string;
  }[];
}
