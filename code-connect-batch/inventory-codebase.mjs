import fs from 'node:fs'
import path from 'node:path'

const sourceRoot = 'projects/ds-ng/src'
const publicApiPath = path.join(sourceRoot, 'public-api.ts')
const publicApi = fs.readFileSync(publicApiPath, 'utf8')
const exportPaths = [
  ...new Set(
    [...publicApi.matchAll(/export \* from '\.\/(lib\/components\/[^']+\.component)';/g)].map(
      (match) => `${match[1]}.ts`,
    ),
  ),
]

function propertyNames(source, factory) {
  const expression = new RegExp(
    `^\\s*(\\w+)\\s*=\\s*${factory}(?:\\.required)?(?:<[^;=()]+>)?\\s*\\(`,
    'gm',
  )
  return [...source.matchAll(expression)].map((match) => match[1])
}

const components = exportPaths
  .map((relativePath) => {
    const filePath = path.join(sourceRoot, relativePath)
    if (!fs.existsSync(filePath)) return null

    const source = fs.readFileSync(filePath, 'utf8')
    const selector = source.match(/selector:\s*['"`]([^'"`]+)['"`]/)?.[1]
    const className = source.match(/export class\s+(\w+)/)?.[1]
    if (!selector || !className) return null

    const storyPath = filePath.replace(/\.component\.ts$/, '.stories.ts')
    const mdxPath = filePath.replace(/\.component\.ts$/, '.mdx')
    return {
      selector,
      className,
      source: path.join(sourceRoot, relativePath),
      documented: fs.existsSync(storyPath) || fs.existsSync(mdxPath),
      inputs: propertyNames(source, 'input'),
      models: propertyNames(source, 'model'),
      outputs: propertyNames(source, 'output'),
    }
  })
  .filter(Boolean)
  .sort((left, right) => left.selector.localeCompare(right.selector))

const inventory = {
  exportedSourceFiles: exportPaths.length,
  publicComponents: components.length,
  documentedComponents: components.filter((component) => component.documented)
    .length,
  components,
}

if (process.argv.includes('--candidates')) {
  const candidates = components.filter((component) =>
    component.documented &&
    component.inputs.length + component.models.length <= 5 &&
    component.outputs.length <= 1,
  )
  console.log(candidates.map((component) =>
    `${component.selector}\t${component.className}\t${component.inputs.concat(component.models).join(', ') || '-'}\t${component.source}`,
  ).join('\n'))
} else {
  console.log(JSON.stringify(inventory, null, 2))
}
