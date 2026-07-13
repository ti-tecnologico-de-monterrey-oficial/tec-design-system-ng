import {
  getCardClasses,
  getCardStyles,
  getPaddingClasses,
  getPaddingStyles,
  type IBmbBgColor,
  type IBmbBoxShadowStyle,
  type IBmbCardType,
} from '../../_core/logic/components/card/card';
import { type SizeNames } from '../../_core/types';
import { type CSSProperties, type ReactNode } from 'react';
import './bmb-card.scss';

const toReactStyles = (styles: Record<string, string>): CSSProperties => {
  return Object.fromEntries(
    Object.entries(styles).map(([key, value]) => [
      key.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase()),
      value,
    ]),
  ) as CSSProperties;
};

export interface BmbCardProps {
  borderRadius?: SizeNames | SizeNames[];
  margin?: SizeNames | SizeNames[];
  type?: IBmbCardType;
  state?: 'disabled' | 'error' | 'normal';
  boxShadowStyle?: IBmbBoxShadowStyle | 'none';
  borderColor?: IBmbBgColor | 'default';
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface BmbCardSectionProps {
  padding?: SizeNames | SizeNames[];
  colorBackground?: IBmbBgColor | null;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface BmbCardContentProps extends BmbCardSectionProps {
  setBorderRadius?: boolean;
}

export function BmbCard({
  borderRadius = 'm',
  margin = 'm',
  type = 'normal',
  state = 'normal',
  boxShadowStyle = 'none',
  borderColor = 'default',
  className = '',
  style,
  children,
}: BmbCardProps) {
  const sectionClasses = [
    'bmb_card',
    ...getCardClasses({
      borderRadius,
      margin,
      type,
      boxShadowStyle,
    }),
    state !== 'normal' ? `bmb_card-state-${state}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const computedStyles = {
    ...toReactStyles(
      getCardStyles({
        borderRadius,
        margin,
        borderColor,
      }),
    ),
    ...style,
  };

  return (
    <section className={sectionClasses} style={computedStyles}>
      {children}
    </section>
  );
}

export function BmbCardHeader({
  padding = 'm',
  colorBackground = null,
  className = '',
  style,
  children,
}: BmbCardSectionProps) {
  const headerClasses = ['bmb_card-header', ...getPaddingClasses(padding), className]
    .filter(Boolean)
    .join(' ');

  const computedStyles = {
    ...toReactStyles(
      getPaddingStyles({
        padding,
        colorBackground,
      }),
    ),
    ...style,
  };

  return (
    <header className={headerClasses} style={computedStyles}>
      {children}
    </header>
  );
}

export function BmbCardFooter({
  padding = 'm',
  colorBackground = null,
  className = '',
  style,
  children,
}: BmbCardSectionProps) {
  const footerClasses = ['bmb_card-footer', ...getPaddingClasses(padding), className]
    .filter(Boolean)
    .join(' ');

  const computedStyles = {
    ...toReactStyles(
      getPaddingStyles({
        padding,
        colorBackground,
      }),
    ),
    ...style,
  };

  return (
    <footer className={footerClasses} style={computedStyles}>
      {children}
    </footer>
  );
}

export function BmbCardContent({
  padding = 'm',
  colorBackground = null,
  setBorderRadius = false,
  className = '',
  style,
  children,
}: BmbCardContentProps) {
  const contentClasses = [
    'bmb_card-content',
    ...getPaddingClasses(padding),
    setBorderRadius ? 'bmb_card-content-with-radius' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const computedStyles = {
    ...toReactStyles(
      getPaddingStyles({
        padding,
        colorBackground,
      }),
    ),
    ...style,
  };

  return (
    <section className={contentClasses} style={computedStyles}>
      {children}
    </section>
  );
}

export default BmbCard;
