export type IBmbProjectedContentMode = 'over' | 'partial' | 'outside';

export interface IBmbProjectionContent<TContent = never, TTarget = never> {
  id?: string;
  content: TContent;
  targetRef?: TTarget;
  mode?: IBmbProjectedContentMode;
  fixSizeToRef?: boolean;
  inputContext?: { [key: string]: any };
  showBackdrop?: boolean;
  outputContext?: { [key: string]: (value: any) => void };
  focusOnOpen?: boolean;
  dialogClass?: string | string[] | Record<string, boolean>;
  forceMobileCenter?: boolean;
  beforeCloseContent?: (event: {
    contentId: string;
    reason: 'single' | 'all';
  }) => void;
  afterCloseContent?: (event: {
    contentId: string;
    reason: 'single' | 'all';
  }) => void;
  afterOpenContent?: (event: {
    contentId: string;
    reason: 'single' | 'all';
  }) => void;
}
