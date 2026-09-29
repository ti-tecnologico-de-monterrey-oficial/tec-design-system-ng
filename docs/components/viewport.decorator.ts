// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withDocsViewport = (story: any, context: any) => {
  const viewportValue = context.globals?.viewport?.value;
  const viewportOptions = context.parameters?.viewport?.options ?? {};
  const viewportSize = viewportOptions[viewportValue]?.styles;

  if (!viewportSize) return story();

  return {
    ...story(),
    template: `
      <div style="width: ${viewportSize.width};  margin: 0 auto;  overflow: auto;">
        ${story().template}
      </div>
    `,
    props: story().props,
  };
};

export const getViewportStoryParameters = (
  isMobile: boolean,
  sourceCode: string,
) => ({
  parameters: {
    layout: 'padded',
    docs: { source: { code: sourceCode, language: 'html' } },
  },
  globals: {
    viewport: { value: isMobile ? 'small' : 'large', isRotated: false },
  },
});
