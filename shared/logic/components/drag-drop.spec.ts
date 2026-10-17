import { isDragItem, moveDragItem } from './drag-drop';

describe('drag-drop', () => {
  describe('isDragItem', () => {
    it('should accept an object with a numeric id and string label', () => {
      expect(isDragItem({ id: 1, label: 'Item' })).toBe(true);
    });

    it('should reject null', () => {
      expect(isDragItem(null)).toBe(false);
    });

    it('should reject a non-object', () => {
      expect(isDragItem('item')).toBe(false);
    });

    it('should reject an object missing id', () => {
      expect(isDragItem({ label: 'Item' })).toBe(false);
    });

    it('should reject an object with a non-numeric id', () => {
      expect(isDragItem({ id: '1', label: 'Item' })).toBe(false);
    });

    it('should reject an object missing label', () => {
      expect(isDragItem({ id: 1 })).toBe(false);
    });

    it('should reject an object with a non-string label', () => {
      expect(isDragItem({ id: 1, label: 2 })).toBe(false);
    });
  });

  describe('moveDragItem', () => {
    const item = { id: 2, label: 'Item B' };
    const left = [{ id: 1, label: 'Item A' }, item];
    const right = [{ id: 3, label: 'Item C' }];

    it('should move an item to the right list', () => {
      const [nextLeft, nextRight] = moveDragItem(left, right, item, 'right');

      expect(nextLeft).toEqual([{ id: 1, label: 'Item A' }]);
      expect(nextRight).toEqual([{ id: 3, label: 'Item C' }, item]);
    });

    it('should move an item to the left list', () => {
      const [nextLeft, nextRight] = moveDragItem(
        right,
        left,
        { id: 3, label: 'Item C' },
        'left',
      );

      expect(nextLeft).toEqual([{ id: 3, label: 'Item C' }]);
      expect(nextRight).toEqual([{ id: 1, label: 'Item A' }, item]);
    });
  });
});
