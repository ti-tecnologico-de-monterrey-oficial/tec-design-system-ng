export function parseLink(value) {
  let text = String(value).trim();
  const markdown = text.match(/^\[[\s\S]*?\]\((https?:\/\/[\s\S]+)\)$/);
  if (markdown) text = markdown[1];
  if (text.startsWith('<') && text.endsWith('>')) text = text.slice(1, -1);
  text = text.replace(/\\([&?#_()])/g, '$1').replace(/&amp;/g, '&');
  try {
    return new URL(text);
  } catch {
    throw new Error(
      'Enlace inválido. Pega una URL completa que empiece con https:// o http://.',
    );
  }
}
export function figmaError(status, body = {}) {
  const reason = String(body.err ?? body.message ?? '').toLowerCase();
  let message =
    'Revisa vigencia del token, permiso file_content:read y acceso al archivo.';
  if (reason.includes('expired'))
    message = 'El token venció. Genera uno nuevo y pégalo cuando se solicite.';
  else if (reason.includes('invalid token'))
    message =
      'El token no es válido. Copia un token de acceso de Figma completo.';
  else if (reason.includes('scope'))
    message = 'Al token le falta un permiso. Necesita file_content:read.';
  else if (status === 404)
    message = 'Archivo o nodo no encontrado, o sin acceso para esta cuenta.';
  else if (status === 429) message = 'Límite de API; inténtalo después.';
  return `Figma HTTP ${status}. ${message}`;
}
export function figmaLink(value) {
  const u = parseLink(value);
  const match = u.pathname.match(/^\/(design|file|proto)\/([\w-]+)/);
  const nodeId = u.searchParams.get('node-id')?.replace(/-/g, ':');
  if (
    (u.hostname !== 'www.figma.com' && u.hostname !== 'figma.com') ||
    !match ||
    !nodeId
  )
    throw new Error(
      'Pega el enlace de Figma con el componente seleccionado (node-id).',
    );
  return {
    fileKey: match[2],
    nodeId,
    url: `https://www.figma.com/design/${match[2]}?node-id=${encodeURIComponent(nodeId)}`,
  };
}
export function storyLink(value) {
  const u = parseLink(value);
  if (!['http:', 'https:'].includes(u.protocol) || u.username || u.password)
    throw new Error('Usa un enlace HTTP/HTTPS sin contraseñas.');
  if (['www.chromatic.com', 'chromatic.com'].includes(u.hostname))
    throw new Error(
      'Abre View Storybook en Chromatic y pega ese enlace publicado.',
    );
  const path = u.searchParams.get('path');
  const id = u.searchParams.get('id') ?? path?.replace(/^\/(story|docs)\//, '');
  const base = new URL('./', u);
  return {
    base: base.href,
    id,
    docs:
      path?.startsWith('/docs/') || u.searchParams.get('viewMode') === 'docs',
    args: u.searchParams.get('args'),
    globals: u.searchParams.get('globals'),
  };
}
export const flatten = (n) =>
  n.visible === false ? [] : [n, ...(n.children ?? []).flatMap(flatten)];
export const escape = (s) =>
  String(s ?? '').replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ],
  );
export function expected(n) {
  const p = {};
  if (n.absoluteBoundingBox)
    Object.assign(p, {
      width: n.absoluteBoundingBox.width,
      height: n.absoluteBoundingBox.height,
    });
  for (const k of [
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
  ])
    if (n[k] !== undefined) p[k] = n[k];
  if (typeof n.cornerRadius === 'number') p.borderRadius = n.cornerRadius;
  if (['HORIZONTAL', 'VERTICAL'].includes(n.layoutMode) && n.itemSpacing >= 0)
    p.gap = n.itemSpacing;
  if (n.type === 'TEXT') {
    p.text = n.characters;
    for (const k of ['fontFamily', 'fontSize', 'fontWeight'])
      if (n.style?.[k] !== undefined) p[k] = n.style[k];
    if (n.style?.lineHeightUnit === 'PIXELS')
      p.lineHeight = n.style.lineHeightPx;
  }
  const fills = n.fills?.filter((f) => f.visible !== false);
  if (
    fills?.length === 1 &&
    fills[0].type === 'SOLID' &&
    (fills[0].opacity ?? 1) === 1 &&
    (n.opacity ?? 1) === 1
  ) {
    const { r, g, b, a = 1 } = fills[0].color;
    if (a === 1)
      p[n.type === 'TEXT' ? 'color' : 'backgroundColor'] =
        `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
  }
  return p;
}
export function compare(node, dom, tolerance, { image = false, properties } = {}) {
  return Object.entries(expected(node)).flatMap(([property, value]) => {
    if (properties && !properties.includes(property)) return [];
    if (['width', 'height'].includes(property) && !image) return [];
    const actual = dom.props[property];
    if (actual === undefined || actual === null || (typeof actual === 'number' && !Number.isFinite(actual))) return [];
    if (typeof value === 'number' && typeof actual !== 'number') return [];
    if (property === 'text' && String(value).replace(/\s+/g, ' ').trim() === String(actual).replace(/\s+/g, ' ').trim()) return [];
    if (
      (typeof value === 'number' &&
        typeof actual === 'number' &&
        Math.abs(value - actual) <= tolerance) ||
      value === actual
    )
      return [];
    return [
      {
        layer: node.name,
        property,
        expected: value,
        actual: actual ?? 'No disponible',
        recommendation: `En «${node.name}»${dom.selector ? ` (${dom.selector})` : ''}, cambiar ${property} de ${actual ?? 'no disponible'} a ${value}${typeof value === 'number' && property !== 'fontWeight' ? ' px' : ''}.`,
        box: dom.box,
      },
    ];
  });
}

export function compareInterior(node, dom, tolerance) {
  const visibleLayers = (n) => {
    const name = String(n.name ?? '').replace(/([a-z])([A-Z])/g, '$1 $2');
    if (n.visible === false || (n !== node && !/^templates?[_ ]/i.test(n.name ?? '') && /(?:^|[\s_/-])(buttons?|bot[oó]n)(?:$|[\s_/-])/i.test(name))) return [];
    return [n, ...(n.children ?? []).flatMap(visibleLayers)];
  };
  dom = dom.filter((d) => !d.inButton && d.tag !== 'BUTTON');
  const properties = (layer) => [
    ...(layer.type === 'TEXT' ? ['fontSize', 'fontWeight', 'color'] : ['backgroundColor']),
    ...(layer === node ? ['paddingTop','paddingRight','paddingBottom','paddingLeft'] : []),
  ];
  const measured = (layer, element) => Object.entries(expected(layer)).filter(([key, value]) =>
    properties(layer).includes(key) && element.props[key] !== undefined &&
    (typeof value !== 'number' || (typeof element.props[key] === 'number' && Number.isFinite(element.props[key])))
  ).length;
  const layers = visibleLayers(node),
    findings = [],
    pending = [],
    pairs = new Map();
  const normalized = (value) =>
    String(value ?? '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  const text = (n) =>
    flatten(n)
      .filter((c) => c.type === 'TEXT')
      .map((c) => normalized(c.characters))
      .join(' ');
  const images = layers.filter((n) =>
    n.fills?.some((f) => f.visible !== false && f.type === 'IMAGE'),
  );
  const handledText = new Set();
  let checkedProperties = 0;
  for (const layer of layers) {
    // Repeated labels can be checked when all design occurrences have exactly
    // the same style. Do not assign geometric pairs by arbitrary array order.
    if (layer.type === 'TEXT') {
      const value = normalized(layer.characters);
      const siblings = layers.filter((n) => n.type === 'TEXT' && normalized(n.characters) === value);
      if (siblings.length > 1 && value) {
        if (handledText.has(value)) continue;
        handledText.add(value);
        const signature = (n) => JSON.stringify(Object.fromEntries(Object.entries(expected(n)).filter(([k]) => properties(n).includes(k))));
        const elements = dom.filter((d) => d.leaf && normalized(d.props.text) === value);
        if (elements.length && siblings.every((n) => signature(n) === signature(layer))) {
          for (const element of elements) {
            findings.push(...compare(layer, element, tolerance, { properties: properties(layer) }));
            checkedProperties += measured(layer, element);
          }
          continue;
        }
      }
    }
    let matches = dom.filter((d) => d.figmaNodeId === layer.id);
    if (!matches.length && layer === node && ['SECTION', 'ARTICLE'].includes(dom[0]?.tag)) matches = [dom[0]];
    const isImage = images.includes(layer);
    if (!matches.length && layer.type === 'TEXT') {
      const value = normalized(layer.characters);
      if (
        value &&
        layers.filter(
          (n) => n.type === 'TEXT' && normalized(n.characters) === value,
        ).length === 1
      )
        matches = dom.filter(
          (d) => d.leaf && normalized(d.props.text) === value,
        );
    } else if (!matches.length && isImage && images.length === 1) {
      matches = dom.filter((d) => d.tag === 'IMG');
    } else if (!matches.length && layer.type !== 'TEXT' && !isImage) {
      // Container correspondence requires the same unique set of visible text.
      const value = text(layer);
      const containers = layers.filter(
        (n) => n.type !== 'TEXT' && text(n) === value,
      );
      if (value && containers.length === 1)
        matches = dom.filter(
          (d) => !d.leaf && normalized(d.props.text) === value,
        );
    }
    if (matches.length !== 1) {
      pending.push(layer.name);
      continue;
    }
    const actual = matches[0];
    pairs.set(layer.id, actual);
    checkedProperties += measured(layer, actual);
    findings.push(...compare(layer, actual, tolerance, { properties: properties(layer) }));
  }
  // Figma expresses spacing through layout geometry, not CSS margin ownership.
  for (const container of layers.filter((n) =>
    ['HORIZONTAL', 'VERTICAL'].includes(n.layoutMode),
  )) {
    const children = (container.children ?? []).filter(
      (n) => n.visible !== false && n.layoutPositioning !== 'ABSOLUTE',
    );
    for (let i = 1; i < children.length; i++) {
      const prev = children[i - 1],
        next = children[i],
        a = pairs.get(prev.id),
        b = pairs.get(next.id);
      if (!a || !b || !prev.absoluteBoundingBox || !next.absoluteBoundingBox)
        continue;
      const horizontal = container.layoutMode === 'HORIZONTAL',
        axis = horizontal ? 'x' : 'y',
        size = horizontal ? 'width' : 'height';
      const expected =
        next.absoluteBoundingBox[axis] -
        prev.absoluteBoundingBox[axis] -
        prev.absoluteBoundingBox[size];
      const actual = b.box[axis] - a.box[axis] - a.box[size];
      if (
        expected < 0 ||
        actual < 0 ||
        Math.abs(expected - actual) <= tolerance
      )
        continue;
      findings.push({
        layer: container.name,
        property: `Separación ${horizontal ? 'horizontal' : 'vertical'}: ${prev.name} → ${next.name}`,
        expected: `${expected.toFixed(1)} px`,
        actual: `${actual.toFixed(1)} px`,
        recommendation: `Ajustar la separación entre «${prev.name}» y «${next.name}» a ${expected.toFixed(1)} px; revisar gap o márgenes de estos elementos.`,
        box: b.box,
      });
    }
  }
  return { findings, pending, checkedProperties };
}
