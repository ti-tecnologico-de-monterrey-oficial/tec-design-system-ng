 # ThemeService

## Descripción general

`ThemeService` es un servicio singleton de Angular que gestiona el tema visual de la aplicación (por ejemplo, claro, oscuro o personalizado). Utiliza un `BehaviorSubject` de RxJS para almacenar y emitir el tema actual, permitiendo que cualquier componente se suscriba y reaccione a los cambios de tema. El servicio inicializa el tema desde `localStorage`, un valor inyectado (`defaultTheme`) o el valor por defecto `'light'`, y permite actualizar el tema dinámicamente.

---

## Props / Parámetros

| Propiedad           | Tipo     | Descripción                            | Valor por defecto | Obligatorio |
| ------------------- | -------- | -------------------------------------- | ----------------- | ----------- |
| `BMB_DEFAULT_THEME` | `string` | Tema por defecto inyectado al servicio | `'light'`         | No          |

### Observables y métodos

| Propiedad/Método          | Tipo                 | Descripción                                     |
| ------------------------- | -------------------- | ----------------------------------------------- |
| `theme$`                  | `Observable<string>` | Observable del tema actual                      |
| `getDefaultTheme()`       | `string`             | Devuelve el tema por defecto                    |
| `setTheme(theme: string)` | `void`               | Actualiza el tema y lo emite a los suscriptores |

---

## Ejemplo de uso

```typescript
import { Component } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-theme-switcher',
  template: `
    <button (click)="cambiarTema('dark')">Oscuro</button>
    <button (click)="cambiarTema('light')">Claro</button>
    <div>El tema actual es: {{ temaActual }}</div>
  `,
})
export class ThemeSwitcherComponent {
  temaActual: string = '';

  constructor(private themeService: ThemeService) {
    this.themeService.theme$.subscribe((theme) => (this.temaActual = theme));
  }

  cambiarTema(theme: string) {
    this.themeService.setTheme(theme);
  }
}
```

---

## Configuración

Para configurar un tema por defecto diferente a `'light'`, debes proveer el token `BMB_DEFAULT_THEME` en tu `AppModule` o en la configuración de `bootstrapApplication`:

### Usando standalone components (bootstrapApplication)

```typescript
import { BMB_DEFAULT_THEME } from './services/theme/theme-config';

bootstrapApplication(AppComponent, {
  providers: [{ provide: BMB_DEFAULT_THEME, useValue: 'dark' }],
});
```

### Usando NgModule

```typescript
import { BMB_DEFAULT_THEME } from './services/theme/theme-config';

@NgModule({
  providers: [{ provide: BMB_DEFAULT_THEME, useValue: 'dark' }],
})
export class AppModule {}
```

---

## Dependencias

- `@angular/core` (Injectable, Inject, Optional)
- `rxjs` (BehaviorSubject, Observable)
- Navegador: `localStorage`

---

## Notas adicionales

- **Accesibilidad:** El servicio no afecta directamente la accesibilidad, pero facilita la gestión centralizada de temas, lo que puede mejorar la experiencia visual y de contraste para usuarios con necesidades específicas.
- **Compatibilidad:** Puede ser inyectado en cualquier componente, servicio o módulo de Angular. El tema inicial puede provenir de `localStorage`, de un valor inyectado o del valor por defecto.
- **Rendimiento:** Utiliza observables para emitir cambios de tema de forma eficiente y reactiva.
- **Buenas prácticas:** Centraliza la gestión del tema visual, evitando duplicidad y facilitando la actualización global del estilo de la aplicación.

---
