import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  contentChildren,
  input,
  output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { BmbThreeColsComponent } from '../../bmb-three-cols/bmb-three-cols.component';

@Component({
  selector: 'bmb-container-button-base',
  standalone: true,
  imports: [CommonModule, BmbThreeColsComponent],
  templateUrl: './bmb-container-button-base.component.html',
  styleUrl: './bmb-container-button-base.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbContainerButtonBaseComponent {
  isDisable = input<boolean>(false);
  isError = input<boolean>(false);

  getClickButton = output<MouseEvent>();

  containerLeft = contentChildren<TemplateRef<any>>('bmbContainerLeft');
  containerMain = contentChild<TemplateRef<any>>('bmbContainerMain');
  containerRight = contentChildren<TemplateRef<any>>('bmbContainerRight');

  handleClick(event: any): void {
    this.getClickButton.emit(event);
  }
}
