# Design System Bamboo

> El framework de diseño Bamboo ofrece a los desarrolladores las herramientas indispensables para potenciar la eficiencia en el desarrollo de productos, permitiéndoles crear más en menos tiempo y liberándolos de la monótona tarea de construir componentes básicos repetitivos.

## Requisitos básicos para instalar el paquete de Bamboo en tu ambiente local:

### Nodejs y npm

**El proyecto de Bamboo fue realizado con la versión v21.6.1 de Node y 10.3.0 de NPM.**

### Migración de Github packages a NPM

Para los equipos con la versión de Bamboo 0.2.1 o inferior, se debe migrar el paquete a NPM ya que el repositorio anterior no se seguirá actualizando, por lo que es necesario este proceso para seguir recibiendo todas las actualizaciones.

Es necesario cerrar la sesión en el scope del TEC, para ello es necesario ejecutar los siguientes comandos:

`npm logout --scope=@ti-tecnologico-de-monterrey-oficial`

`npm uninstall @ti-tecnologico-de-monterrey-oficial/ds-ng`

Una vez hecho lo anterior es necesario borrar el archivo .npmrc con la línea:

`@ti-tecnologico-de-monterrey-oficial:registry=https://npm.pkg.github.com`

Ahora podemos hacer la instalación de Bamboo nuevamente dependiendo de tu versión de Angular

`npm i @ti-tecnologico-de-monterrey-oficial/ds-ng@a17`

`npm i @ti-tecnologico-de-monterrey-oficial/ds-ng@a18`

`npm i @ti-tecnologico-de-monterrey-oficial/ds-ng@a19`

Ahora el paquete deberá tener la versión 0.2.2 o superior, ejemplo para Angular 18.

`"@ti-tecnologico-de-monterrey7-oficial/ds-ng": "^1.5.X18",`

### Visual Studio Code

Puedes utilizar cualquier Entorno de Desarrollo Integrado (IDE), pero te recomendamos utilizar Visual Studio Code.

Si aún no tienes Visual Studio Code instalado, puedes descargarlo desde el sitio oficial:

[Visual Studio Code](https://code.visualstudio.com)

## Instala Design System Bamboo

Ejecuta el siguiente comando en la raíz del proyecto dependiendo de tu versión de Angular:

- Angular 17: `npm install @ti-tecnologico-de-monterrey-oficial/ds-ng@a17`

- Angular 18: `npm install @ti-tecnologico-de-monterrey-oficial/ds-ng@a18`

- Angular 19: `npm install @ti-tecnologico-de-monterrey-oficial/ds-ng@a19`

Sigue los pasos de la guía para configurar los estilos y las fuentes.

## Utiliza Design System Bamboo

Para poder utilizar Bamboo, sigue estos pasos para agregar estilos y configuraciones específicas del paquete:

En el archivo `angular.json` de tu proyecto, agrega el siguiente contenido donde esta _“styles”_ y _“assets”_:

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
    }
],
"styles": [
    "src/styles.scss",
    "node_modules/@ti-tecnologico-de-monterrey-oficial/ds-ng/assets/styles/main.min.css"
],
```

## Instalación de íconos

Agrega las siguientes lineas a tu archivo de estilos global `src/styles.scss`.

**Angular 17.3**

```
$material-symbols-font-path: 'material-symbols/';
@import 'material-symbols/rounded';
```

**Angular 18+**

```
@import 'material-symbols/rounded';
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
