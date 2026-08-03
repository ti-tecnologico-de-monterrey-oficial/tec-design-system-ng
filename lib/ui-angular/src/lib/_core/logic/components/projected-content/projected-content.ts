import {
  ComponentRef,
  TemplateRef,
  Type,
} from '@angular/core';

import {
  DialogClassParams,
  ProjectedContentPositionParams,
  RenderProjectedContentParams,
} from './types';

export const getProjectedContentPosition = ({
  htmlRef,
  mode,
  fixSizeToRef,
}: ProjectedContentPositionParams) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (!htmlRef) {
    return {};
  }

  const targetPosition = htmlRef.getBoundingClientRect();

  let offset = 0;

  if (mode === 'partial') {
    offset = targetPosition.height / 2;
  }

  if (mode === 'outside') {
    offset = targetPosition.height + 8;
  }

  const left =
    targetPosition.left <= width / 2
      ? `${targetPosition.left.toFixed(0)}px`
      : 'auto';

  const right =
    targetPosition.left > width / 2
      ? `${(width - targetPosition.right).toFixed(0)}px`
      : 'auto';

  const top =
    targetPosition.top <= height / 2
      ? `${(targetPosition.top + offset).toFixed(0)}px`
      : 'auto';

  const bottom =
    targetPosition.top > height / 2
      ? `${(height - (targetPosition.bottom - offset)).toFixed(0)}px`
      : 'auto';

  return {
    inset: `${top} ${right} ${bottom} ${left}`,
    width: fixSizeToRef
      ? `${targetPosition.width.toFixed(0)}px`
      : 'auto',
    display: 'flex',
    'max-height': `calc(100dvh - (${top} + ${bottom} + 1rem))`,
    'justify-content':
      width > 1000 && width / 2 ? 'flex-end' : 'flex-start',
  };
};

export const renderProjectedContent = ({
  container,
  componentRef,
  content,
  inputContext,
  outputContext,
}: RenderProjectedContentParams): ComponentRef<any> | null => {
  container.clear();

  componentRef?.destroy();

  if (!content) {
    return null;
  }

  if (isTemplateRef(content)) {
    container.createEmbeddedView(content);
    return null;
  }

  const ref = container.createComponent(content);

  const instance = ref.instance as any;

  Object.keys(inputContext).forEach((key) => {
    ref.setInput(key, inputContext[key]);
  });

  Object.keys(outputContext).forEach((key) => {
    if (instance[key]?.subscribe) {
      instance[key].subscribe((event: unknown) =>
        outputContext[key](event),
      );
    }
  });

  return ref;
};

export const buildDialogClasses = ({
  fixSizeToRef,
  dialogClass,
  forceMobileCenter,
}: DialogClassParams): Record<string, boolean> => {
  const classes: Record<string, boolean> = {
    'bmb_projected-content-fix-size': fixSizeToRef,
  };

  if (forceMobileCenter) {
    classes['bmb_projected-content-force-mobile-center'] = true;
  }

  if (typeof dialogClass === 'string') {
    dialogClass
      .split(' ')
      .filter(Boolean)
      .forEach((c) => (classes[c] = true));
  } else if (Array.isArray(dialogClass)) {
    dialogClass.forEach((c) => (classes[c] = true));
  } else if (dialogClass) {
    Object.assign(classes, dialogClass);
  }

  return classes;
};

export const isTemplateRef = (
  value: unknown,
): value is TemplateRef<any> => {
  return !!value && typeof (value as any).createEmbeddedView === 'function';
};