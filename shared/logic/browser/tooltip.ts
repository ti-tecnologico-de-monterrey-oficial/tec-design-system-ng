import type { TooltipContentOptions } from '../../types/components/tooltip';
export const createTooltipContent = ({
  title,
  text,
  document,
}: TooltipContentOptions): HTMLElement => {
  const section = document.createElement('section');

  section.className = 'bmb_tooltip';
  section.setAttribute('aria-describedby', 'tooltip-content');

  if (title) {
    const titleElement = document.createElement('strong');
    titleElement.textContent = title;
    section.appendChild(titleElement);
  }

  if (text) {
    const textElement = document.createElement('span');
    textElement.textContent = text;
    section.appendChild(textElement);
  }

  return section;
};
