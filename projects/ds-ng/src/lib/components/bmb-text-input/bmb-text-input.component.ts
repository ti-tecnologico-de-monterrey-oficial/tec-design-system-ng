import { 
  Component, 
  ChangeDetectionStrategy, 
  HostBinding, 
  Optional, 
  Input,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: '[bmb-text-input]',
  templateUrl: './bmb-text-input.component.html',
  styleUrls: ['../../../assets/styles/components/_text-inputs.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTextInputComponent {

  @Input() appearance: 'normal' | 'simple' | 'main' = 'normal';
  @Input() device: 'mobile' | 'desktop' = 'desktop';
  @Input() type: 'text' | 'date' | 'datetime' | 'email' | 'number' | 'password' = 'text'


  @HostBinding('class.ng-invalid')
  get invalid(): boolean {
    return this._ngControl?.invalid ?? false;
  }  

  @HostBinding('class') get elementClass(): string {
    return `bmb-input-${this.appearance} bmb-input-${this.device}`;
  }


  constructor(
    @Optional() 
    private readonly _ngControl?: NgControl,
    ){
  }


}
