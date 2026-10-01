// Prefer the actual library component over Storybook/example wrappers.
export async function componentHandle(page) {
  return page.evaluateHandle(() => {
    const root = document.querySelector('#storybook-root');
    const cards = [...(root?.querySelectorAll('bmb-card') ?? [])].filter(
      (el) =>
        !el.parentElement?.closest('bmb-card') &&
        el.getBoundingClientRect().width &&
        el.getBoundingClientRect().height,
    );
    if (cards.length === 1)
      return cards[0].querySelector('.bmb_card') ?? cards[0];
    let el = root;
    while (el) {
      const children = [...el.children].filter(
        (c) =>
          c.getBoundingClientRect().width &&
          c.getBoundingClientRect().height &&
          !['SCRIPT', 'STYLE'].includes(c.tagName),
      );
      if (children.length !== 1) break;
      el = children[0];
      if (['BUTTON', 'INPUT', 'IMG', 'ARTICLE'].includes(el.tagName)) break;
    }
    return el;
  });
}
