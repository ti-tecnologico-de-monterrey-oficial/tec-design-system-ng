const normalize = (value) =>
  String(value ?? '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

export function discoverStories(index, selection, referencedIds = []) {
  const entries = Object.values(index);
  const selected = index[selection.id];
  if (!selection.id) return entries.filter((e) => e.type === 'story');
  if (!selected)
    throw new Error('El enlace no aparece en el índice de este Storybook.');
  if (selected.type === 'story') return [selected];
  const imports = new Set(selected.storiesImports ?? []);
  return entries.filter(
    (e) =>
      e.type === 'story' &&
      (e.title === selected.title ||
        e.title?.startsWith(`${selected.title}/`) ||
        imports.has(e.importPath) ||
        referencedIds.includes(e.id)),
  );
}

// The URL is the scope boundary. Ignore other nodes returned as dependencies.
export function selectedFigmaNode(response, nodeId) {
  const node = response.nodes?.[nodeId]?.document;
  if (!node || node.id !== nodeId)
    throw new Error(
      'No se pudo leer el nodo exacto indicado en el enlace de Figma.',
    );
  return node;
}

export function discoverVariants(root) {
  const variants = [];
  function visit(node, ancestors) {
    if (node.visible === false) return;
    const path = [...ancestors, node.name];
    const namedTemplate = (n) => /^template[_ ]/i.test(n.name ?? '');
    const hasNamedTemplate = (n) => namedTemplate(n) || (n.children ?? []).some(hasNamedTemplate);
    if ((['COMPONENT', 'INSTANCE'].includes(node.type) && !(node.children ?? []).some(hasNamedTemplate)) || (namedTemplate(node) && ['FRAME', 'COMPONENT', 'INSTANCE'].includes(node.type))) {
      variants.push({ node, label: path.join(' / ') });
      return; // Nested instances belong to this variant, not separate test cases.
    }
    const children = (node.children ?? []).filter((n) => n.visible !== false);
    const containers = children.filter((n) =>
      [
        'COMPONENT_SET',
        'COMPONENT',
        'INSTANCE',
        'SECTION',
        'FRAME',
        'GROUP',
        'CANVAS',
      ].includes(n.type),
    );
    // Frames without component descendants are concrete template candidates.
    const hasComponent = (n) =>
      ['COMPONENT', 'INSTANCE', 'COMPONENT_SET'].includes(n.type) ||
      (n.children ?? []).some(hasComponent);
    if (node.type === 'FRAME' && !children.some(hasComponent)) {
      variants.push({ node, label: path.join(' / ') });
      return;
    }
    for (const child of containers) visit(child, path);
  }
  visit(root, []);
  return variants;
}

export function discoverScopeVariants(root, selectedName) {
  const variants = discoverVariants(root);
  const template = (name) => /^templates?[_ ]/i.test(name ?? '');
  const selected = template(selectedName) || variants.some((v) => template(v.node.name))
    ? variants.filter((v) => template(v.node.name)) : variants;
  // Documentation labels are siblings (sometimes in an overlapping frame),
  // not component properties. Read them within the selected subtree only.
  const labels = [];
  const collect = (n) => {
    if (n.visible === false || selected.some((v) => v.node.id === n.id)) return;
    if (n.type === 'TEXT' && n.absoluteBoundingBox) labels.push(n);
    for (const child of n.children ?? []) collect(child);
  };
  collect(root);
  return selected.map((v) => {
    const contextTokens = normalize(v.label).split(' ');
    const contextTheme = [...contextTokens].reverse().find((value) => ['dark','light'].includes(value));
    const box = v.node.absoluteBoundingBox;
    if (!box) return v;
    const above = labels.filter((label) => {
      const b = label.absoluteBoundingBox, gap = box.y - b.y - b.height;
      const center = b.x + b.width / 2;
      return gap >= 0 && gap <= 160 && center >= box.x && center <= box.x + box.width;
    });
    const nearest = (predicate) => {
      const ranked = above.filter(predicate).sort((a,b) => b.absoluteBoundingBox.y - a.absoluteBoundingBox.y);
      if (ranked.length > 1 && Math.abs(ranked[0].absoluteBoundingBox.y - ranked[1].absoluteBoundingBox.y) < 1) return undefined;
      return ranked[0];
    };
    const deviceLabel = nearest((n) => /^(desktop|responsive|mobile)(\s*[/]\s*(desktop|responsive|mobile))?$/i.test(n.characters.trim()));
    const nameLabel = nearest((n) => template(n.characters.trim()));
    const annotation = {
      name: nameLabel?.characters.trim(),
      theme: contextTheme,
      devices: deviceLabel ? canonical(deviceLabel.characters).split(' ').filter((w) => ['desktop','mobile'].includes(w)) : [],
      labelIds: [nameLabel?.id, deviceLabel?.id].filter(Boolean),
    };
    return {...v, node: {...v.node, auditAnnotation: annotation}};
  });
}

export function collapseIdenticalVariants(variants) {
  const groups = new Map();
  function signature(n) {
    const value = {};
    // Compare rendered properties, not IDs or the position on the documentation canvas.
    for (const key of [
      'type',
      'name',
      'visible',
      'characters',
      'style',
      'fills',
      'strokes',
      'strokeWeight',
      'effects',
      'opacity',
      'cornerRadius',
      'layoutMode',
      'itemSpacing',
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
      'componentProperties',
    ]) {
      if (n[key] !== undefined) value[key] = n[key];
    }
    if (n.absoluteBoundingBox)
      value.size = [n.absoluteBoundingBox.width, n.absoluteBoundingBox.height];
    value.children = (n.children ?? []).map((child) => ({
      ...signature(child),
      position:
        child.absoluteBoundingBox && n.absoluteBoundingBox
          ? [
              child.absoluteBoundingBox.x - n.absoluteBoundingBox.x,
              child.absoluteBoundingBox.y - n.absoluteBoundingBox.y,
            ]
          : undefined,
    }));
    return value;
  }
  for (const variant of variants) {
    const key = JSON.stringify(signature(variant.node));
    if (!groups.has(key)) groups.set(key, { ...variant, copies: [] });
    else if (variant.node.auditAnnotation?.devices.length && !groups.get(key).node.auditAnnotation?.devices.length) {
      groups.set(key, { ...variant, copies: groups.get(key).copies });
    }
    groups.get(key).copies.push(variant.node.id);
  }
  return [...groups.values()];
}

const canonical = (value) => normalize(value).replace(/\bresponsive\b/g, 'mobile');
export function isSharedReference(node, entry) {
  if (node.auditAnnotation?.devices.includes('desktop') && node.auditAnnotation.devices.includes('mobile'))
    return ['desktop', 'mobile'].includes(canonical(entry.name));
  return false;
}
export function variantDevice(node) {
  if (node.auditAnnotation?.devices.length === 1) return node.auditAnnotation.devices[0];
  const values = Object.entries(node.componentProperties ?? {})
    .filter(([key]) => /device|dispositivo|viewport|breakpoint/i.test(key))
    .map(([, p]) => canonical(p.value));
  return values.find((v) => ['desktop', 'mobile'].includes(v));
}
export function associateVariants(variants, stories) {
  if (variants.length === 1 && stories.length === 1) {
    return [{
      entry: stories[0],
      variant: variants[0],
      status: 'asociada',
      matchMethod: 'Par único indicado por los enlaces de Figma y Chromatic',
    }];
  }
  const candidates = stories.map((entry) => {
    const family = canonical(entry.title?.split('/').at(-1));
    const state = canonical(entry.name);
    const device = ['mobile', 'desktop'].includes(state) ? state : undefined;
    let possible = variants.filter((v) => {
      const name = canonical(v.node.auditAnnotation?.name ?? v.node.name);
      const mapped = name.replace(/^templates? /, '');
      const foundDevice = variantDevice(v.node);
      if (device && foundDevice && device !== foundDevice) return false;
      const literal = name.replace(/^templates? /, '');
      if ([mapped, literal].some((value) => value === family || value === state)) return true;
      // Preserve support for Figma component-set names such as Size=Small.
      if (v.node.name.includes('=')) {
        const values = v.node.name
          .split(',')
          .map((p) => canonical(p.split('=').slice(1).join('=')))
          .filter(Boolean);
        const full = ` ${canonical(`${entry.title} ${entry.name}`)} `;
        return (
          values.length > 0 && values.every((v) => full.includes(` ${v} `))
        );
      }
      return false;
    });
    // Prefer the labelled specification over unlabelled theme-gallery copies.
    const documented = possible.filter((v) => v.node.auditAnnotation?.devices.length);
    if (documented.length) possible = documented;
    return { entry, possible };
  });
  return candidates.map(({ entry, possible }) => {
    if (possible.length !== 1)
      return {
        entry,
        status: 'sin asociación',
        candidateIds: possible.map((v) => v.node.id),
        reason: possible.length
          ? 'Varias variantes Figma coinciden por nombre; requiere revisión.'
          : 'Los nombres son distintos. Falta identificar qué diseño de Figma corresponde a esta historia; no significa que el diseño no exista.',
      };
    const variant = possible[0];
    // Never silently reuse the same design for multiple responsive/state stories.
    if (candidates.filter((c) => c.possible.includes(variant)).length !== 1 && !isSharedReference(variant.node, entry))
      return {
        entry,
        status: 'sin asociación',
        reason:
          'El mismo diseño coincide con varias historias; no se puede confirmar el estado o tamaño.',
      };
    return {
      entry,
      variant,
      status: 'asociada',
      matchMethod: isSharedReference(variant.node, entry)
        ? 'Referencia Responsive / Desktop confirmada por etiqueta Figma o por el usuario'
        : 'Nombre normalizado o equivalencia confirmada y dispositivo',
    };
  });
}
