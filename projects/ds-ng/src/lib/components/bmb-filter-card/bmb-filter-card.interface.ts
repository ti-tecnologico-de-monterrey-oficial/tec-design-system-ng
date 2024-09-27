export interface ControlType {
  title: string;
  control: {
    name: string;
    type: 'radial' | 'checkbox' | 'switch';
    label: string;
    checked: boolean;
    rightText?: string;
  }[];
}
