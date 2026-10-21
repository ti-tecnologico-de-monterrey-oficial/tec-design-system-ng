import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  filterTimestreamCardEvents,
  getTimestreamCardClasses,
} from '../../_shared/logic/components/timestream-card';
import { logDeprecatedInput } from '../../_shared/logic/logDeprecatedInput';
import type { IBmbDataTopBar } from '../../_shared/types';
import type { IBmbActionHeader } from '../../_shared/types';
import type { IBmbColor } from '../../_shared/types/colors';
import type { IBmbControlType } from '../../_shared/types/components/filter-card';
import type {
  IBmbClamp,
  ITimelineEvent,
} from '../../_shared/types/components/timestream';
import { TranslatePipe } from '../../pipes/translations';
import { BmbTranslationsService } from '../../services/translations/translations.service';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card/bmb-card.component';
import { BmbFilterCardComponent } from '../bmb-filter-card/bmb-filter-card.component';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbTimestreamComponent } from '../bmb-timestream/bmb-timestream.component';

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
    CommonModule,
    TranslatePipe,
  ],
  templateUrl: './bmb-timestream-card.component.html',
  styleUrl: './bmb-timestream-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTimestreamCardComponent implements OnInit {
  private readonly translationsService = inject(BmbTranslationsService);

  subtitle = input<string>();
  dataLocalNav = input<IBmbDataTopBar[]>([]);
  icon = input<string>('trending_up');
  bgIconAppearance = input<IBmbColor>('mitec-red');
  componentTitle = input<string>(); // once title is removed, this should be required

  title = input<string>(); // deprecated

  lang = input<string>('es');
  dateFormat = input<string>('dd/MM/yyyy');
  events = input<ITimelineEvent[]>([]);

  constructor() {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );

      if (!deprecatedTitle && !newTitle) {
        throw new Error(
          'The "componentTitle" input is required. Please provide a value for it.',
        );
      }
    });
  }

  clamp: IBmbClamp = { min: 0, max: '100%', size: '100%' };
  isMobile = false;
  actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'tune',
      isToggleActive: false,
      action: () => {
        this.handleCloseFilters();
      },
    },
  ];
  isFiltersEnabled = false;
  filteredEvents = signal<ITimelineEvent[]>([]);
  filters: IBmbControlType[] = [
    {
      title: this.translationsService.translate('timestream_card.filters.type'),
      control: [
        {
          name: 'pending',
          type: 'checkbox',
          label: this.translationsService.translate(
            'timestream_card.filters.pending',
          ),
          checked: false,
        },
        {
          name: 'done',
          type: 'checkbox',
          label: this.translationsService.translate(
            'timestream_card.filters.done',
          ),
          checked: false,
        },
        {
          name: 'active',
          type: 'checkbox',
          label: this.translationsService.translate(
            'timestream_card.filters.active',
          ),
          checked: false,
        },
        {
          name: 'under_review',
          type: 'checkbox',
          label: this.translationsService.translate(
            'timestream_card.filters.under_review',
          ),
          checked: false,
        },
      ],
    },
    {
      title: this.translationsService.translate(
        'timestream_card.filters.instances',
      ),
      control: [
        {
          name: 'instances',
          type: 'radial',
          label: this.translationsService.translate(
            'timestream_card.filters.all',
          ),
          checked: true,
        },
        {
          name: 'instances',
          type: 'radial',
          label: this.translationsService.translate(
            'timestream_card.filters.multiple',
          ),
          checked: false,
        },
        {
          name: 'instances',
          type: 'radial',
          label: this.translationsService.translate(
            'timestream_card.filters.one',
          ),
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
    this.filteredEvents.set(filterTimestreamCardEvents(filters, this.events()));
  }

  getClassList(): string[] {
    return getTimestreamCardClasses(this.isFiltersEnabled);
  }
}
