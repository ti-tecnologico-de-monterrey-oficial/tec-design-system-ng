#!/usr/bin/env node

import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPOSITORY =
  'ti-tecnologico-de-monterrey-oficial/tec-design-system-ng'
const DEFAULT_REF = '94e14c2ca61c9cf011a017335f6c710d1cb5e777'
const OLD_PREFIX = 'projects/ds-ng/src/lib/'
const NEW_PREFIX = 'ui-angular/src/lib/'

const argumentsList = process.argv.slice(2)
const writeChanges = argumentsList.includes('--write')
const refIndex = argumentsList.indexOf('--ref')
const remoteRef = refIndex >= 0 ? argumentsList[refIndex + 1] : DEFAULT_REF
const batchDirectory = dirname(fileURLToPath(import.meta.url))

if (!remoteRef) {
  throw new Error('Missing value for --ref')
}

function githubApi(endpoint) {
  return JSON.parse(
    execFileSync('gh', ['api', endpoint], {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    }),
  )
}

function getRemoteFiles() {
  const response = githubApi(
    `repos/${REPOSITORY}/git/trees/${remoteRef}?recursive=1`,
  )

  if (response.truncated) {
    throw new Error(`GitHub returned a truncated tree for ${remoteRef}`)
  }

  return new Set(
    response.tree
      .filter((entry) => entry.type === 'blob')
      .map((entry) => entry.path),
  )
}

function getPublicApi() {
  const response = githubApi(
    `repos/${REPOSITORY}/contents/ui-angular/src/index.ts?ref=${remoteRef}`,
  )

  if (response.encoding !== 'base64') {
    throw new Error('Unexpected GitHub encoding for ui-angular/src/index.ts')
  }

  return Buffer.from(response.content.replace(/\n/g, ''), 'base64').toString(
    'utf8',
  )
}

function resolveSource(source, remoteFiles) {
  if (!source.startsWith(OLD_PREFIX)) {
    return remoteFiles.has(source) ? source : null
  }

  const suffix = source.slice(OLD_PREFIX.length)
  const [category, ...remainingSegments] = suffix.split('/')
  const remainingPath = remainingSegments.join('/')
  const candidates = [
    `${NEW_PREFIX}${suffix}`,
    `${NEW_PREFIX}${category}/old/${remainingPath}`,
  ]
  const matches = candidates.filter((candidate) => remoteFiles.has(candidate))

  if (matches.length !== 1) {
    throw new Error(
      `${source} resolved to ${matches.length} exact remote candidates: ${matches.join(', ')}`,
    )
  }

  return matches[0]
}

function isPublicExport(source, publicApi) {
  if (!source.startsWith('ui-angular/src/')) return false

  const exportPath = `./${source
    .slice('ui-angular/src/'.length)
    .replace(/\.ts$/, '')}`

  return publicApi.includes(`'${exportPath}'`)
}

function escapeCell(value) {
  return value.replaceAll('|', '\\|')
}

const remoteFiles = getRemoteFiles()
const publicApi = getPublicApi()
const templateFiles = readdirSync(batchDirectory)
  .filter((fileName) => fileName.endsWith('.figma.ts'))
  .sort()

const rows = templateFiles.map((fileName) => {
  const filePath = join(batchDirectory, fileName)
  const originalContent = readFileSync(filePath, 'utf8')
  const sourceMatch = originalContent.match(/^\/\/ source=(.+)$/m)

  if (!sourceMatch) {
    throw new Error(`${fileName} does not contain a // source= header`)
  }

  const oldSource = sourceMatch[1].trim()
  const newSource = resolveSource(oldSource, remoteFiles)

  if (!newSource) {
    throw new Error(`${fileName}: remote source does not exist: ${oldSource}`)
  }

  const publicExport = isPublicExport(newSource, publicApi)

  if (writeChanges && oldSource !== newSource) {
    const updatedContent = originalContent.replace(
      `// source=${oldSource}`,
      `// source=${newSource}`,
    )
    writeFileSync(filePath, updatedContent)
  }

  return { fileName, oldSource, newSource, publicExport }
})

const uniqueSources = new Set(rows.map((row) => row.newSource))
const publicCount = rows.filter((row) => row.publicExport).length
const manifest = [
  '# Code Connect source-path migration — v1.6.4-b',
  '',
  `Remote repository: \`${REPOSITORY}\``,
  '',
  `Remote source SHA: \`${remoteRef}\``,
  '',
  `Templates resolved: **${rows.length}**; unique source files: **${uniqueSources.size}**; templates backed by a direct \`ui-angular/src/index.ts\` export: **${publicCount}**.`,
  '',
  '| Template | Previous source | v1.6.4-b/develop source | Public export |',
  '| --- | --- | --- | --- |',
  ...rows.map(
    (row) =>
      `| ${escapeCell(row.fileName)} | \`${escapeCell(row.oldSource)}\` | \`${escapeCell(row.newSource)}\` | ${row.publicExport ? 'Yes' : 'No'} |`,
  ),
  '',
  'Generated from the GitHub tree and public entry point at the exact remote SHA above. The previous workspace source tree was not used to resolve destinations.',
  '',
].join('\n')

if (writeChanges) {
  writeFileSync(join(batchDirectory, 'SOURCE_PATH_MIGRATION.md'), manifest)
}

process.stdout.write(
  `${writeChanges ? 'Updated' : 'Validated'} ${rows.length} templates; ${uniqueSources.size} unique sources; ${publicCount} templates have a direct public export.\n`,
)
