export type IBmbFilterControlType = 'radial' | 'checkbox' | 'switch';

export interface IBmbControlType {
  title: string;
  control: {
    name: string;
    value?: string;
    type: IBmbFilterControlType;
    label: string;
    checked: boolean;
    leftText?: string;
    rightText?: string;
  }[];
}
