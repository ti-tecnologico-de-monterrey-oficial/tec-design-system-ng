const base = require('./jest.config.cts');
const path = require('node:path');

// Retained component adaptations from migration-elements (base: 805716b6f).
// Excludes restored implementations and files changed only to repair moved imports.
const migratedComponents = [
  'src/lib/components/bmb-account-statement/bmb-account-statement.component.ts',
  'src/lib/components/bmb-ai-chat-bubble/bmb-ai-chat-bubble.component.ts',
  'src/lib/components/bmb-ai-chat-bubble/bmb-chat-actions/bmb-chat-actions.component.ts',
  'src/lib/components/bmb-ai-chat-bubble/bmb-message-renderers/bmb-template-message/bmb-template-message.component.ts',
  'src/lib/components/bmb-alert-center/bmb-alert-center.component.ts',
  'src/lib/components/bmb-calendar/common/bmb-calendar-schedule-cards/bmb-calendar-schedule-cards.component.ts',
  'src/lib/components/bmb-chat-bar/bmb-chat-bar.component.ts',
  'src/lib/components/bmb-filter-card/bmb-filter-card.component.ts',
  'src/lib/components/bmb-grades/bmb-grades.component.ts',
  'src/lib/components/bmb-login-onboarding/bmb-login-onboarding-stepper/bmb-login-onboarding-stepper-steps/bmb-login-onboarding-stepper-step-four.component.ts',
  'src/lib/components/bmb-modal/bmb-modal.component.ts',
  'src/lib/components/bmb-notice-card/bmb-notice-card.component.ts',
  'src/lib/components/bmb-table-lite/bmb-table-lite.component.ts',
  'src/lib/components/bmb-tables/bmb-tables.component.ts',
  'src/lib/components/bmb-timestream/bmb-timestream.component.ts',
];
const minimumCoverage = {
  statements: 86,
  branches: 86,
  functions: 86,
  lines: 86,
};

module.exports = {
  ...base,
  displayName: 'ui-angular-migration',
  testMatch: migratedComponents.map(
    (file) => '<rootDir>/' + file.replace(/\.ts$/, '.spec.ts'),
  ),
  collectCoverageFrom: migratedComponents,
  coverageDirectory: '../coverage/ui-angular-migration',
  coverageReporters: ['html', 'lcov', 'text-summary', 'json', 'json-summary'],
  coverageThreshold: Object.fromEntries(
    migratedComponents.map((file) => [
      path.resolve(__dirname, file),
      minimumCoverage,
    ]),
  ),
};
