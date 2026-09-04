#!/usr/bin/env node

import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPOSITORY =
  'ti-tecnologico-de-monterrey-oficial/tec-design-system-ng'
const DEFAULT_REF = '94e14c2ca61c9cf011a017335f6c710d1cb5e777'
const OLD_ROOT = 'projects/ds-ng/src/'
const OLD_LIB = `${OLD_ROOT}lib/`
const NEW_LIB = 'ui-angular/src/lib/'
const DOCUMENTS = [
  'CODEBASE_INVENTORY.md',
  'CONTRACT_STATE.md',
  'HANDOFF.md',
  'INVENTORY.md',
  'REMAINING_COMPONENTS.md',
]

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

const tree = githubApi(
  `repos/${REPOSITORY}/git/trees/${remoteRef}?recursive=1`,
)

if (tree.truncated) {
  throw new Error(`GitHub returned a truncated tree for ${remoteRef}`)
}

const remoteFiles = new Set(
  tree.tree.filter((entry) => entry.type === 'blob').map((entry) => entry.path),
)

function resolvePath(oldPath) {
  if (oldPath === `${OLD_ROOT}public-api.ts`) {
    const entryPoint = 'ui-angular/src/index.ts'
    if (!remoteFiles.has(entryPoint)) {
      throw new Error(`Remote entry point does not exist: ${entryPoint}`)
    }
    return entryPoint
  }

  if (!oldPath.startsWith(OLD_LIB)) {
    throw new Error(`Unsupported legacy path: ${oldPath}`)
  }

  const suffix = oldPath.slice(OLD_LIB.length)
  const [category, ...remainingSegments] = suffix.split('/')
  const remainingPath = remainingSegments.join('/')
  const candidates = [
    `${NEW_LIB}${suffix}`,
    `${NEW_LIB}${category}/old/${remainingPath}`,
  ]
  const matches = candidates.filter((candidate) => remoteFiles.has(candidate))

  if (matches.length !== 1) {
    throw new Error(
      `${oldPath} resolved to ${matches.length} exact remote candidates: ${matches.join(', ')}`,
    )
  }

  return matches[0]
}

const pathPattern = /projects\/ds-ng\/src\/(?:public-api|lib\/[A-Za-z0-9_./-]+)\.ts/g
let replacementCount = 0

for (const documentName of DOCUMENTS) {
  const documentPath = join(batchDirectory, documentName)
  const originalContent = readFileSync(documentPath, 'utf8')
  const updatedContent = originalContent.replace(pathPattern, (oldPath) => {
    replacementCount += 1
    return resolvePath(oldPath)
  })

  if (writeChanges && updatedContent !== originalContent) {
    writeFileSync(documentPath, updatedContent)
  }
}

process.stdout.write(
  `${writeChanges ? 'Updated' : 'Validated'} ${replacementCount} documented paths across ${DOCUMENTS.length} files against remote ${remoteRef}.\n`,
)
