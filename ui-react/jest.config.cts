module.exports = {
  displayName: 'ui-react',
  preset: '../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../coverage/ui-react',
  coverageReporters: ['html', 'lcov', 'text-summary'],
  testPathIgnorePatterns: [
    '<rootDir>/src/lib/_shared/logic/components/totp.spec.ts',
    '<rootDir>/src/lib/_shared/logic/components/datepicker.spec.ts',
    '<rootDir>/src/lib/_shared/logic/components/form-validator.spec.ts',
    '<rootDir>/src/lib/_shared/logic/components/input-phone-number.spec.ts',
  ],
};
