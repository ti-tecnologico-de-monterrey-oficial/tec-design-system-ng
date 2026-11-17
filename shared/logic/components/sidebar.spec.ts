import { SidebarElement } from '../../types/components/sidebar';
import {
  getSidebarLink,
  getSidebarValidationErrors,
  hasSidebarChildren,
} from './sidebar';

const createSidebarElement = (
  id: number,
  title: string,
  link?: string,
  children?: SidebarElement[],
): SidebarElement => ({
  id,
  icon: 'home',
  title,
  link,
  children,
});

describe('sidebar', () => {
  describe('hasSidebarChildren', () => {
    it('should be true when the element has children', () => {
      const element = createSidebarElement(1, 'Parent', undefined, [
        createSidebarElement(2, 'Child'),
      ]);
      expect(hasSidebarChildren(element)).toBe(true);
    });

    it('should be false when the element has no children', () => {
      const element = createSidebarElement(1, 'Leaf', '/leaf');
      expect(hasSidebarChildren(element)).toBe(false);
    });
  });

  describe('getSidebarLink', () => {
    it('should return an empty string when the element has children', () => {
      const element = createSidebarElement(1, 'Parent', '/parent', [
        createSidebarElement(2, 'Child'),
      ]);
      expect(getSidebarLink(element)).toBe('');
    });

    it('should return the link when the element has no children', () => {
      const element = createSidebarElement(1, 'Leaf', '/leaf');
      expect(getSidebarLink(element)).toBe('/leaf');
    });

    it('should return an empty string when there is no link', () => {
      const element = createSidebarElement(1, 'Leaf');
      expect(getSidebarLink(element)).toBe('');
    });
  });

  describe('getSidebarValidationErrors', () => {
    it('should return no errors for a valid configuration', () => {
      expect(
        getSidebarValidationErrors([[createSidebarElement(1, 'A')]]),
      ).toEqual([]);
    });

    it('should flag more than two groups', () => {
      const errors = getSidebarValidationErrors([
        [createSidebarElement(1, 'A')],
        [createSidebarElement(2, 'B')],
        [createSidebarElement(3, 'C')],
      ]);

      expect(errors).toEqual([
        'The sidebar component only supports two levels of navigation',
      ]);
    });

    it('should flag more than eight elements in the first level', () => {
      const errors = getSidebarValidationErrors([
        Array.from({ length: 9 }, (_, i) =>
          createSidebarElement(i, `Item ${i}`),
        ),
      ]);

      expect(errors).toEqual([
        'The sidebar component only supports a maximum of 8 elements in the first level of navigation',
      ]);
    });

    it('should report both errors when both conditions are met', () => {
      const errors = getSidebarValidationErrors([
        Array.from({ length: 9 }, (_, i) => createSidebarElement(i, `A${i}`)),
        [createSidebarElement(100, 'B')],
        [createSidebarElement(101, 'C')],
      ]);

      expect(errors).toHaveLength(2);
    });
  });
});
