import { componentHandle } from './capture.mjs';
import { variantDevice, isSharedReference } from './discovery.mjs';
// These thumbnails are only for candidate selection. Audit images are never resized.
export async function fingerprint(page, image) {
  return page.evaluate(
    async (src) => {
      const image = new Image();
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = () => reject(new Error('Imagen inválida'));
        image.src = src;
      });
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 32;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 32, 32);
      ctx.drawImage(image, 0, 0, 32, 32);
      return {
        pixels: Array.from(ctx.getImageData(0, 0, 32, 32).data),
        width: image.width,
        height: image.height,
      };
    },
    `data:image/png;base64,${image.toString('base64')}`,
  );
}
const words = (text) =>
  new Set(
    String(text)
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .match(/[\p{L}\p{N}]+/gu) ?? [],
  );
export function figmaTheme(node) {
  const counts = { dark: 0, light: 0 };
  function visit(n) {
    if (n.visible === false) return;
    if (n.type === 'TEXT') {
      const f = n.fills?.find(
        (f) =>
          f.visible !== false && f.type === 'SOLID' && (f.opacity ?? 1) === 1,
      );
      if (f) {
        const { r, g, b } = f.color;
        const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const w = n.characters?.trim().length ?? 0;
        if (l > 0.65) counts.dark += w;
        else if (l < 0.4) counts.light += w;
      }
    }
    for (const c of n.children ?? []) visit(c);
  }
  visit(node);
  if (counts.dark > counts.light * 2) return 'dark';
  if (counts.light > counts.dark * 2) return 'light';
}
export function similarity(a, b) {
  let distance = 0;
  for (let i = 0; i < a.pixels.length; i++)
    if (i % 4 !== 3) distance += Math.abs(a.pixels[i] - b.pixels[i]);
  const visual = 1 - distance / ((a.pixels.length / 4) * 3 * 255);
  const geometry =
    ((Math.min(a.width, b.width) / Math.max(a.width, b.width)) *
      Math.min(a.height, b.height)) /
    Math.max(a.height, b.height);
  const x = words(a.text),
    y = words(b.text),
    union = new Set([...x, ...y]);
  const text = union.size
    ? [...x].filter((w) => y.has(w)).length / union.size
    : 0;
  return {
    score: visual * 0.65 + geometry * 0.2 + text * 0.15,
    visual,
    geometry,
    text,
  };
}
export function matchByAppearance(
  cases,
  variants,
  storyFeatures,
  figmaFeatures,
) {
  const available = variants.filter(
    (v) => !cases.some((c) => c.variant?.node.id === v.node.id),
  );
  const ranked = cases
    .filter((c) => !c.variant && storyFeatures.has(c.entry.id))
    .map((item) => ({
      item,
      candidates: available
        .filter((v) => {
          if (!figmaFeatures.has(v.node.id)) return false;
          if (
            item.candidateIds?.length &&
            !item.candidateIds.includes(v.node.id)
          )
            return false;
          const theme = figmaTheme(v.node),
            storyTheme = storyFeatures.get(item.entry.id)?.theme;
          if (theme && storyTheme && theme !== storyTheme) return false;
          const device = variantDevice(v.node);
          const storyDevice = item.entry.name
            ?.toLowerCase()
            .replace('responsive', 'mobile');
          return (
            !device ||
            !['desktop', 'mobile'].includes(storyDevice) ||
            device === storyDevice
          );
        })
        .map((variant) => ({
          variant,
          ...similarity(
            storyFeatures.get(item.entry.id),
            figmaFeatures.get(variant.node.id),
          ),
        }))
        .sort((a, b) => b.score - a.score),
    }));
  for (const { item, candidates } of ranked) {
    item.candidates = candidates.slice(0, 3).map((c) => ({
      id: c.variant.node.id,
      label: c.variant.label,
      score: +c.score.toFixed(3),
    }));
    const best = candidates[0];
    if (!best) continue;
    const device = item.entry.name
      ?.toLowerCase()
      .replace('responsive', 'mobile');
    // Known family + explicit device + observed theme identifies a variant
    // independently of the style differences that this audit is meant to find.
    const identified =
      item.candidateIds?.length &&
      candidates.length === 1 &&
      (variantDevice(best.variant.node) === device || isSharedReference(best.variant.node, item.entry)) &&
      ['desktop', 'mobile'].includes(device) &&
      figmaTheme(best.variant.node) ===
        storyFeatures.get(item.entry.id)?.theme &&
      !!figmaTheme(best.variant.node);
    const rivals = ranked
      .filter((r) => r.item !== item)
      .flatMap((r) =>
        r.candidates.filter((c) => c.variant.node.id === best.variant.node.id),
      );
    const margin = best.score - (candidates[1]?.score ?? 0);
    const reverseMargin =
      best.score - Math.max(0, ...rivals.map((c) => c.score));
    // Similarity alone is not identity: require text + geometry and a clear margin
    // in both directions. Blank or indistinguishable cards must remain pending.
    if (
      identified ||
      (best.score >= 0.88 &&
        best.text >= 0.65 &&
        best.geometry >= 0.7 &&
        margin >= 0.06 &&
        reverseMargin >= 0.06)
    ) {
      item.variant = best.variant;
      item.status = 'asociada';
      item.matchMethod = identified
        ? (variantDevice(best.variant.node) ? 'Familia, dispositivo y tema de texto observados' : 'Referencia Responsive / Desktop confirmada por el usuario y tema observado')
        : 'Similitud visual, texto y dimensiones (heurística; verificar la pareja en las capturas)';
      item.matchScore = +best.score.toFixed(3);
      delete item.reason;
    } else
      item.reason =
        'Encontré diseños parecidos, pero no puedo decidir con seguridad cuál corresponde. Revisa las sugerencias; esto no significa que falte el diseño en Figma.';
  }
}

export async function captureForMatching(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page
    .locator('#storybook-root > *')
    .first()
    .waitFor({ state: 'visible' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => i.decode()));
  });
  const handle = await componentHandle(page);
  const element = handle.asElement();
  if (!element) throw new Error('Componente no encontrado');
  const text = await element.textContent();
  const theme = await element.evaluate((el) => {
    const counts = { dark: 0, light: 0 };
    for (const n of [el, ...el.querySelectorAll('*')]) {
      if (n.children.length || !n.textContent.trim() || !n.getBoundingClientRect().width) continue;
      const rgb = getComputedStyle(n).color.match(/[\d.]+/g)?.map(Number);
      if (!rgb) continue;
      const l = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
      if (l > 0.65) counts.dark += n.textContent.trim().length;
      else if (l < 0.4) counts.light += n.textContent.trim().length;
    }
    return counts.dark > counts.light * 2 ? 'dark' : counts.light > counts.dark * 2 ? 'light' : undefined;
  });
  const image = await element.screenshot({ animations: 'disabled' });
  await handle.dispose();
  return { text, image, theme };
}
