import DOMPurify from 'dompurify';
import { forbidTagsAndAttributes } from './utils';

/**
 * Sanitizes HTML content using DOMPurify before bypassing Angular's built-in sanitization.
 * This is safe because:
 * 1. Content is pre-sanitized with DOMPurify using restrictive forbidTagsAndAttributes config
 * 2. DOMPurify removes all potentially dangerous HTML/JS content
 * 3. Only safe HTML tags and attributes are allowed through the configuration
 */
export const sanitizeContent = (html: string): string => {
  return DOMPurify.sanitize(html, forbidTagsAndAttributes);
};
