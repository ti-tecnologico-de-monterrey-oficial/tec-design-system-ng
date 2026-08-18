import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { SizeNames } from '../../_shared/types';
import {
  getCardClasses,
  getCardStyles,
  getPaddingClasses,
  getPaddingStyles,
} from '../../_shared/logic/components/card';
import type {
  IBmbBgColor,
  IBmbBoxShadowStyle,
  IBmbCardType,
} from '../../_shared/types/components/card';

@Component({
  selector: 'bmb-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-card.component.html',
  styleUrl: './bmb-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCardComponent {
  borderRadius = input<SizeNames | SizeNames[]>('m');
  margin = input<SizeNames | SizeNames[]>('m');
  type = input<IBmbCardType>('normal');
  state = input<'disabled' | 'error' | 'normal'>('normal');
  boxShadowStyle = input<IBmbBoxShadowStyle | 'none'>('none');
  borderColor = input<IBmbBgColor | 'default'>('default');

  getClasses() {
    return getCardClasses({
      borderRadius: this.borderRadius(),
      margin: this.margin(),
      type: this.type(),
      boxShadowStyle: this.boxShadowStyle(),
    });
  }

  getStyles() {
    return getCardStyles({
      borderRadius: this.borderRadius(),
      margin: this.margin(),
      borderColor: this.borderColor(),
    });
  }
}

@Component({
  selector: 'bmb-card-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-card-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCardHeaderComponent {
  padding = input<SizeNames | SizeNames[]>('m');
  colorBackground = input<IBmbBgColor | null>(null);

  getClasses() {
    return getPaddingClasses(this.padding());
  }

  getStyles() {
    return getPaddingStyles({
      padding: this.padding(),
      colorBackground: this.colorBackground(),
    });
  }
}

@Component({
  selector: 'bmb-card-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-card-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCardFooterComponent {
  padding = input<SizeNames | SizeNames[]>('m');
  colorBackground = input<IBmbBgColor | null>(null);

  getClasses() {
    return getPaddingClasses(this.padding());
  }

  getStyles() {
    return getPaddingStyles({
      padding: this.padding(),
      colorBackground: this.colorBackground(),
    });
  }
}

@Component({
  selector: 'bmb-card-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-card-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCardContentComponent {
  padding = input<SizeNames | SizeNames[]>('m');
  colorBackground = input<IBmbBgColor | null>(null);
  setBorderRadius = input<boolean>(false);

  getClasses() {
    const classes = getPaddingClasses(this.padding());
    if (this.setBorderRadius()) classes.push('bmb_card-content-with-radius');
    return classes;
  }

  getStyles() {
    return getPaddingStyles({
      padding: this.padding(),
      colorBackground: this.colorBackground(),
    });
  }
}

/**
 * El componente sí actualiza sus inputs dinámicamente mediante signals.
 * Sin embargo, algunos cambios visuales no se muestran porque `angular-app`
 * no carga los estilos globales ni los design tokens de Bamboo.
 *
 * Los estilos de Card utilizan variables CSS como `--containers-main`,
 * `--general-contrasts-*`, `--bmb-radius-*` y `--bmb-box-shadow-*`.
 * Si el tema global no está cargado, estas variables no existen y el
 * navegador descarta las declaraciones que dependen de ellas.
 *
 * Además, algunos inputs de Card todavía no tienen una implementación visual
 * completa; por ejemplo, `state` no genera clases ni estilos.
 *
 * Por lo tanto, el comportamiento dinámico funciona, pero para visualizarlo
 * es necesario cargar el tema de Bamboo y completar las reglas internas
 * pendientes del componente.
 */
