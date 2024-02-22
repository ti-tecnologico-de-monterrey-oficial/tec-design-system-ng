import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bmb-header-mobile',
  templateUrl: './bmb-header-mobile.component.html',
  styleUrls: ['../../../assets/styles/components/_header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHeaderMobileComponent {
  @Input() text: string = '';
  @Input() image: string = '';
  @Input() altImage: string = '';
  @Input() logo: string = '';
  @Input() altLogo: string = '';
  @Input() iconLeft: string = '';
  @Input() iconRight: string = '';
  @Input() iconRight2: string = '';
  @Input() iconRight3: string = '';
  @Input() isTwoIcons: boolean = false;
}
