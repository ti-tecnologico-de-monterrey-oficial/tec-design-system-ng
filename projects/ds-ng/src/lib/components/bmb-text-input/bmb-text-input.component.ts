import { Component, ChangeDetectionStrategy, HostBinding, Optional, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: '[bmb-text-input]',
  templateUrl: './bmb-text-input.component.html',
  styleUrls: ['../../../assets/styles/components/_text-inputs.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTextInputComponent {

  @HostBinding('class.ng-invalid')
  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }

  constructor(@Optional() private readonly _ngControl?: NgControl){
  }


}
