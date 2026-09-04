#!/usr/bin/env node

import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPOSITORY_OWNER = 'ti-tecnologico-de-monterrey-oficial'
const REPOSITORY_NAME = 'tec-design-system-ng'
const OLD_REF = '5f36fe4ddb3285bf4ccf92e74daf6ea5b690b9de'
const NEW_REF = '94e14c2ca61c9cf011a017335f6c710d1cb5e777'
const BATCH_SIZE = 20
const batchDirectory = dirname(fileURLToPath(import.meta.url))

function parseMigrationRows() {
  const manifest = readFileSync(
    join(batchDirectory, 'SOURCE_PATH_MIGRATION.md'),
    'utf8',
  )
  const rows = []

  for (const line of manifest.split(/\r?\n/)) {
    const match = line.match(
      /^\| ([^|]+\.figma\.ts) \| `([^`]+)` \| `([^`]+)` \| (Yes|No) \|$/,
    )
    if (!match) continue
    rows.push({
      template: match[1].trim(),
      oldSource: match[2],
      newSource: match[3],
      publicExport: match[4] === 'Yes',
    })
  }

  if (rows.length === 0) {
    throw new Error('No migration rows found in SOURCE_PATH_MIGRATION.md')
  }

  return rows
}

function uniqueSourcePairs(rows) {
  const pairs = new Map()

  for (const row of rows) {
    const key = `${row.oldSource}\n${row.newSource}`
    const existing = pairs.get(key)
    if (existing) {
      existing.templates.push(row.template)
      continue
    }
    pairs.set(key, {
      oldSource: row.oldSource,
      newSource: row.newSource,
      templates: [row.template],
    })
  }

  return [...pairs.values()]
}

function fetchRemoteBlobs(pairs) {
  const result = new Map()

  for (let offset = 0; offset < pairs.length; offset += BATCH_SIZE) {
    const batch = pairs.slice(offset, offset + BATCH_SIZE)
    const fields = []

    batch.forEach((pair, index) => {
      const oldExpression = JSON.stringify(`${OLD_REF}:${pair.oldSource}`)
      const newExpression = JSON.stringify(`${NEW_REF}:${pair.newSource}`)
      fields.push(
        `old${index}: object(expression: ${oldExpression}) { ... on Blob { text } }`,
        `new${index}: object(expression: ${newExpression}) { ... on Blob { text } }`,
      )
    })

    const query = `query {
      repository(owner: ${JSON.stringify(REPOSITORY_OWNER)}, name: ${JSON.stringify(REPOSITORY_NAME)}) {
        ${fields.join('\n')}
      }
    }`
    const response = JSON.parse(
      execFileSync('gh', ['api', 'graphql', '-f', `query=${query}`], {
        encoding: 'utf8',
        maxBuffer: 64 * 1024 * 1024,
      }),
    )
    const repository = response.data?.repository

    if (!repository) {
      throw new Error('GitHub GraphQL did not return the repository')
    }

    batch.forEach((pair, index) => {
      result.set(pair.oldSource, {
        oldText: repository[`old${index}`]?.text ?? null,
        newText: repository[`new${index}`]?.text ?? null,
      })
    })
  }

  return result
}

function normalizeType(value = '') {
  return value.replace(/\s+/g, ' ').trim()
}

function extractPublicSurface(source) {
  const withoutComments = source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
  const selector =
    withoutComments.match(/selector\s*:\s*['"]([^'"]+)['"]/)?.[1] ?? null
  const className =
    withoutComments.match(/export\s+class\s+([A-Za-z_$][\w$]*)/)?.[1] ?? null
  const members = new Map()
  const signalPattern =
    /\b([A-Za-z_$][\w$]*)\s*=\s*(input(?:\.required)?|model|output|contentChild)\s*(?:<([\s\S]*?)>)?\s*\(/g
  const decoratorPattern =
    /@(Input|Output)\s*(?:\([^)]*\))?\s*(?:public\s+|readonly\s+)*([A-Za-z_$][\w$]*)\s*[!?]?\s*(?::\s*([^=;\n]+))?/g

  for (const match of withoutComments.matchAll(signalPattern)) {
    members.set(match[1], `${match[2]}<${normalizeType(match[3])}>`)
  }

  for (const match of withoutComments.matchAll(decoratorPattern)) {
    members.set(
      match[2],
      `${match[1].toLowerCase()}<${normalizeType(match[3])}>`,
    )
  }

  return {
    selector,
    className,
    members: Object.fromEntries([...members.entries()].sort(([a], [b]) => a.localeCompare(b))),
  }
}

function surfaceDifference(oldSurface, newSurface) {
  const oldMembers = oldSurface.members
  const newMembers = newSurface.members
  const added = Object.keys(newMembers).filter((name) => !(name in oldMembers))
  const removed = Object.keys(oldMembers).filter((name) => !(name in newMembers))
  const changed = Object.keys(oldMembers).filter(
    (name) => name in newMembers && oldMembers[name] !== newMembers[name],
  )

  return {
    selectorChanged: oldSurface.selector !== newSurface.selector,
    classChanged: oldSurface.className !== newSurface.className,
    added,
    removed,
    changed,
  }
}

function formatList(values) {
  return values.length > 0 ? values.map((value) => `\`${value}\``).join(', ') : '—'
}

function escapeCell(value) {
  return value.replaceAll('|', '\\|')
}

const migrationRows = parseMigrationRows()
const pairs = uniqueSourcePairs(migrationRows)
const remoteBlobs = fetchRemoteBlobs(pairs)
const auditRows = pairs.map((pair) => {
  const blobs = remoteBlobs.get(pair.oldSource)

  if (!blobs?.oldText || !blobs?.newText) {
    return { ...pair, status: 'missing-remote-source', difference: null }
  }

  const oldSurface = extractPublicSurface(blobs.oldText)
  const newSurface = extractPublicSurface(blobs.newText)
  const difference = surfaceDifference(oldSurface, newSurface)
  const changed =
    difference.selectorChanged ||
    difference.classChanged ||
    difference.added.length > 0 ||
    difference.removed.length > 0 ||
    difference.changed.length > 0

  return {
    ...pair,
    status: changed ? 'snippet-revalidation' : 'path-only',
    oldSurface,
    newSurface,
    difference,
  }
})

const statusCounts = auditRows.reduce((counts, row) => {
  counts[row.status] = (counts[row.status] ?? 0) + 1
  return counts
}, {})
const changedRows = auditRows.filter(
  (row) => row.status === 'snippet-revalidation',
)
const missingRows = auditRows.filter(
  (row) => row.status === 'missing-remote-source',
)

const report = [
  '# Remote Angular API audit — v1.6.4-b migration',
  '',
  `Previous remote Code Connect SHA: \`${OLD_REF}\``,
  '',
  `Target remote develop SHA: \`${NEW_REF}\``,
  '',
  `Unique mapped sources audited: **${pairs.length}**. Path-only: **${statusCounts['path-only'] ?? 0}**. Snippet revalidation: **${statusCounts['snippet-revalidation'] ?? 0}**. Missing remote sources: **${statusCounts['missing-remote-source'] ?? 0}**.`,
  '',
  'The audit compares selectors and Angular public `input`, `input.required`, `model`, `output`, `@Input`, `@Output`, and `contentChild` declarations fetched from GitHub at the exact SHAs above. Import-only changes caused by the Nx move are intentionally ignored.',
  '',
  '## Sources requiring snippet revalidation',
  '',
  '| Source | Templates | Added API | Removed API | Changed API | Selector/class |',
  '| --- | --- | --- | --- | --- | --- |',
  ...changedRows.map((row) => {
    const difference = row.difference
    const identityChanges = [
      difference.selectorChanged ? 'selector' : null,
      difference.classChanged ? 'class' : null,
    ].filter(Boolean)
    return `| \`${escapeCell(row.newSource)}\` | ${row.templates.map(escapeCell).join(', ')} | ${formatList(difference.added)} | ${formatList(difference.removed)} | ${formatList(difference.changed)} | ${identityChanges.length > 0 ? identityChanges.join(', ') : '—'} |`
  }),
  '',
  '## Missing remote sources',
  '',
  ...(missingRows.length > 0
    ? missingRows.map(
        (row) =>
          `- \`${row.oldSource}\` → \`${row.newSource}\` (${row.templates.join(', ')})`,
      )
    : ['None.']),
  '',
  '## Path-only sources',
  '',
  ...auditRows
    .filter((row) => row.status === 'path-only')
    .map((row) => `- \`${row.newSource}\` — ${row.templates.join(', ')}`),
  '',
].join('\n')

writeFileSync(join(batchDirectory, 'REMOTE_API_AUDIT.md'), report)
process.stdout.write(
  `Audited ${pairs.length} unique remote sources: ${statusCounts['path-only'] ?? 0} path-only, ${statusCounts['snippet-revalidation'] ?? 0} require snippet revalidation, ${statusCounts['missing-remote-source'] ?? 0} missing.\n`,
)
