import { CSSProperties } from 'react';
import {
  useMaterialRoundedIcon,
  type UseMaterialRoundedIconOptions,
} from './use-material-rounded-icon';

export interface MaterialRoundedIconProps extends UseMaterialRoundedIconOptions {
  className?: string;
  style?: CSSProperties;
  title?: string;
  fallback?: JSX.Element | null;
}

export function MaterialRoundedIcon({
  iconName,
  isFilled,
  basePath,
  className,
  style,
  title,
  fallback = null,
}: MaterialRoundedIconProps) {
  const { svg } = useMaterialRoundedIcon({
    iconName,
    isFilled,
    basePath,
  });

  if (!svg) {
    return fallback;
  }

  return (
    <span
      className={className}
      style={style}
      title={title}
      aria-hidden={title ? undefined : true}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default MaterialRoundedIcon;
