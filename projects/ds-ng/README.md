# Design System Bamboo

> El framework de diseño Bamboo ofrece a los desarrolladores las herramientas indispensables para potenciar la eficiencia en el desarrollo de productos, permitiéndoles crear más en menos tiempo y liberándolos de la monótona tarea de construir componentes básicos repetitivos.

## Requisitos básicos para instalar el paquete de Bamboo en tu ambiente local:

### Nodejs y npm

**El proyecto de Bamboo fue realizado con la versión v21.6.1 de Node y 10.3.0 de NPM.**

## Instala Design System Bamboo

Ejecuta el siguiente comando en la raíz del proyecto dependiendo de tu versión de Angular:

- Angular 18: `npm install @ti-tecnologico-de-monterrey-oficial/ds-ng@a18`

- Angular 19: `npm install @ti-tecnologico-de-monterrey-oficial/ds-ng@a19`

- Angular 20: `npm install @ti-tecnologico-de-monterrey-oficial/ds-ng@a20`

Sigue los pasos de la guía para configurar los estilos y las fuentes.

## Utiliza Design System Bamboo

Para poder utilizar Bamboo, sigue estos pasos para agregar estilos y configuraciones específicas del paquete:

En el archivo `angular.json` de tu proyecto, agrega el siguiente contenido donde esta _“styles”_ y _“assets”_:

Para importar los estilos es necesario decidir la marca deseada ya que no se puede cambiar en tiempo de ejecución.

- TEC – mainTEC.min.css
- Grupo educativo – mainGED.min.css

```
"assets": [
    "src/favicon.ico",
    "src/assets",
    {
        "glob": "**/*",
        "input": "./node_modules/@ti-tecnologico-de-monterrey-oficial/ds-ng/assets/fonts/",
        "output": "/assets/fonts/"
    },
    {
        "glob": "**/*",
        "input": "./node_modules/@ti-tecnologico-de-monterrey-oficial/ds-ng/assets/images/",
        "output": "/assets/images/"
    },
    {
        "glob": "**/*",
        "input": "./node_modules/@ti-tecnologico-de-monterrey-oficial/ds-ng/assets/svg/",
        "output": "/assets/svg/"
    },
    {
      "glob": "**/*.svg",
      "input": "node_modules/@material-symbols/svg-400/rounded/",
      "output": "/assets/icons/material-rounded/"
    },
],
"styles": [
    "src/styles.scss",
    "node_modules/@ti-tecnologico-de-monterrey-oficial/ds-ng/assets/styles/mainTEC.min.css"
],
```

---

Cuando necesites utilizar componentes del sistema de diseño, asegúrate de añadirlos a la página o archivo correspondiente. A continuación, te presento un ejemplo para ilustrar este proceso:

```
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BmbUserImageComponent,
} from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    BmbUserImageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
```

Para iniciar la aplicación ejecuta el siguiente comando en la terminal:

`npm run start`

¡Listo! Ahora puedes comenzar a aprovechar los componentes que requieras de DS. Te invitamos a consultar la documentación disponible en la **sección de Implementación de cada componente**, encontrarás información detallada sobre cómo utilizar cada uno de ellos.

[Documentación de Design System Bamboo](https://bamboo.tec.mx/latest/te-damos-la-bienvenida/bamboo-GkY8UT7J)
