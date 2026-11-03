# BmbUserProfileService

## Descripción general

`BmbUserProfileService` es un servicio singleton de Angular que gestiona el estado y la información del perfil de usuario en la aplicación. Utiliza señales reactivas (`signal`) para almacenar y actualizar los datos del usuario, permitiendo acceder y modificar la información de manera centralizada y eficiente. Es ideal para compartir el estado del usuario entre componentes, páginas y módulos, facilitando la sincronización y actualización de datos en tiempo real.

---

## Props / Parámetros

| Propiedad  | Tipo                   | Descripción                                            | Valor por defecto                              | Obligatorio |
| ---------- | ---------------------- | ------------------------------------------------------ | ---------------------------------------------- | ----------- |
| `userInfo` | `signal<IBmbUserInfo>` | Señal reactiva que almacena la información del usuario | `{ id: '', fullName: '', profilePicture: '' }` | No          |

### Métodos

| Método                             | Tipo de retorno | Descripción                                |
| ---------------------------------- | --------------- | ------------------------------------------ |
| `getUserInfo()`                    | `IBmbUserInfo`  | Devuelve la información actual del usuario |
| `setUserInfo(state: IBmbUserInfo)` | `void`          | Actualiza la información del usuario       |

---

## Ejemplo de uso

```typescript
// Inyección en un componente
import { Component } from '@angular/core';
import { BmbUserProfileService } from './services/user/profile.service';

@Component({
  selector: 'app-profile',
  template: `
    <div>
      <img [src]="user.profilePicture" alt="Foto de perfil" />
      <h2>{{ user.fullName }}</h2>
      <p>ID: {{ user.id }}</p>
    </div>
  `,
})
export class ProfileComponent {
  user = this.profileService.getUserInfo();

  constructor(private profileService: BmbUserProfileService) {}

  actualizarUsuario() {
    this.profileService.setUserInfo({
      id: 'A01234567',
      fullName: 'Ana Pérez',
      profilePicture: '/assets/ana.jpg',
    });
  }
}
```

---

## Dependencias

- `@angular/core` (Injectable, signal)
- Tipos: `IBmbUserInfo` (definido en `../../types`)

---

## Notas adicionales

- **Accesibilidad:** El servicio no afecta directamente la accesibilidad, pero facilita la gestión centralizada de datos para componentes que sí deben ser accesibles.
- **Compatibilidad:** Puede ser inyectado en cualquier componente, servicio o módulo de Angular.
- **Rendimiento:** Utiliza señales reactivas para optimizar la actualización y sincronización de datos entre componentes.
- **Buenas prácticas:** Centraliza la gestión del estado del usuario, evitando duplicidad y facilitando la actualización global de la información.

---
