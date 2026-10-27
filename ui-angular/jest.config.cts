process.env.TZ = 'America/Mexico_City';

module.exports = {
  displayName: 'ui-angular',
  testPathIgnorePatterns: ['/node_modules/', '/compat/'],
  preset: '../jest.preset.js',
  resolver: '../scripts/jest-angular-compat-resolver.cjs',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../coverage/ui-angular',
  coverageReporters: ['html', 'lcov', 'text-summary'],
  coverageThreshold: Object.fromEntries(
    [
      './compat/logic/formControl.ts',
      './compat/logic/utils.ts',
      './compat/logic/components/datepicker.ts',
      './compat/logic/components/form-validator.ts',
      './compat/logic/components/input-phone-number.ts',
      './compat/logic/components/input-validator.ts',
      './compat/logic/components/totp.ts',
      './src/lib/directives/old/bmb-button-group/bmb-button-group.directive.ts',
      './src/lib/directives/old/bmb-selector/bmb-selector.directive.ts',
      './src/lib/directives/old/bmb-layout-grid/bmb-layout-grid.directive.ts',
    ].map((file) => {
      const minimum = file.endsWith('/input-validator.ts') ? 95 : 85;
      return [
        require('node:path').resolve(__dirname, file),
        {
          statements: minimum,
          branches: minimum,
          functions: minimum,
          lines: minimum,
        },
      ];
    }),
  ),
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
