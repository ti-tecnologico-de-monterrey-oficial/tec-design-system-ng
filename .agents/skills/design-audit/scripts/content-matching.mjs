import { scopedLayers, variantProperties } from './scope.mjs';
import { figmaTheme } from './matching.mjs';
import { expected, flatten } from './compare.mjs';
const normalized = (s) => String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const iconText = (n) => /material|icon|symbol/i.test(n.style?.fontFamily ?? '');
const texts = (node, mode = 'component') => scopedLayers(node, mode)
  .filter((n) => n.type === 'TEXT' && !iconText(n) && n.characters?.trim());
const properties = (n) => Object.fromEntries(Object.entries(expected(n)).filter(([key]) =>
  ['fontSize', 'fontWeight', 'color', 'backgroundColor', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'gap'].includes(key)));
function specification(n) {
  const content = texts(n);
  const containers = flatten(n).filter((c) => c.type !== 'TEXT' && texts(c).length);
  const unique = (items) => [...new Set(items.map((x) => JSON.stringify(x)))].sort();
  return JSON.stringify({
    variants: Object.entries(n.componentProperties ?? {}).filter(([,p]) => ['VARIANT','BOOLEAN'].includes(p.type)).map(([k,p]) => [k.split('#')[0],p.value]).sort(),
    content: content.map((t) => normalized(t.characters)).sort(),
    root: properties(n),
    text: unique(content.map((t) => [normalized(t.characters), properties(t)])),
    containers: unique(containers.map((c) => [
      texts(c).map((t) => normalized(t.characters)).sort(),
      { backgroundColor: expected(c).backgroundColor, gap: expected(c).gap },
    ])),
  });
}

// Uses content as identity evidence, never measured font/padding/color similarity.
// Repeated examples may share a reference only when its audited specifications agree.
export function associateByContent(cases, variants, features, scopeName) {
  const family = normalized(scopeName);
  for (const item of cases.filter((c) => !c.variant)) {
    const observed = features.get(item.entry.caseId ?? item.entry.id);
    if (!observed || normalized(item.entry.title?.split('/').at(-1)) !== family) continue;
    const observedTexts = observed.texts.map(normalized);
    const actual = new Set(observedTexts);
    let candidates = variants.filter((v) => ['INSTANCE', 'COMPONENT'].includes(v.node.type) && (!observed.theme || !figmaTheme(v.node) || figmaTheme(v.node) === observed.theme)).map((v) => {
      const content = texts(v.node, item.entry.auditMode).map((n) => normalized(n.characters));
      return { v, content };
    }).filter(({ content }) => content.length && content.every((t) => content.filter((v) => v === t).length <= observedTexts.filter((v) => v === t).length));
    // Prefer the reference explaining the most visible, non-icon text.
    const maximum = Math.max(0, ...candidates.map((c) => new Set(c.content).size));
    candidates = candidates.filter((c) => new Set(c.content).size === maximum);
    const groups = new Map();
    for (const { v, content } of candidates) {
      const key = specification(v.node);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push({ v, content });
    }
    if (groups.size !== 1) continue;
    const [{ v, content }, ...copies] = [...groups.values()][0];
    item.variant = v;
    item.referenceIds = [v, ...copies.map((c) => c.v)].map((c) => c.node.id);
    item.partialContent = [...actual].filter((t) => !content.includes(t));
    item.matchMethod = 'Familia seleccionada y contenido visible; referencias con especificaciones equivalentes';
    item.status = 'asociada';
    delete item.reason;
  }
}

export async function contentFeatures(page, entry, componentHandle) {
  const handle = await componentHandle(page, entry);
  const root = handle.asElement();
  if (!root) throw new Error('No se encontró el componente de la historia.');
  const result = await root.evaluate((root) => {
    let theme;
    for (let el = root.parentElement; el; el = el.parentElement) {
      const color = getComputedStyle(el).backgroundColor.match(/[\d.]+/g)?.map(Number);
      if (color?.length >= 3 && (color.length === 3 || color[3] === 1)) {
        theme = color.slice(0, 3).reduce((a,b) => a+b,0) > 382.5 ? 'light' : 'dark'; break;
      }
    }
    const tokenValues = [root.getAttribute('aria-disabled') === 'true' || root.matches(':disabled') ? 'disabled' : 'enabled', 'false'];
    for (const attr of root.attributes) {
      if (!/^(style|id|class)$/.test(attr.name)) tokenValues.push(attr.value);
    }
    const classes = typeof root.className === 'string' ? root.className : '';
    for (const name of classes.split(/\s+/)) {
      const pieces = name.split(/[-_]+/);
      for (let start = 0; start < pieces.length; start++) tokenValues.push(pieces.slice(start).join(' '));
    }
    const graphic = root.querySelector('svg,img');
    tokenValues.push(graphic ? (graphic.getBoundingClientRect().x > root.getBoundingClientRect().x + root.getBoundingClientRect().width / 2 ? 'trailing' : 'leading') : 'none');
    const tokens = tokenValues.map((v) => String(v).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim());
    return { theme, tokens,
    texts: [root, ...root.querySelectorAll('*')].filter((el) => {
      const s = getComputedStyle(el), b = el.getBoundingClientRect();
      return [...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim()) && b.width && b.height && s.visibility !== 'hidden' &&
        !el.closest('svg') && !/material|icon|symbol/i.test(s.fontFamily);
    }).map((el) => [...el.childNodes].filter((n)=>n.nodeType===Node.TEXT_NODE).map((n)=>n.textContent).join(' ').trim()).filter(Boolean),
  }; });
  await handle.dispose();
  return result;
}
export function associateByProperties(cases, variants, features, scopeName) {
  for (const item of cases.filter((c) => !c.variant)) {
    const observed = features.get(item.entry.caseId ?? item.entry.id);
    if (!observed || normalized(item.entry.title?.split('/').at(-1)) !== normalized(scopeName)) continue;
    let possible = variants.filter((v) => {
      const properties = Object.values(variantProperties(v.node));
      const theme = v.node.auditAnnotation?.theme;
      return properties.length > 0 && (!theme || !observed.theme || theme === observed.theme) &&
        properties.every((value) => observed.tokens.includes(normalized(value)));
    });
    const masters = possible.filter((v) => v.node.type === 'COMPONENT');
    if (masters.length) possible = masters;
    const groups = new Map();
    for (const v of possible) {
      const key = specification(v.node);
      groups.set(key, [...(groups.get(key) ?? []), v]);
    }
    if (groups.size !== 1) continue;
    const references = [...groups.values()][0];
    item.variant = references[0];
    item.referenceIds = references.map((v) => v.node.id);
    item.matchMethod = 'Propiedades de variante observadas en DOM y tema del contexto';
    delete item.reason;
  }
}

