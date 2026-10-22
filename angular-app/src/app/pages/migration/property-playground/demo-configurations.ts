import { createContainerButtonDemoConfiguration } from '../container-button-test/container-button-demo-configuration';
import { createGradesDemoConfiguration } from '../grades-test/grades-demo-configuration';
import { createEvaluationRubricDemoConfiguration } from '../evaluation-rubric-test/evaluation-rubric-demo-configuration';
import { createProfileDemoConfiguration } from '../profile-test/profile-demo-configuration';
import { DateTime } from 'luxon';
import { defaultBotList } from 'ui-angular';
import { createTimestreamDemoEvents } from '../timestream-demo-events';
import type { DemoConfiguration, DemoValue } from './demo-properties';
import { filterCardDemoControls } from './filter-card-demo-controls';
import { propertyInventory } from './property-inventory';

export function createDemoConfiguration(name: string, preset?: string): DemoConfiguration {
  if (name === 'container-button') return createContainerButtonDemoConfiguration(preset);
  if (name === 'grades') return createGradesDemoConfiguration(preset);
  if (name === 'evaluation-rubric') return createEvaluationRubricDemoConfiguration(preset);
  if (name === 'profile') return createProfileDemoConfiguration(preset);

  const now = DateTime.now();
  const initial: Record<string, Record<string, DemoValue>> = {
    'alert-center': {
      dateFormat: 'dd/MM/yyyy',
      tabsName: [
        { title: 'Notifications', isMobile: true, isDesktop: true },
        { title: 'Unread', isMobile: true, isDesktop: true },
        { title: 'Favorites', isMobile: true, isDesktop: true },
        { title: 'Archived', isMobile: true, isDesktop: true },
        { title: 'Advertisements', isMobile: true, isDesktop: true },
      ],
      hideTabs: false,
      enableMultipleSelection: true,
      showMobileVersion: false,
      emptyStateData: {
        primaryText: 'No notifications',
        secondaryText: 'You are up to date.',
        tertiaryText: '',
        size: 'large',
        showButton: true,
        buttonText: 'Refresh',
        onClick: '[callback]',
      },
      alerts: [0, 2, 12, 40].map((days, index) => ({
        id: index + 1,
        title: `Notification ${index + 1}`,
        description: [
          { type: 'paragraph', text: 'Notification details' },
          { type: 'button', text: 'Notification action', event: '[callback]' },
        ],
        date: now.minus({ days }).toFormat('dd/MM/yyyy'),
        time: '12:00',
        type: 'notification',
        isRead: index === 1,
        isFavorite: index === 2,
        isArchived: index === 3,
      })),
      advertisements: [
        {
          id: 'advertisement-1',
          title: 'Campus news',
          description: [
            { type: 'paragraph', text: 'An example advertisement.' },
          ],
          date: now.toFormat('dd/MM/yyyy'),
          time: '09:00',
          type: 'advertisement',
          isRead: false,
          isFavorite: false,
          isArchived: false,
        },
      ],
      enabledFooterOptions: { tags: true, favorites: true, archive: true },
      enableSwipe: true,
      notificationSelectionState: {},
      selectedTab: 0,
    },
    calendar: {
      view: 'week',
      filters: {},
      calendarTimezone: 'America/Mexico_City',
      clientTimezone: 'America/Mexico_City',
      height: '100%',
      calendarTitle: 'Calendar example',
      dateFormat: 'iso',
      showFilterButton: true,
      disableMobileFilter: false,
      startBusinessHour: 8,
      calendarEvents: [
        {
          id: 'class',
          title: 'Academic event',
          subtitle: 'Campus activity',
          detail: 'An example calendar event.',
          start: now.startOf('day').plus({ hours: 9 }).toISO(),
          end: now.startOf('day').plus({ hours: 11 }).toISO(),
          type: 'academic',
          calendar: 'academic',
        },
        {
          id: 'life',
          title: 'Life event',
          detail: 'A second calendar event.',
          start: now.startOf('day').plus({ hours: 12 }).toISO(),
          end: now.startOf('day').plus({ hours: 13 }).toISO(),
          type: 'life',
          calendar: 'life',
        },
      ],
      calendarLoading: false,
      language: 'es',
    },
    'chat-bar': {
      placeholder: 'Escribe un mensaje...',
      botList: defaultBotList,
      actionsList: [
        {
          name: 'Demo action',
          label: 'Demo action',
          icon: 'attach_file',
          action: '[callback]',
        },
      ],
      showEmoji: false,
      emojiIcon: 'sentiment_satisfied',
      enableMicInput: false,
      disableChangeBot: false,
      disabledInput: false,
      currentBot: { name: 'TecBot', label: 'TecBot', icon: 'bot_tecStandar' },
      isLoading: false,
      isBotSpeaking: false,
      disabledBotSpeaking: false,
    },
    'timestream-card': {
      subtitle: 'Open the filter action to filter events',
      dataLocalNav: [],
      icon: 'trending_up',
      bgIconAppearance: 'mitec-red',
      componentTitle: 'Upcoming events',
      title: undefined,
      lang: 'es',
      dateFormat: 'dd/MM/yyyy',
      events: createTimestreamDemoEvents(),
    },
    'title-content': {
      titleSize: '5',
      titleFontWeight: '600',
      subtitle: 'Subtitle',
      subtitleSize: '3',
      subtitleFontWeight: '400',
      subtitleIcon: '',
      subtitleIconSize: 0,
      isCenterContent: false,
      dataLocalNav: [],
      transparentBgC: false,
      icon: 'school',
      iconSize: 24,
      bgIconAppearance: 'mitec-blue',
      isAvatarIcon: false,
      avatarSize: 'desktop-small',
      forceSquareApp: false,
      componentTitle: 'Title with icon',
      title: undefined,
      currentBot: undefined,
    },
    timestream: {
      isMicro: false,
      lang: 'es',
      dateFormat: 'dd/MM/yyyy',
      events: createTimestreamDemoEvents(),
      clamp: { min: 100, max: '100dvh', size: '100%' },
    },
    'filter-card': {
      modalTitle: 'Opciones Filtrado',
      primaryBtnLabel: 'Aplicar Filtros',
      secondaryBtnLabel: 'Limpiar Filtros',
      icon: 'tune',
      controlTypes: filterCardDemoControls,
      inLine: false,
      showGlobalSearch: true,
      showDropdown: false,
      dropdownOptions: ['Apple', 'Banana', 'Orange', 'Pear', 'Grape'],
      placeholderSearch: 'Search',
      visibilityRules: [],
      optionRules: [],
    },
  };
  const titles: Record<string, string> = {
    'alert-center': 'Notification center',
    calendar: 'Calendar',
    'chat-bar': 'Chat bar',
    'timestream-card': 'Timestream card',
    'title-content': 'Title content',
    timestream: 'Timestream',
    'filter-card': 'Filter card',
  };
  const configuration: DemoConfiguration = {
    title: titles[name],
    properties: [...propertyInventory[name]],
    initial: initial[name],
    tall: [
      'alert-center',
      'calendar',
      'timestream-card',
      'timestream',
    ].includes(name),
  };
  if (name === 'calendar')
    configuration.properties.push(
      {
        name: 'calendarEvents',
        kind: 'json',
        type: 'IBmbCalendarEvent[]',
        shape: 'array',
        service: true,
        hint: 'Events supplied through BmbCalendarService. Dates must match dateFormat.',
      },
      {
        name: 'calendarLoading',
        kind: 'boolean',
        type: 'boolean',
        service: true,
      },
      {
        name: 'language',
        kind: 'select',
        type: 'string',
        options: ['es', 'en'],
        service: true,
      },
    );
  return configuration;
}
