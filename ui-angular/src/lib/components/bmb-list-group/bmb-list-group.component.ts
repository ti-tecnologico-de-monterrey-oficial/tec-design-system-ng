import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  effect,
  output,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeNames } from '../../_shared/types';
import { BorderType } from '../../_shared/types/components/list-group';
import {
  getListGroupClassNames,
  getListGroupStyles,
  getListGroupVarStyles,
} from '../../_shared/logic/components/list-group';
import { BmbListGroupStatusService } from './bmb-list-group.service';


@Component({
  selector: 'bmb-list-group',
  standalone: true,
  templateUrl: './bmb-list-group.component.html',
  styleUrl: './bmb-list-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [BmbListGroupStatusService],
  imports: [CommonModule],
})
export class BmbListGroupComponent implements OnInit {
  borderRadius = input<SizeNames | SizeNames[]>('m');
  borderType = input<BorderType>('rounded');
  margin = input<SizeNames>('m');
  padding = input<SizeNames | SizeNames[]>('m');
  isMultipleSelection = input<boolean>(false);
  isRowView = input<boolean>(false);
  showControls = input<boolean>(false);
  listGroupId = input<string>('listGroupStatus');

  selectionChange = output<string[]>();

  private bmbListGroupStatusService: BmbListGroupStatusService = inject(BmbListGroupStatusService);

  constructor() {
    effect(() => {
      this.selectionChange.emit(
        this.bmbListGroupStatusService.getListGroupStatus(),
      );
    });
  }

  ngOnInit() {
    this.bmbListGroupStatusService.setListGroupConfiguration({
      isMultipleSelection: this.isMultipleSelection(),
      showControls: this.showControls(),
    });
    this.bmbListGroupStatusService.setListGroupId(this.listGroupId());
  }

  getVarStyles(size: SizeNames | SizeNames[], unit = 'spacing') {
    return getListGroupVarStyles(size, unit);
  }

  getClassNames() {
    return getListGroupClassNames({
      borderType: this.borderType(),
      showControls: this.showControls(),
      isRowView: this.isRowView(),
    });
  }

  getStyles() {
    return getListGroupStyles({
      borderRadius: this.borderRadius(),
      padding: this.padding(),
      margin: this.margin(),
    });
  }
}
