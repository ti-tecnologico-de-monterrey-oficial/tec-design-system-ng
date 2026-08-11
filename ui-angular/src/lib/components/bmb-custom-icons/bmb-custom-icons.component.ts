import { Component, input } from '@angular/core';
import { getUUID } from '@shared/logic/utils';
import type { BmbCustomIconListType } from '../../_shared/types/components/bmb-custom-icons';

@Component({
  selector: 'bmb-custom-icons',
  standalone: true,
  imports: [],
  templateUrl: './bmb-custom-icons.component.html',
})
export class BmbCustomIconsComponent {
  icon = input.required<BmbCustomIconListType>();
  size = input<number | undefined>();
  testId = input<string>(getUUID());
}
