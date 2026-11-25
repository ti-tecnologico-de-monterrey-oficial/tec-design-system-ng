import figma from 'figma'

export function getBoxIconColor(
  fallback: string,
  layerName = '',
  path?: string[],
): string {
  const boxIcon = layerName
    ? figma.selectedInstance.findInstance(layerName, { traverseInstances: true, path })
    : figma.selectedInstance

  const color = boxIcon?.type === 'INSTANCE'
    ? boxIcon.getPropertyValue('boxColor')
    : undefined

  return typeof color === 'string' && color ? color : fallback
}
