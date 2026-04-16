import { Component, input } from '@angular/core';

export type BmbCustomIconListType =
  | 'bmb_android'
  | 'bmb_apple'
  | 'bmb_drive'
  | 'bmb_facebook'
  | 'bmb_instagram'
  | 'bmb_teams'
  | 'bmb_twitter'
  | 'bmb_whatsapp'
  | 'bmb_youtube';

export const BmbCustomIconList: BmbCustomIconListType[] = [
  'bmb_android',
  'bmb_apple',
  'bmb_drive',
  'bmb_facebook',
  'bmb_instagram',
  'bmb_teams',
  'bmb_twitter',
  'bmb_whatsapp',
  'bmb_youtube',
];

@Component({
  selector: 'bmb-custom-icons',
  standalone: true,
  imports: [],
  templateUrl: './bmb-custom-icons.component.html',
})
export class BmbCustomIconsComponent {
  icon = input.required<BmbCustomIconListType>();
  size = input<number | undefined>();
}
