import {
  SvgConfig,
  PolarCoordinates,
  ProgressCircleText,
  DrawProgressCircleParams,
  BmbProgressCirclePathStatus,
  BmbProgressCircleOptionsInterface,
  BmbProgressCircleSize,
} from '../../types/components/progress-circle';

/**
 * Converts polar coordinates to cartesian coordinates.
 */
export const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
): PolarCoordinates => {
  const angleInRadians = (angleInDegrees * Math.PI) / 180;

  return {
    x: centerX + Math.sin(angleInRadians) * radius,
    y: centerY - Math.cos(angleInRadians) * radius,
  };
};

/**
 * Calculates the vertical offset for SVG tspans.
 */
export const getRelativeY = (rowNum: number, rowCount: number): string => {
  const initialOffset = -0.18;
  const offset = 1.2;

  return `${(initialOffset + offset * (rowNum - rowCount / 2)).toFixed(2)}em`;
};

/**
 * Builds the SVG configuration for the progress circle.
 */
export const drawProgressCircle = ({
  options,
  percent,
  title,
  valueLabel,
}: DrawProgressCircleParams): SvgConfig => {
  const safePercent = Math.abs(percent);
  const circlePercent = safePercent > 100 ? 100 : safePercent;

  const boxSize = options.radius * 2 + options.outerStrokeWidth * 2;

  const centre = {
    x: boxSize / 2,
    y: boxSize / 2,
  };

  const startPoint = {
    x: centre.x,
    y: centre.y - options.radius,
  };

  const endPoint = polarToCartesian(
    centre.x,
    centre.y,
    options.radius,
    (360 * circlePercent) / 100,
  );

  const largeArcFlag = circlePercent > 50 ? 1 : 0;

  const titleData: ProgressCircleText = {
    x: centre.x,
    y: centre.y,
    textAnchor: 'middle',
    texts: [],
    tspans: [],
  };

  if (title === '') {
    titleData.texts.push(options.percent);
  } else if (Array.isArray(title)) {
    titleData.texts.push(...title);
  } else {
    titleData.texts.push(title.toString());
  }

  const valueLabelData: ProgressCircleText = {
    x: centre.x,
    y: centre.y,
    textAnchor: 'middle',
    texts: [],
    tspans: [],
  };

  valueLabelData.texts.push(valueLabel ?? '0');

  let rowCount = 0;
  let rowNum = 1;

  if (options.showTitle) {
    rowCount += titleData.texts.length;
  }

  if (options.showValueLabel) {
    rowCount += valueLabelData.texts.length;
  }

  if (options.showTitle) {
    for (const span of titleData.texts) {
      titleData.tspans.push({
        span,
        dy: getRelativeY(rowNum, rowCount),
      });

      rowNum++;
    }
  }

  if (options.showValueLabel) {
    for (const span of valueLabelData.texts) {
      valueLabelData.tspans.push({
        span,
        dy: getRelativeY(rowNum, rowCount),
      });

      rowNum++;
    }
  }

  return {
    viewBox: `0 0 ${boxSize} ${boxSize}`,
    width: options.responsive ? '100%' : boxSize,
    height: options.responsive ? '100%' : boxSize,

    backgroundCircle: {
      cx: centre.x,
      cy: centre.y,
      r:
        options.radius +
        options.outerStrokeWidth / 2 +
        options.backgroundPadding,
    },

    path: {
      d: `
        M ${startPoint.x} ${startPoint.y}
        A ${options.radius} ${options.radius}
        0 ${largeArcFlag} 1
        ${endPoint.x} ${endPoint.y}
      `,
      strokeWidth: options.outerStrokeWidth,
      strokeLinecap: options.outerStrokeLinecap,
      fill: 'none',
    },

    circle: {
      cx: centre.x,
      cy: centre.y,
      r:
        options.radius -
        options.space -
        options.outerStrokeWidth / 2 -
        options.innerStrokeWidth / 2,
      strokeWidth: options.innerStrokeWidth,
    },
  };
};

/**
 * Creates the options object used by the progress circle.
 */
export const buildProgressCircleOptions = ({
  percent,
  showTitle,
  showValueLabel,
  valueLabel,
  title,
  showBackground,
  size,
}: {
  percent: number;
  showTitle: boolean;
  showValueLabel: boolean;
  valueLabel: string;
  title: string | string[];
  showBackground: boolean;
  size: BmbProgressCircleSize | any;
}): BmbProgressCircleOptionsInterface => ({
  responsive: true,
  backgroundPadding: -9,
  radius: 100,
  space: -5,
  outerStrokeWidth: 5,
  outerStrokeLinecap: 'round',
  innerStrokeWidth: 5,
  percent,
  showTitle,
  showValueLabel,
  valueLabel,
  title,
  showBackground,
  size,
});
/**
 * Returns the CSS class for the fill path.
 */
export const getFillPathStatus = (
  status: BmbProgressCirclePathStatus,
): string => {
  return `bmb_progress-circle-fill-${status}`;
};

/**
 * Determines whether the progress circle should be rendered as fully colored.
 */
export const isProgressCircleFullColored = (
  fullFillPathStatus: boolean,
  fillPathStatus: BmbProgressCirclePathStatus,
): boolean => {
  return (
    fullFillPathStatus &&
    ['success', 'error', 'warning'].includes(fillPathStatus)
  );
};

/**
 * Determines whether the SVG progress path should be shown.
 */
export const shouldShowProgressPath = ({
  emptyState,
  percent,
  fullFillPathStatus,
  fillPathStatus,
}: {
  emptyState: boolean;
  percent: number;
  fullFillPathStatus: boolean;
  fillPathStatus: BmbProgressCirclePathStatus;
}): boolean => {
  if (emptyState) {
    return false;
  }

  return (
    !!percent &&
    !isProgressCircleFullColored(fullFillPathStatus, fillPathStatus)
  );
};

/**
 * Determines whether the value label should be displayed.
 */
export const shouldShowValueLabel = ({
  showOperationState,
  fillPathStatus,
  showValueLabel,
  fullFillPathStatus,
}: {
  showOperationState: boolean;
  fillPathStatus: BmbProgressCirclePathStatus;
  showValueLabel: boolean;
  fullFillPathStatus: boolean;
}): boolean => {
  if (
    showOperationState &&
    (fillPathStatus === 'success' || fillPathStatus === 'error')
  ) {
    return showValueLabel;
  }

  return (
    showValueLabel &&
    !isProgressCircleFullColored(fullFillPathStatus, fillPathStatus)
  );
};

/**
 * Returns the icon that should be displayed.
 */
export const getDisplayIcon = ({
  fullFillPathStatus,
  fillPathStatus,
  icon,
}: {
  fullFillPathStatus: boolean;
  fillPathStatus: BmbProgressCirclePathStatus;
  icon: string;
}): string => {
  if (fullFillPathStatus && fillPathStatus === 'success') {
    return 'check_circle';
  }

  if (fullFillPathStatus && fillPathStatus === 'error') {
    return 'error';
  }

  return icon;
};

/**
 * Returns the container CSS classes.
 */
export const getProgressCircleContainerClasses = ({
  emptyState,
  showOperationState,
  fillPathStatus,
}: {
  emptyState: boolean;
  showOperationState: boolean;
  fillPathStatus: BmbProgressCirclePathStatus;
}): string[] => {
  const classes: string[] = [];

  if (emptyState) {
    classes.push('bmb_progress-circle-empty');
  }

  if (showOperationState && fillPathStatus === 'success') {
    classes.push('bmb_progress-circle-operation-success');
  }

  if (showOperationState && fillPathStatus === 'error') {
    classes.push('bmb_progress-circle-operation-error');
  }

  return classes;
};
