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
e2e/                        ← Playwright E2E tests
  app.spec.ts
package.json
playwright.config.ts        ← Playwright configuration
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

**Unit Tests**: Configured using Karma and Jasmine, with test files located in `projects/ds-ng/src/lib/**/*.spec.ts`.

**E2E Tests**: Configured using Playwright. Test files are located in `e2e/`. The configuration is in `playwright.config.ts`. Playwright automatically starts `ng serve` before running tests.

```bash
npm run e2e          # headless
npm run e2e:ui       # interactive UI mode
npm run e2e:debug    # debug mode with inspector
```

**Storybook**: Used for developing and testing UI components in isolation.

## Continuous Integration

**GitHub Actions**: Three jobs run automatically on every push to `develop` and on every pull request:

| Job               | Command             | Description                                        |
| ----------------- | ------------------- | -------------------------------------------------- |
| **Build Library** | `npm run build:lib` | Verifies the library compiles successfully         |
| **E2E Tests**     | `npm run e2e`       | Runs Playwright tests; report uploaded as artifact |
| **SonarCloud**    | —                   | Static analysis and security scanning              |

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

**Run Tests**: `npm run test` (runs lint + format check + unit tests + E2E tests).

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

`feat(component / componente name): Added a new component`

More details: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## PRs

Once the code is ready to be merged into the feature-prod branch, fill out the template as directed, making sure to include the chromatic link with evidence of your changes.

If your changes have a significant impact, you should provide a reason for the changes.

### Template

---

[DS01-XXXX](https://tecdemonterrey.atlassian.net/browse/DS01-XXXX) - ISSUE_TITLE

## Changes proposed in this PR: 💻

-

## Chromatic URL

[Chromatic](https://www.chromatic.com/build?appId=65c3b4d1f966b98bb1f4e774&number=)

## Visuals 🎴

Add screenshots of the result of your changes proposed.

## Checklist ✔️

Please check all steps on the checklist

- [ ] My code matches all coding standars.
- [ ] I included the documentation files (.stories.ts).
- [ ] I ran the unit tests before submitting (`npm run test`).
- [ ] I ran the E2E tests before submitting (`npm run e2e`).
- [ ] My code resolved all of the task's acceptance criteria.

---

## Jira tokens

### API token

In order to update the Jira tokens go to: [API tokens](https://id.atlassian.com/manage-profile/security/api-tokens).

> **Important:** The user token will expire after one year.

Once you copy the new token go to: [Github Secrets](https://github.com/ti-tecnologico-de-monterrey-oficial/tec-design-system-ng/settings/secrets/actions) and update the `JIRA_TOKEN` secret with the new token.

### User ID and User token

To obtain the user token, go to the Jira home screen and click on `Teams`, once on Teams screen, search your name or team member that you need to assign the new tickets. Click on team member card and the path should look something like this `https://home.atlassian.com/o/<projectID>/people/<userToken>?cloudId=<cloudID>`.

You need to copy the `userToken` and update the `JIRA_ASSIGNEE_ID` variable in [Github Variables](https://github.com/ti-tecnologico-de-monterrey-oficial/tec-design-system-ng/settings/variables/actions).

The `JIRA_USER` must be the same user who generate the API token.

---

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
```

To test the installation you need change the library package version as beta.

`tec-design-system-ng/projects/ds-ng/package.json`

- This is an example of a beta version: `"version": "X.X.X-beta.X",`
- Run the follow command: `npm publish:beta`

**After test the installation successfully** you need to publish the latest version.

- Remove the beta version on the package file `"version": "X.X.X",`
- Run the follow command: `npm publish:latest`

## Chromatic

The order of the commands is as follows:

```
git checkout development
git pull origin development
npm i
npm run storybook
```

**Check that everything works properly**

```
npm run build-storybook
npm run chromatic
```

This documentation provides an overview of the project structure, key components, build and development processes, and configuration details. For more information, refer to the individual files and directories mentioned above.
