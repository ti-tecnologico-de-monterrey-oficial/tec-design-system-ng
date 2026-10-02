// Readiness concerns the rendered story, not analytics, polling or open fetches.
export async function waitForStoryReady(page, selector = '#storybook-root', timeout = 30000) {
  await page.locator(selector).first().waitFor({ state: 'visible', timeout });
  await page.evaluate(async ({ selector, timeout }) => {
    const start = Date.now();
    let previous, stableSince = start;
    while (Date.now() - start < timeout) {
      const roots = [...document.querySelectorAll(selector)];
      const elements = roots.flatMap((root) => [root, ...root.querySelectorAll('*')]);
      const visible = elements.filter((el) => {
        const box = el.getBoundingClientRect();
        return box.width && box.height && getComputedStyle(el).visibility !== 'hidden';
      });
      const stylesLoading = [...document.querySelectorAll('link[rel="stylesheet"]')]
        .some((el) => !el.disabled && !el.sheet && (!el.media || matchMedia(el.media).matches));
      const assetsLoading = visible.some((el) => el.tagName === 'IMG' && !el.complete);
      const signature = JSON.stringify(visible.map((el) => {
        const b = el.getBoundingClientRect(), s = getComputedStyle(el);
        return [el.tagName, el.className?.baseVal ?? el.className, el.textContent,
          b.x, b.y, b.width, b.height, s.color, s.backgroundColor, s.fontSize,
          s.fontWeight, s.padding, s.gap];
      }));
      if (signature !== previous || stylesLoading || assetsLoading || document.fonts.status !== 'loaded') {
        previous = signature;
        stableSince = Date.now();
      }
      if (visible.length && Date.now() - stableSince >= 600) return;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new Error('El componente no estabilizó sus estilos, fuentes o imágenes; no se tomaron medidas.');
  }, { selector, timeout });
}

// Resolve roots from Storybook metadata or the rendered hierarchy; no library selectors.
export async function renderedComponents(page, entry = {}) {
  const host = entry.componentPath?.split('/').at(-1)?.replace(/\.(component|directive)\.[^.]+$/, '');
  const handles = await page.evaluateHandle(({ host, mode }) => {
    const visible = (el) => {
      const b = el.getBoundingClientRect();
      return b.width > 0 && b.height > 0 && getComputedStyle(el).visibility !== 'hidden';
    };
    const children = (el) => [...el.children].filter((c) => visible(c) && !['SCRIPT','STYLE'].includes(c.tagName));
    const visualRoot = (el) => {
      while (el) {
        const s = getComputedStyle(el), color = s.backgroundColor.match(/[\d.]+/g)?.map(Number);
        if ((color && (color.length === 3 || color[3] > 0)) ||
            ['paddingTop','paddingRight','paddingBottom','paddingLeft'].some((k) => parseFloat(s[k]) > 0)) return el;
        const list = children(el);
        // Own text and graphical primitives are content, never wrapper nodes.
        if ([...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim()) ||
            el.namespaceURI === 'http://www.w3.org/2000/svg' || list.length !== 1) return el;
        el = list[0];
      }
      return el;
    };
    const root = document.querySelector('#storybook-root');
    if (!root) return [];
    if (mode !== 'template' && host && /^[a-z][a-z0-9-]*-[a-z0-9-]+$/.test(host)) {
      const found = [...root.querySelectorAll(host)].filter((el) => visible(el) && !el.parentElement?.closest(host));
      if (found.length) return found.map(visualRoot);
    }
    let list = children(root);
    while (list.length === 1) {
      const el = list[0];
      if (el.tagName.includes('-') || [...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim())) return [visualRoot(el)];
      const next = children(el);
      if (next.length !== 1) {
        if (mode === 'component' && next.length > 1 && next.every((n) => n.tagName === next[0].tagName)) return next.map(visualRoot);
        return [visualRoot(el)];
      }
      list = next;
    }
    if (mode === 'component' && list.length > 1 && list.every((n) => n.tagName === list[0].tagName)) return list.map(visualRoot);
    return [root];
  }, { host, mode: entry.auditMode ?? 'component' });
  const properties = await handles.getProperties();
  const roots = [...properties.entries()].filter(([key]) => /^\d+$/.test(key)).map(([, handle]) => handle.asElement()).filter(Boolean);
  await handles.dispose();
  return roots;
}
export async function componentHandle(page, entry = {}) {
  const roots = await renderedComponents(page, entry);
  const index = entry.unitIndex ?? 0;
  if (!roots[index] || (entry.unitIndex === undefined && roots.length !== 1))
    throw new Error('La historia contiene varias raíces; identifica cada instancia antes de compararla.');
  const root = roots[index];
  for (const other of roots) if (other !== root) await other.dispose();
  return root;
}

export async function readDom(root, mode = 'component') {
  return root.evaluate((root, mode) => {
    const origin = root.getBoundingClientRect(), result = [];
    const rect = (b) => ({x:b.x-origin.x,y:b.y-origin.y,width:b.width,height:b.height});
    const visit = (el, insideComponent = false) => {
      const box = el.getBoundingClientRect(), s = getComputedStyle(el);
      if (!box.width || !box.height || s.visibility === 'hidden' || s.display === 'none') return;
      const boundary = el !== root && (el.tagName.includes('-') || el.hasAttribute('data-component'));
      const props = {width:box.width,height:box.height,text:el.textContent,
        color:s.color,backgroundColor:s.backgroundColor,fontFamily:s.fontFamily.split(',')[0].replace(/["']/g,'').trim(),
        borderColor:s.borderTopColor,opacity:Number(s.opacity)};
      for (const key of ['fontSize','fontWeight','lineHeight','paddingTop','paddingRight','paddingBottom','paddingLeft','gap','borderRadius','borderTopWidth']) {
        const value = parseFloat(s[key]);
        props[key === 'borderTopWidth' ? 'borderWidth' : key] = Number.isFinite(value) ? value : s[key];
      }
      const ownText = [...el.childNodes].filter((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
      let textBox;
      if (ownText.length === 1) {
        const range = document.createRange(), text = ownText[0];
        range.setStart(text, text.textContent.search(/\S/)); range.setEnd(text, text.textContent.trimEnd().length);
        textBox = rect(range.getBoundingClientRect());
      }
      result.push({index:result.length,isComponentRoot:el===root,componentBoundary:boundary,
        figmaNodeId:el.getAttribute('data-figma-node-id'),tag:el.tagName,
        selector:el.tagName.toLowerCase()+(typeof el.className==='string'&&el.className.trim()?'.'+el.className.trim().split(/\s+/).join('.'):''),
        leaf:!el.children.length,ownText:ownText.map((n)=>n.textContent.trim()).join(' '),
        textBox,props,box:rect(box)});
      if (mode === 'template' && boundary) return;
      for (const child of el.children) visit(child, insideComponent || boundary);
    };
    visit(root);
    return result;
  }, mode);
}
