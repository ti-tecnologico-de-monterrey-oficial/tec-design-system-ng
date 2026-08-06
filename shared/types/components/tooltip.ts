export interface TooltipPosition {
  top: string | null;
  left: string | null;
  right: string | null;
  bottom: string | null;
}

export interface TooltipContentOptions {
  title?: string;
  text?: string;
  document: Document;
}

export interface TooltipPositionOptions {
  targetElement: HTMLElement;
  tooltipWidth: number;
  windowWidth: number;
  windowHeight: number;
}

export interface TooltipStyle {
  position: string;
  top: string;
  right: string;
  bottom: string;
  left: string;
  margin: string;
}
