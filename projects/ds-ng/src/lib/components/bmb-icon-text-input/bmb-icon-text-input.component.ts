import { Component, ChangeDetectionStrategy, HostBinding, Optional, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: '[bmb-icon-text-input]',
  templateUrl: './bmb-icon-text-input.component.html',
  styleUrls: ['../../../assets/styles/components/_icon-text-input.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BmbIconTextInputComponent {
  // @Input() text: string = '';
  // @Input() icon: string = '';
  // @Input() image: string = '';

  @HostBinding('class.ng-invalid')
  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }

  constructor(@Optional() private readonly _ngControl?: NgControl){
  }


}
