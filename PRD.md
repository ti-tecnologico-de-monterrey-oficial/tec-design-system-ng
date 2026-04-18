# Product Requirements Document (PRD)

## Project Overview

The `@ti-tecnologico-de-monterrey-oficial/ds-ng` is the official Design System of Tecnológico de Monterrey. It aims to provide a consistent, elegant, and functional foundation for building memorable user experiences across all digital platforms.

## Objectives

- Ensure design consistency across all applications.
- Provide reusable and modular UI components.
- Enhance developer productivity by offering pre-built, tested, and documented components.
- Support accessibility and responsiveness for a wide range of devices and users.

## Key Features

### Core Components

- **UI Components**: A library of Angular-based components such as buttons, modals, dropdowns, and more.
- **Theming**: Customizable themes to align with the institution's branding.
- **Accessibility**: Built-in support for WCAG compliance.

### Utilities

- **Date and Time Handling**: Powered by Luxon for robust date and time manipulation.

### Documentation

- Comprehensive documentation for all components and utilities.
- Examples and use cases to guide developers.

## Technical Requirements

### Dependencies

- **Angular**: Core framework for building the components.
- **RxJS**: Reactive programming library.
- **Luxon**: For date and time utilities.
- **Material Symbols**: For consistent iconography.
- **Playwright**: End-to-end testing framework for the demo application.

### Compatibility

- Angular version: `^18.0.0` and above.
- Browser support: Latest versions of Chrome, Firefox, Safari, and Edge.

### Performance

- Optimized for fast loading and minimal bundle size.
- Lazy loading support for components.

## User Stories

### Personas

1. **Developers**: Need a reliable and easy-to-use library to build consistent UIs.
2. **Designers**: Require a system that aligns with the institution's branding and design principles.
3. **End Users**: Expect a seamless and accessible experience across all platforms.

### Scenarios

- As a developer, I want to integrate pre-built components to save time and ensure consistency.
- As a designer, I want to customize themes to match the institution's branding.
- As an end user, I want the interface to be accessible and responsive on all devices.

## Quality Assurance

### Testing Strategy

- **Unit Tests**: Component-level tests via Karma/Jasmine (`ng test ds-ng`), including linting and format checks.
- **End-to-End Tests**: Playwright tests covering navigation and rendering of the demo application (`npm run e2e`).
- **Static Analysis**: SonarCloud integration for code quality and security scanning on every push to `develop` and every pull request.

### CI/CD Pipeline

All of the following jobs run automatically on every push to `develop` and on every pull request:

| Job               | Purpose                                            | Blocks merge on failure |
| ----------------- | -------------------------------------------------- | :---------------------: |
| **Build Library** | Verifies `npm run build:lib` compiles successfully |           ✅            |
| **E2E Tests**     | Runs Playwright tests against the demo app         |           ✅            |
| **SonarCloud**    | Static analysis and security scanning              |           ✅            |

A Playwright HTML report is uploaded as a GitHub Actions artifact (retained 7 days) for every run.

Publishing to NPM is triggered separately on GitHub Release events and supports multi-version builds (Angular 18, 19, 20).

## Roadmap

### Phase 1: Core Components

- Develop foundational components (buttons, modals, etc.).
- Ensure WCAG compliance.

### Phase 2: Advanced Features

- Add utilities for date/time and phone number handling.
- Introduce theming capabilities.

### Phase 3: Documentation and Support

- Publish comprehensive documentation.
- Provide examples and best practices.

## Risks and Mitigation

### Risks

- **Dependency Updates**: Changes in Angular or other dependencies may cause compatibility issues.
- **Performance**: Large bundle sizes could impact loading times.
- **Multi-framework Support**: Expanding to React requires careful separation of framework-agnostic logic, types, and tokens to avoid duplication.

### Mitigation

- Regularly update dependencies and test compatibility.
- Optimize components for performance and enable lazy loading.
- Adopt a monorepo structure with a shared `bamboo-core` package containing design tokens, TypeScript interfaces, and pure utilities consumed by both Angular and React libraries.
