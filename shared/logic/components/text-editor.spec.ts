import {
  generateTableHtml,
  getTextEditorContainerColor,
  isValidImageUrl,
} from './text-editor';

describe('text-editor', () => {
  describe('isValidImageUrl', () => {
    it('should return true for a valid URL', () => {
      expect(isValidImageUrl('https://example.com/image.png')).toBe(true);
    });

    it('should return false for an invalid URL', () => {
      expect(isValidImageUrl('not a url')).toBe(false);
    });

    it('should return false for an empty string', () => {
      expect(isValidImageUrl('')).toBe(false);
    });
  });

  describe('generateTableHtml', () => {
    it('should generate a table with the given rows and columns', () => {
      const html = generateTableHtml(2, 3);

      expect(html).toContain('<table');
      expect(html).toContain('</table>');
      const tdCount = (html.match(/<td/g) || []).length;
      expect(tdCount).toBe(6);
    });

    it('should generate an empty table body when rows or columns are 0', () => {
      const html = generateTableHtml(0, 0);
      expect(html).not.toContain('<tr>');
    });
  });

  describe('getTextEditorContainerColor', () => {
    it('should build the inline style for the given color name', () => {
      const style = getTextEditorContainerColor('red-primary');

      expect(style).toContain('var(--red-primary)');
      expect(style).toContain('background: var(--red-primary)');
    });
  });
});
