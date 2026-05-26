# BmbTranslationsService

## Descripción General

El `BmbTranslationsService` es un servicio Angular que proporciona funcionalidades completas de internacionalización (i18n) para el sistema de diseño BMB. Maneja la gestión de diccionarios de traducción, cambio dinámico de idiomas y traducción de claves anidadas. El servicio utiliza Angular Signals para un manejo reactivo del estado y está diseñado para ser fácil de usar y extensible.

## Interfaz BmbDictionaries

```typescript
export interface BmbDictionaries {
  [key: string]: {
    [key: string]:
      | string
      | {
          [key: string]:
            | string
            | {
                [key: string]: string;
              };
        };
  };
}
```

Esta interfaz define la estructura de los diccionarios de traducción, permitiendo anidación hasta tres niveles de profundidad para organizar las traducciones de manera jerárquica.

## Métodos Públicos

### `getCurrentLanguage(): string`

Obtiene el idioma actualmente seleccionado.

**Retorna:**

- `string` - Código del idioma actual (ej: 'es', 'en')

### `setLanguage(lang: string): void`

Cambia el idioma activo del servicio.

**Parámetros:**
| Parámetro | Tipo | Descripción | Requerido |
|-----------|------|-------------|-----------|
| `lang` | `string` | Código del idioma a establecer | Sí |

**Comportamiento:**

- Si el idioma existe en los diccionarios, lo establece como activo
- Si no existe, muestra una advertencia en consola y mantiene el idioma actual

### `updateDictionary(lang: string, dictionary: BmbDictionaries): void`

Actualiza un diccionario existente fusionando las nuevas traducciones.

**Parámetros:**
| Parámetro | Tipo | Descripción | Requerido |
|-----------|------|-------------|-----------|
| `lang` | `string` | Código del idioma del diccionario | Sí |
| `dictionary` | `BmbDictionaries` | Nuevas traducciones a fusionar | Sí |

### `addDictionary(lang: string, dictionary: BmbDictionaries): void`

Añade un nuevo diccionario completo para un idioma.

**Parámetros:**
| Parámetro | Tipo | Descripción | Requerido |
|-----------|------|-------------|-----------|
| `lang` | `string` | Código del idioma del nuevo diccionario | Sí |
| `dictionary` | `BmbDictionaries` | Diccionario completo de traducciones | Sí |

### `translate(keyList: string): string`

Traduce una clave utilizando notación de punto para claves anidadas.

**Parámetros:**
| Parámetro | Tipo | Descripción | Requerido |
|-----------|------|-------------|-----------|
| `keyList` | `string` | Clave de traducción (ej: 'account_statement.title') | Sí |

**Retorna:**

- `string` - Texto traducido o la clave original si no se encuentra

## Ejemplo de Uso

### Configuración Básica

```typescript
import { Component, OnInit, computed } from '@angular/core';
import { BmbTranslationsService } from '@bmb/ds-ng';

@Component({
  selector: 'app-example',
  standalone: true,
  template: `
    <div>
      <h1>{{ pageTitle }}</h1>
      <p>{{ currentLang() }}</p>

      <button (click)="changeToEnglish()">English</button>
      <button (click)="changeToSpanish()">Español</button>

      <!-- Usando el pipe -->
      <p>{{ 'account_statement.title' | translate }}</p>
    </div>
  `,
})
export class ExampleComponent implements OnInit {
  pageTitle: string = '';

  // Signal reactivo para el idioma actual
  currentLang = computed(() => this.translationsService.getCurrentLanguage());

  constructor(private translationsService: BmbTranslationsService) {}

  ngOnInit() {
    // Traducir directamente con el servicio
    this.pageTitle = this.translationsService.translate(
      'account_statement.title',
    );
  }

  changeToEnglish() {
    this.translationsService.setLanguage('en');
    this.updateTitle();
  }

  changeToSpanish() {
    this.translationsService.setLanguage('es');
    this.updateTitle();
  }

  private updateTitle() {
    this.pageTitle = this.translationsService.translate(
      'account_statement.title',
    );
  }
}
```

### Añadiendo Diccionarios Personalizados

```typescript
import { Injectable } from '@angular/core';
import { BmbTranslationsService, BmbDictionaries } from '@bmb/ds-ng';

@Injectable({
  providedIn: 'root',
})
export class CustomTranslationsService {
  constructor(private translationsService: BmbTranslationsService) {
    this.setupCustomTranslations();
  }

  private setupCustomTranslations() {
    // Añadir un nuevo idioma
    const frenchDictionary: BmbDictionaries = {
      account_statement: {
        title: 'État du compte',
        pay_button_label: 'Payer',
      },
      common: {
        save: 'Sauvegarder',
        cancel: 'Annuler',
      },
    };

    this.translationsService.addDictionary('fr', frenchDictionary);

    // Actualizar diccionario existente
    const spanishUpdates: BmbDictionaries = {
      custom_section: {
        new_feature: 'Nueva funcionalidad',
        description: 'Esta es una descripción personalizada',
      },
    };

    this.translationsService.updateDictionary('es', spanishUpdates);
  }
}
```

### Uso con el Pipe TranslatePipe

```typescript
import { Component } from '@angular/core';
import { TranslatePipe } from '@bmb/ds-ng';

@Component({
  selector: 'app-translated',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <!-- Traducciones simples -->
    <h1>{{ 'account_statement.title' | translate }}</h1>

    <!-- Traducciones anidadas -->
    <p>{{ 'balance_overview.label_primary' | translate }}</p>

    <!-- Fallback si no existe la clave -->
    <span>{{ 'nonexistent.key' | translate }}</span>
  `,
})
export class TranslatedComponent {}
```

## Dependencias

### Dependencias de Angular

- **@angular/core**: `Injectable`, `signal`, `computed` - Para la inyección de dependencia y manejo reactivo del estado

### Archivos de Traducción

- **../../../assets/i18n/es.json** - Diccionario en español
- **../../../assets/i18n/en.json** - Diccionario en inglés

### Dependencias Relacionadas

- **TranslatePipe** - Pipe para uso en templates que utiliza este servicio

## Estructura de Diccionarios

Los diccionarios siguen una estructura JSON anidada que permite organización jerárquica:

```json
{
  "account_statement": {
    "title": "Estado de cuenta",
    "modal": {
      "title": "Pagar",
      "buttons": {
        "primary": "Confirmar",
        "secondary": "Cancelar"
      }
    }
  },
  "common": {
    "save": "Guardar",
    "cancel": "Cancelar"
  }
}
```

**Acceso a traducciones:**

- `account_statement.title` → "Estado de cuenta"
- `account_statement.modal.title` → "Pagar"
- `account_statement.modal.buttons.primary` → "Confirmar"

## Notas Adicionales

### Rendimiento

- **Angular Signals**: Utiliza signals para manejo reactivo del estado, optimizando las re-renderizaciones
- **Computed Values**: Los diccionarios seleccionados se calculan reactivamente solo cuando cambia el idioma
- **Singleton Service**: `providedIn: 'root'` asegura una sola instancia en toda la aplicación
- **Pipe No Puro**: El TranslatePipe es `pure: false` para detectar cambios en el idioma activo

### Gestión de Estado

- **Estado Inmutable**: Los signals manejan el estado de forma inmutable
- **Reactividad**: Cambios en el idioma se propagan automáticamente a todos los componentes suscriptores
- **Persistencia**: El servicio no persiste el idioma seleccionado; debe implementarse externamente si es necesario

### Manejo de Errores

- **Claves Inexistentes**: Retorna la clave original si no se encuentra la traducción
- **Idiomas No Válidos**: Muestra advertencias en consola sin interrumpir la ejecución
- **Navegación Segura**: El método `translate` maneja safely la navegación por objetos anidados

### Extensibilidad

- **Diccionarios Dinámicos**: Permite añadir y actualizar diccionarios en tiempo de ejecución
- **Múltiples Idiomas**: Soporte ilimitado para idiomas adicionales
- **Anidación Flexible**: Hasta tres niveles de anidación en las claves de traducción
- **API Consistente**: Interfaz uniforme para todas las operaciones de traducción

### Compatibilidad

- **Angular 17+**: Requiere Angular 17 o superior por el uso de signals
- **Standalone**: Compatible con componentes standalone y módulos tradicionales
- **TypeScript**: Fuertemente tipado con interfaces específicas
- **Tree Shaking**: Optimizado para eliminación de código no utilizado

### Casos de Uso Comunes

1. **Cambio Dinámico de Idioma**: En configuraciones de usuario o switches de idioma
2. **Traducciones Contextuales**: Para componentes específicos del dominio educativo
3. **Internacionalización de Formularios**: Etiquetas, placeholders y mensajes de error
4. **Contenido Dinámico**: Traducciones que se cargan según el contexto del usuario
5. **Sistemas Multi-tenant**: Diferentes traducciones por institución o región

### Mejores Prácticas

- Usar claves descriptivas y jerárquicas (ej: `component.section.element`)
- Mantener consistencia entre todos los diccionarios de idiomas
- Implementar fallbacks para claves faltantes
- Cargar diccionarios de forma lazy para mejorar performance inicial
- Validar estructura de diccionarios en tiempo de desarrollo
