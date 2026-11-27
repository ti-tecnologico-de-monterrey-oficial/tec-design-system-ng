import { useEffect, useState } from 'react';
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { getButtonClasses } from '../../_shared/logic/components/button';
import { sanitizeContent } from '../../_shared/logic/sanitizeContent';
import './styles.scss';
import type {
  IBmbHorizontalPosition,
  IButtonAppearance,
  IButtonSize,
} from '../../_shared/types';

export interface BmbButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  appearance?: IButtonAppearance;
  icon?: string;
  iconSize?: number;
  position?: IBmbHorizontalPosition;
  case?: boolean;
  size?: IButtonSize;
  isToggleActive?: boolean;
  enableButtonToggle?: boolean;
  isRounded?: boolean;
  isMobile?: boolean;
  iconAlt?: string;
}

export const BmbButton = ({
  appearance = 'primary',
  icon = '',
  iconSize = 16,
  position = 'left',
  case: isCase = false,
  size = 'small',
  isToggleActive = false,
  enableButtonToggle = false,
  isRounded = true,
  isMobile = false,
  iconAlt = 'icon',
  className,
  children,
  ...buttonProps
}: BmbButtonProps) => {
  const classes = getButtonClasses({
    appearance,
    isCase,
    enableButtonToggle,
    isToggleActive,
    isMobile,
  });

  if (!isRounded) {
    const roundedClassIndex = classes.indexOf('bmb_btn-rounded');
    if (roundedClassIndex !== -1) classes.splice(roundedClassIndex, 1);
  }

  const iconStyle: CSSProperties = {
    width: iconSize ? `${iconSize}px` : '1em',
    height: iconSize ? `${iconSize}px` : '1em',
    fontSize: iconSize ? `${iconSize}px` : undefined,
  };
  const iconIsImage = /[./]/.test(icon);
  const [iconSvg, setIconSvg] = useState('');

  useEffect(() => {
    if (!icon || iconIsImage) {
      setIconSvg('');
      return;
    }

    let isCurrentIcon = true;
    const iconName = icon.trim().replace(/\s+/g, '_').toLowerCase();

    fetch(`/assets/icons/material-rounded/${iconName}-fill.svg`)
      .then((response) => (response.ok ? response.text() : ''))
      .then((svg) => {
        if (isCurrentIcon) setIconSvg(svg ? sanitizeContent(svg) : '');
      })
      .catch(() => {
        if (isCurrentIcon) setIconSvg('');
      });

    return () => {
      isCurrentIcon = false;
    };
  }, [icon, iconIsImage]);

  let iconContent: ReactNode = null;

  if (icon && iconIsImage) {
    iconContent = (
      <span className="bmb_icon-figure" style={iconStyle}>
        <img
          className="bmb_icon-figure-image"
          src={icon}
          alt={iconAlt}
          style={iconStyle}
        />
      </span>
    );
  } else if (icon) {
    iconContent = (
      <span
        className="bmb_icon-svg"
        aria-hidden="true"
        style={iconStyle}
        dangerouslySetInnerHTML={{ __html: iconSvg }}
      />
    );
  }

  return (
    <button
      {...buttonProps}
      ref={(element) => {
        if (element) {
          element.setAttribute('size', size);
          element.setAttribute('position', position);
          if (isCase) element.setAttribute('case', 'true');
          else element.removeAttribute('case');
        }
      }}
      className={[...classes, className].filter(Boolean).join(' ')}
    >
      {position === 'right' ? <>{children}{iconContent}</> : <>{iconContent}{children}</>}
    </button>
  );
};
