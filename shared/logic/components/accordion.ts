import { SizeNames } from '../../types/utils';
import { IBmbContrast } from '../../types/colors';

export function getAccordionSizeVar(pixels: SizeNames | SizeNames[]): string {
  return Array.isArray(pixels)
    ? pixels.map((size) => `var(--bmb-radius-${size})`).join(' ')
    : `var(--bmb-radius-${pixels})`;
}

export function getAccordionClasses({
  borderRadius,
  margin,
  appearanceContrast,
  isDisabled,
  isBasic,
  isActive,
  allowExpand,
}: {
  borderRadius: SizeNames | SizeNames[];
  margin: SizeNames | SizeNames[];
  appearanceContrast: IBmbContrast;
  isDisabled: boolean;
  isBasic: boolean;
  isActive: boolean;
  allowExpand: boolean;
}): string[] {
  const classNames: string[] = [];

  if (typeof borderRadius === 'string') {
    classNames.push(`bmb_radius-${borderRadius}`);
  }

  if (typeof margin === 'string') {
    classNames.push(`bmb_margin-${margin}`);
  }

  if (appearanceContrast === 'primary') {
    classNames.push('bmb_accordion-primary');
  }

  if (appearanceContrast === 'alternative') {
    classNames.push('bmb_accordion-alternative');
  }

  if (isDisabled) {
    classNames.push('disabled');
  } else {
    if (!isBasic && isActive) classNames.push('active');
    if (isBasic && !allowExpand) classNames.push('notHovered');
  }

  return classNames;
}

export function getAccordionHeaderClasses({
  paddingHeader,
  hideToggle,
  icon,
  isExpanded,
}: {
  paddingHeader: SizeNames | SizeNames[];
  hideToggle: boolean;
  icon: string;
  isExpanded: boolean;
}): string[] {
  const classNames: string[] = [];

  if (typeof paddingHeader === 'string') {
    classNames.push(`bmb_padding-${paddingHeader}`);
  }

  if (hideToggle && !icon) {
    classNames.push('bmb_accordion-header');
  } else {
    classNames.push('bmb_accordion-header-icon');
  }

  if (isExpanded) {
    classNames.push('bmb_accordion-header-open');
  }

  return classNames;
}

export function getAccordionContentClasses({
  paddingContent,
}: {
  paddingContent: SizeNames | SizeNames[];
}): string {
  let classNames = 'bmb_accordion-content';

  if (typeof paddingContent === 'string') {
    classNames = classNames + ` bmb_padding-${paddingContent}`;
  }

  return classNames;
}

export function getAccordionStyles({
  borderRadius,
  margin,
}: {
  borderRadius: SizeNames | SizeNames[];
  margin: SizeNames | SizeNames[];
}): Record<string, string> {
  const styles: Record<string, string> = {};

  if (typeof borderRadius !== 'string') {
    styles['border-radius'] = getAccordionSizeVar(borderRadius);
  }

  if (typeof margin !== 'string') {
    styles['margin'] = getAccordionSizeVar(margin);
  }

  return styles;
}

export function getAccordionIconToggle({
  isOpen,
  isBasic,
  isExpanded,
}: {
  isOpen: boolean | undefined;
  isBasic: boolean;
  isExpanded: boolean;
}): string {
  return isOpen || (isBasic && isExpanded)
    ? 'keyboard_arrow_up'
    : 'keyboard_arrow_down';
}
