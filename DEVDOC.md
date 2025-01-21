# Tec Design System NG

## Overview

The "Tec Design System NG" is an Angular-based design system library that provides a collection of reusable UI components and utilities. It is designed to be used across multiple applications within an organization, ensuring a consistent look and feel.

## Project Structure

The project is organized as follows:

```
angular.json
build-storybook.log
CHANGELOG.md
commitlint.config.js
documentation.json
package.json
projects/
  ds-ng/
    src/
      assets/
      lib/
        components/
        directives/
        services/
        types/
        utils/
README.md
sonar-project.properties
src/
  app/
  assets/
  index.html
  main.ts
  styles.scss
tsconfig.app.json
tsconfig.doc.json
tsconfig.json
tsconfig.spec.json
```

## Key Directories and Files

angular.json: Angular CLI configuration.
package.json: Project dependencies and scripts.
ds-ng: The design system library source code.
src: Test application source code.

## Example Code

Here is an example of a component method from bmb-account-statement.component.ts:

```
/**
 * Retrieves a form control by name.
 *
 * @param {string} name - The name of the form control.
 * @returns {FormControl} - The form control instance.
 */
getFormControl(name: string): FormControl {
  return this.amountForm.get(name) as FormControl;
}

/**
 * Updates the error state of form controls.
 */
updateErrorState() {
  Object.keys(this.amountForm.controls).forEach((field) => {
    const control = this.amountForm.get(field);
    if (control instanceof FormControl) {
      this.showErrors[field] =
        control.invalid && (control.touched || control.dirty);
    }
  });
}

/**
 * Calculates the progress percentage.
 *
 * @returns {number} - The progress percentage.
 */
getProgressPercent(): number {
  return (100 * this.counter()) / this.totalCount();
}
```

---

# Build and Development

**Build Scripts**: Defined in package.json, including build, build-storybook, and build:lib.

**Development Server**: Run the Angular development server using ng serve.

**Linting and Formatting**: Enforced using ESLint and Prettier.

## Configuration Files

**angular.json**: Configures Angular CLI build, serve, and test options.

**tsconfig.\*.json**: TypeScript compiler options for different environments (app, library, spec).

**package.json**: Lists dependencies and scripts for various tasks.

## Testing

**Unit Tests**: Configured using Karma and Jasmine, with test files located in projects/ds-ng/src/lib/\*_/_.spec.ts.

**Storybook**: Used for developing and testing UI components in isolation.

## Continuous Integration

**GitHub Actions**: Configured in workflows for automated testing and deployment.

## Additional Tools

**Compodoc**: Generates documentation from the source code.

**Auto-Changelog**: Automatically generates changelogs based on commit history.

---

# Getting Started

**Install Dependencies**: `npm install`.

**Download the .env file** Download the env file from: Documentos/13. Design System/DS01. Tec.Design/5. Knowledge base/Desarrollo

**Add the .env File**: Add the downloaded .env file to the root of the project.

**Build the Project**: `npm run build`.

**Serve the Application**: `ng serve`.

**Run Tests**: `ng test`.

## Repository

The project is hosted on GitHub: [tec-design-system-ng](https://github.com/ti-tecnologico-de-monterrey-oficial/tec-design-system-ng)

---

## Standards v0.1

### Branches

Branch names should be the number of the Jira ticket being worked on, example:

```
git checkout development
git pull origin development
git checkout –b DS01-XXX
```

### Commits

All messages should follow the Conventional commits conventions, the structure should be as follows:

`<type>: <message>`

Types: `fix`, `feat`, `build`, `chore`, `docs`, `style`, `refactor`, `test`

**Example**:

`feat: Added a new component`

More details: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## PRs

Once the code is ready to be merged into the feature-prod branch, the following template should be added:

**Title**: _Proposed changes_

**Body**:

- Link to the task in Jira and its title
- List of proposed changes
- If applicable, a screenshot of how the proposed changes should look

## Versions

To create new versions, the SemVer standard will be used, we will follow the following flow:

```
npm version X.X.X (1.5.2)
git tag vX.X.X
git push origin development
git push origin vX.X.X
```

More details: [SemVer](https://semver.org/)

## NPM Deployment

The order of the commands is as follows:

```
git checkout development
git pull origin development
npm i
npm run build:lib
npm publish --access public
```

## Chromatic

**_This step is for admin users only._**

The order of the commands is as follows:

```
git checkout development
git pull origin development
npm i
npm run storybook
# Check that everything works properly
npm run build-storybook
npm run chromatic --project-token={token}
```

This documentation provides an overview of the project structure, key components, build and development processes, and configuration details. For more information, refer to the individual files and directories mentioned above.
