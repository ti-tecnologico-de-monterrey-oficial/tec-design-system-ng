type DragItemShape = {
  id: number;
  label: string;
};

export const isDragItem = (item: unknown): item is DragItemShape =>
  typeof item === 'object' &&
  item !== null &&
  'id' in item &&
  typeof item.id === 'number' &&
  'label' in item &&
  typeof item.label === 'string';

export const moveDragItem = <T extends DragItemShape>(
  leftItems: T[],
  rightItems: T[],
  item: T,
  target: 'left' | 'right',
): [T[], T[]] => {
  const nextLeftItems = leftItems.filter((currentItem) => currentItem.id !== item.id);
  const nextRightItems = rightItems.filter(
    (currentItem) => currentItem.id !== item.id,
  );

  if (target === 'left') {
    nextLeftItems.push(item);
  } else {
    nextRightItems.push(item);
  }

  return [nextLeftItems, nextRightItems];
};
