# Code Connect migration to v1.6.4-b

> Migration evidence appendix. Current status and execution rules live in [README.md](README.md).

Migration date: 2026-08-17

## Remote baseline

- Repository: `ti-tecnologico-de-monterrey-oficial/tec-design-system-ng`
- Release tag `v1.6.4-b`: `e9b42e2a7a6ad46f9ee5f1e220aaa43e69359e16`
- Target `develop` SHA used for the audit: `94e14c2ca61c9cf011a017335f6c710d1cb5e777`
- Previous Code Connect branch SHA: `5f36fe4ddb3285bf4ccf92e74daf6ea5b690b9de`
- Migration branch: `code-connect-v1.6.4-b`

GitHub at the exact target SHA was the source of truth. The dirty historical worktree was not used to resolve paths or compare Angular APIs.

## What changed

- `projects/ds-ng/src/lib/**` moved to `ui-angular/src/lib/**`.
- Some migrated components remain under an `old/` segment; every destination was resolved against the complete remote Git tree instead of applying a blind prefix replacement.
- The public package import remains `@ti-tecnologico-de-monterrey-oficial/ds-ng`; no snippet import rewrite was necessary.
- `ui-angular/src/index.ts` replaces `projects/ds-ng/src/public-api.ts` as the public entry point.

## Audit results

- 101 parserless `.figma.ts` templates resolved.
- 96 unique Angular source files.
- 101 templates backed by a direct export from remote `ui-angular/src/index.ts`.
- 84 source files were path-only migrations.
- 12 source files had a detectable Angular declaration change and were revalidated.
- 0 missing or ambiguous remote source paths.
- 0 snippets required an API adjustment. The 12 dispositions are recorded in [REMOTE_API_AUDIT.md](REMOTE_API_AUDIT.md).

[SOURCE_PATH_MIGRATION.md](SOURCE_PATH_MIGRATION.md) contains the complete old-to-new path manifest. The two migration scripts are deterministic and fail if GitHub returns a truncated tree, a missing source or more than one exact candidate.

## Parse and publication evidence

- Official CLI: `@figma/code-connect` 1.5.3 from the pinned executable documented in [README.md](README.md).
- Full parse: 101 templates, exit code 0, no unreadable files.
- Pilot: Button (`6:4892`) published without `--force` or `--dry-run`; Figma MCP confirmed `hasTemplate: true` and the new `ui-angular` source.
- Full publication: 101 nodes validated and uploaded in six batches of at most 20. The final batch received one transient HTTP 429; the official CLI retried and completed with exit code 0.
- Post-publication MCP samples:
  - Button: connected; all returned variants use the new source.
  - Badge: 56 returned variants, all `hasTemplate: true`, all use the new source.
  - Accordion: 72 returned variants, all `hasTemplate: true`, all use the new source.
  - WebTemplates: connected and uses the new source.
  - Calendar: CLI publication succeeded again, but Figma MCP still returns no mappings for the component-set node. It remains excluded from the verified Connected count.

No `--force`, delete, detach or destructive Git operation was used.

## Inventory interpretation

- 97 public mapping rows are Connected and MCP-verified.
- Those rows cover 93 public Angular component classes plus Button and Button group directives; repeated Figma targets for Student activity card and Mobile templates explain why mapping rows and public APIs are not the same count.
- Calendar is one additional published template pending MCP visibility.
- Three `BB_1_4*` templates are internal Button group composition adapters and do not count as public API coverage.

Contract, parent/child and blocked dispositions are unchanged by this path migration. Continue them only from [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md).
