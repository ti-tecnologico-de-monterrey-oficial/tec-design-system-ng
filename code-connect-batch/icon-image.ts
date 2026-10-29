import figma from 'figma'

const image = Object.entries(figma.selectedInstance.properties ?? {})
  .find(([name]) => name.split('#')[0] === 'image')?.[1]

export function getIcon(
  fallback: string,
  format: 'attribute' | 'typescript' | 'expression' = 'attribute',
): string {
  const source = typeof image === 'string' && image && image !== 'on' && image !== 'off'
    ? image
    : fallback
  const value = format === 'attribute'
    ? source
    : JSON.stringify(source).replace(/</g, '\\u003c')

  return format === 'typescript'
    ? value
    : value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
