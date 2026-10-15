export function auditMode(entry = {}, node = {}) {
  const category = entry.title?.split('/')[0] ?? '';
  if (/^templates?$/i.test(category) || /^templates?[_ ]/i.test(node.name ?? '')) return 'template';
  return 'component';
}
export function scopedLayers(root, mode = 'component') {
  const visit = (node) => {
    if (node.visible === false) return [];
    if (mode === 'template' && node !== root && ['INSTANCE', 'COMPONENT'].includes(node.type)) return [node];
    return [node, ...(node.children ?? []).flatMap(visit)];
  };
  return visit(root);
}
export const normalize = (s) => String(s ?? '').replace(/([a-z])([A-Z])/g, '$1 $2')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export function variantProperties(node) {
  return {
    ...Object.fromEntries(String(node.name ?? '').split(',').flatMap((part) => {
      const at = part.indexOf('=');
      return at < 0 ? [] : [[normalize(part.slice(0, at)), part.slice(at + 1).trim()]];
    })),
    ...Object.fromEntries(Object.entries(node.componentProperties ?? {}).filter(([, p]) => p.type === 'VARIANT' || p.type === 'BOOLEAN')
      .map(([key, p]) => [normalize(key.split('#')[0]), p.value])),
  };
}
