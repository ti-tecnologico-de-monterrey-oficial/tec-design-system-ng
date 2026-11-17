import figma from 'figma'

export function getBoxIconColor(
  fallback: string,
  layerName = '',
  path?: string[],
): string {
  const boxIcon = layerName
    ? figma.selectedInstance.findInstance(layerName, { traverseInstances: true, path })
    : figma.selectedInstance

  return boxIcon.type === 'INSTANCE'
    ? boxIcon.getPropertyValue('boxColor') as string
    : fallback
}
