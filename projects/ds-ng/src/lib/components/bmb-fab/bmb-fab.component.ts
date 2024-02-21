import { 
  Component,
  ChangeDetectionStrategy, 
  HostBinding,
  HostListener, 
  Optional, 
  Input,
  ViewEncapsulation,
 } from '@angular/core';

@Component({
  selector: 'bmb-fab',
  templateUrl: './bmb-fab.component.html',
  styleUrls: ['../../../assets/styles/components/_fabs.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BmbFabComponent {


  @Input() icon = '';
  @Input() text?: string | null = 'TEXTO';
  @Input() size?: 's' | 'l' = 's';
  @Input() type?: 'ext' | 'fab'  = 'fab';
  @Input() device?: 'mobile' | 'desktop' = 'mobile';

  active: boolean = false;

  closeIcon = 'close';
  
  fabStyle = '';

  @HostListener('click') myClick(){ 
    if(this.type == 'fab'){
      this.active = !this.active
    }
  }

  constructor() {
  }

  ngOnInit(){
    this.fabStyle = this.setStyles()
    console.log(this.fabStyle)
  }


  setStyles(){
    let style = 'fab';
    if(this.device == 'mobile'){
      style = `${style}-mob`
    }else{
      style = `${style}-des`
    }
    if(this.size == 's'){
      style = `${style}-s`
    }else {
      style = `${style}-l`
    }

    if(this.type === 'ext'){
      style = `${style}-fab-ext`
    }else{
      style = `${style}-fab-normal`
    }
   return style
  }

}
