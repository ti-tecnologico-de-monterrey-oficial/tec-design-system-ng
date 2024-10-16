import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import { IBmbColor } from '../../types/colors';
import { IBmbDataTopBar } from '../bmb-breadcrumb/bmb-breadcrumb.component';
import { IBmbActionHeader } from '../bmb-header-section/bmb-header-section.component';
import {
  BmbTimestreamComponent,
  IBmbClamp,
} from '../bmb-timestream/bmb-timestream.component';
import { IBmbTimestreamFilters, ITimelineEvent } from '../bmb-timestream/types';
import { BmbFilterCardComponent } from '../bmb-filter-card/bmb-filter-card.component';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card/bmb-card.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { IBmbControlType } from '../bmb-filter-card/bmb-filter-card.interface';
import { timestreamFilter } from '../../utils/timestreamFilters';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-timestream-card',
  standalone: true,
  imports: [
    BmbHomeCardComponent,
    BmbIconComponent,
    BmbTimestreamComponent,
    BmbFilterCardComponent,
    BmbCardComponent,
    BmbCardContentComponent,
    CommonModule
  ],
  templateUrl: './bmb-timestream-card.component.html',
  styleUrl: './bmb-timestream-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTimestreamCardComponent {
  title = input.required<string>();
  subtitle = input<string>();
  dataLocalNav = input<IBmbDataTopBar[]>([]);
  icon = input<string>('trending_up');
  bgIconAppearance = input<IBmbColor>('mitec-red');

  lang = input<string>('es');
  dateFormat = input<string>('dd/MM/yyyy');
  events = input<ITimelineEvent[]>([]);

  clamp: IBmbClamp = { min: 0, max: '100%', size: '100%' };
  isMobile: boolean = false;
  actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'tune',
      isToggleActive: false,
      action: () => {
        this.handleCloseFilters();
      },
    },
  ];
  isFiltersEnabled: boolean = false;
  filteredEvents = signal<ITimelineEvent[]>([]);
  filters: IBmbControlType[] = [
    {
      title: 'Tipo',
      control: [
        {
          name: 'pending',
          type: 'checkbox',
          label: 'Pendiente',
          checked: false,
        },
        {
          name: 'done',
          type: 'checkbox',
          label: 'Finalizado',
          checked: false,
        },
        {
          name: 'active',
          type: 'checkbox',
          label: 'Iniciado',
          checked: false,
        },
        {
          name: 'under_review',
          type: 'checkbox',
          label: 'En revisión',
          checked: false,
        },
      ],
    },
    {
      title: 'Instacias',
      control: [
        {
          name: 'instances',
          type: 'radial',
          label: 'Todas',
          checked: true,
        },
        {
          name: 'instances',
          type: 'radial',
          label: 'Múltiple',
          checked: false,
        },
        {
          name: 'instances',
          type: 'radial',
          label: 'Una',
          checked: false,
        },
      ],
    },
  ];

  ngOnInit() {
    this.filteredEvents.set(this.events());
  }

  handleCloseFilters() {
    this.isFiltersEnabled = !this.isFiltersEnabled;
  }

  handleFiltersChange(filters: any) {
    this.isFiltersEnabled = !this.isFiltersEnabled;
    const activeFilters = Object.keys(filters);
    const validFilters = activeFilters.filter((filter) => {
      if (typeof filters[filter] === 'string') return filters[filter] !== '';
      return filters[filter].checked;
    });

    if (!validFilters.length) {
      this.filteredEvents.set(this.events());
    } else {
      const filtersValue = validFilters.reduce((obj: IBmbTimestreamFilters, filter) => {
        if (filter === 'instances') return {...obj,  instances: filters[filter].label};
        if (filter === 'search') return {...obj,  text: filters[filter]};
        const types = obj?.type || [];
        return {...obj, type: [...types, filter]};
      }, {});

      this.filteredEvents.set(timestreamFilter(this.events(), filtersValue));
    }
  }

  getClassList(): string[] {
    const classList = ['bmb-timestream-card-filters'];
    if (this.isFiltersEnabled) classList.push('bmb-timestream-card-filters-active');
    return classList;
  }
}
