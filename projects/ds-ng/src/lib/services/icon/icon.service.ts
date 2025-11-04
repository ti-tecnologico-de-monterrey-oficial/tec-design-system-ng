import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BmbIconService {
  private iconCache = new Map<string, string>();

  async loadIconSvg(iconName: string): Promise<string | null> {
    // Limpiar el nombre del icono
    const cleanName = iconName.trim().replace(/\s+/g, '_').toLowerCase();

    // Verificar cache
    if (this.iconCache.has(cleanName)) {
      return this.iconCache.get(cleanName) || null;
    }

    // Intentar variantes del nombre
    const variants = this.getIconNameVariants(iconName);

    for (const variant of variants) {
      try {
        console.log(`Trying to load icon variant: ${variant}`);
        const response = await fetch(`/node_modules/@material-symbols/svg-400/rounded/${variant}-fill.svg`);

        if (response.ok) {
          const svgContent = await response.text();
          this.iconCache.set(cleanName, svgContent);
          console.log(`Successfully loaded icon: ${variant}`);
          return svgContent;
        } else {
          console.log(`Icon not found: ${variant} (HTTP ${response.status})`);
        }
      } catch (error) {
        console.log(`Failed to fetch icon variant: ${variant}`, error);
        // Continuar con la siguiente variante
      }
    }

    console.warn(`Icon "${iconName}" not found in any variant. Tried: ${variants.join(', ')}`);
    return null;
  }

  private getIconNameVariants(iconName: string): string[] {
    const variants: string[] = [];
    const baseName = iconName.trim();

    // Variante original (tal como viene)
    variants.push(baseName);

    // Variante en minúsculas
    variants.push(baseName.toLowerCase());

    // Variante con guiones bajos
    variants.push(baseName.replace(/\s+/g, '_'));
    variants.push(baseName.toLowerCase().replace(/\s+/g, '_'));

    // Variante con guiones
    variants.push(baseName.replace(/\s+/g, '-'));
    variants.push(baseName.toLowerCase().replace(/\s+/g, '-'));

    // Variantes sin espacios
    variants.push(baseName.replace(/\s+/g, ''));
    variants.push(baseName.toLowerCase().replace(/\s+/g, ''));

    // Eliminar duplicados
    return [...new Set(variants)];
  }

  /**
   * Obtiene una lista de iconos disponibles comunes
   */
  getAvailableIcons(): string[] {
    return [
      'home',
      'face',
      'menu',
      'search',
      'close',
      'arrow_back',
      'arrow_forward',
      'settings',
      'favorite',
      'star',
      'add',
      'edit',
      'delete',
      'info',
      'warning',
      'error',
      'check',
      'check_circle',
      'cancel',
      'more_vert',
      'more_horiz'
    ];
  }

  clearCache(): void {
    this.iconCache.clear();
  }

  getCacheSize(): number {
    return this.iconCache.size;
  }
}
