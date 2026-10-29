# ui-angular

This library was generated with [Nx](https://nx.dev).

## Custom test IDs

Components wrapping `bmb-check-external-link-button` expose a `testId` input.
It sets `data-testid` on that internal component's host, not on the nested
native button or anchor. For example:

```html
<bmb-action-icon icon="settings" testId="settings-action" />
```

| Component | Default `testId` |
| --- | --- |
| `bmb-action-icon` | `action-icon-button` |
| `bmb-container-button` | `container-button` |
| `bmb-interactive-icon` | `interactive-icon-button` |
| `bmb-logo` | `logo-button` |
| `bmb-profile` (role switch) | `profile-change-role-button` |
| `bmb-sidebar` | `sidebar-element-button` |
| `bmb-text-link` | Its existing generated UUID |
| `bmb-top-bar` (logo) | `top-bar-logo-button` |
| `bmb-top-bar-user-section` | `top-bar-user-section-button` |
| `bmb-user-image` (with a link) | `user-image-link-button` |
| `bmb-dropdown-content` | `dropdown-content-item-button` |

`bmb-profile` also exposes `backButtonTestId` for the version-back button,
defaulting to `profile-back-to-previous-version-button`. `bmb-text-link` reuses
its existing `testId` input for both `data-testid` and `data-automation-id`.
For repeated sidebar or dropdown items, the ID applies to every item; scope
queries to the item container or use a query that returns multiple matches.

## Running unit tests

Run `nx test ui-angular` to execute the unit tests.

## Building versioned packages with Docker

From the repository root, run:

```bash
docker build -f dockers/Dockerfile-21 -t bamboo-angular:21 .
```

Use `Dockerfile-20` or `Dockerfile-22` for the other supported Angular versions.
The output image contains the compiled package at `/ui-angular`.

The versioned Dockerfiles and publishing workflow pin npm to `11.21.1`.
Dependency resolution for the Angular 21 manifest crashes with
`Cannot read properties of null (reading 'edgesOut')` on npm `10.9.9` and
`11.5.1`. Updating npm avoids that resolver failure without disabling peer
dependency checks.

Each version uses its own manifest from `package/`, so the root Angular 22
lockfile is removed inside the build container before installation. No global
Nx installation is required by the `docker-build` script.
