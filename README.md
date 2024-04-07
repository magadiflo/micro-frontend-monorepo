# [MICRO - FRONTEND con Angular y Module Federation](https://www.youtube.com/watch?v=12x2QpDCsfk&t=794s)

Tutorial tomado del canal de **youtube LogiDev**

---

## Características del proyecto

- Angular 15.2.10
- Node 18.16.0


## Creando espacio de trabajo

Para trabajar con una arquitectura monorepo en Angular, **primero debemos crear nuestro espacio de trabajo** utilizando el siguiente comando.

```bash
$ ng new micro-frontend-monorepo --create-application=false
```

**NOTA**

`--create-application=false`, con esta bandera le decimos a la CLI que no queremos que nos cree la carpeta `/src`, ni tampoco los archivos `karma.config.js`, etc., es decir, **únicamente queremos que nos cree un espacio de trabajo.**

A continuación de muestra los archivos y directorios creados en nuestro espacio de trabajo luego de haber ejecutado el comando anterior:

![Epacio de trabajo](./assets/01.espacio-trabajo.png)

Las dependencias del `package.json`:

```json
"dependencies": {
    "@angular/animations": "^15.1.0",
    "@angular/common": "^15.1.0",
    "@angular/compiler": "^15.1.0",
    "@angular/core": "^15.1.0",
    "@angular/forms": "^15.1.0",
    "@angular/platform-browser": "^15.1.0",
    "@angular/platform-browser-dynamic": "^15.1.0",
    "@angular/router": "^15.1.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.12.0"
},
"devDependencies": {
    "@angular/cli": "~15.1.1",
    "@angular/compiler-cli": "^15.1.0",
    "@types/jasmine": "~4.3.0",
    "jasmine-core": "~4.5.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.0.0",
    "typescript": "~4.9.4"
}
```

---

# Creando Micro Frontends y Librería

---

## 1° Micro frontend: mf-shell

En toda arquitectura de micro frontend siempre vamos a tener un proyecto que se encargue de orquestar los demás micro frontend, en este caso, el proyecto `mf-shell` que construiremos a continuación tendrá esa responsabilidad.

Para crear nuestra primera aplicación de micro frontend llamado `mf-shell` ejecutaremos el siguiente comando:

```bash
$ ng g application mf-shell --style=scss --routing=true
```

**NOTA**

- Observar que le estamos indicando qué tipo de hoja de estilo usaremos: `scss`.
- Le indicamos que nos construya el módulo de rutas: `--routing=true`.

## 2° Micro frontend: mf-payment

El segundo proyecto o micro frontend que crearemos se llamará `mf-payment`. En este caso no crearemos las rutas como lo hicimos en el primer micro frontend.

```bash
$ ng g application mf-payment --style=scss
```

## 3° Micro frontend: mf-shopping

Como tercer proyecto o micro frontend crearemos el `mf-shopping`. En este proyecto sí necesitamos el módulo de rutas, es por eso que agregamos la bandera `--routing=true`.

```bash
$ ng g application mf-shopping --style=scss --routing=true
```

## 4° Proyecto librería: commons-lib

Como último proyecto, crearemos el del tipo librería llamado `commons-lib`. Este proyecto de tipo librería lo usaremos para compartir un `service` para que se puedan comunicar cada uno de los micro frontend.

Ahora, también se podría crear un proyecto de tipo librería de Angular donde agreguemos todos los componentes que van a ser utilizados por cada uno de los micro frontends, de esa manera, nuestros componentes tendría una guía de estilos, el mismo estilo de diseños para cada uno de los micro frontends y así, como ese ejemplo podríamos darle más utilidades a un proyecto de librería. **La idea es que nuestros micro frontends también pueden consumir otras librerías realizadas en el mismo framework de Angular.**

```bash
$ ng g library commons-lib
```

Luego de ejecutar todos los comandos en la raíz del espacio de trabajo, la estrucura del proyecto quedaría de esta manera:

![microfrontends](./assets/02.micro-frontends-and-library.png)

En la imagen anterior, estamos desplegando el directorio del micro frontend `mf-shopping` para conocer detalles de su estructura interna.

En la imagen siguiente vemos la estructura del proyecto de librería `commons-lib`:

![library](./assets/03.library.png)

---

## [Activando Module Federation](https://www.npmjs.com/package/@angular-architects/module-federation)

`@angular-architects/module-federation`, es una herramienta que permite la integración de la funcionalidad de `Module Federation` en aplicaciones Angular. `Module Federation` es una característica de Webpack 5 que **facilita la compartición de código entre distintas aplicaciones JavaScript. Permite cargar módulos de manera remota y dinámica en tiempo de ejecución, lo que resulta especialmente útil en entornos de microfrontends y arquitecturas distribuidas.**

`@angular-architects/module-federation` proporciona una capa de abstracción y herramientas específicas para trabajar con `Module Federation` en el contexto de proyectos Angular, simplificando la configuración y el uso de esta funcionalidad dentro de una aplicación Angular.

Al utilizar `@angular-architects/module-federation`, los desarrolladores pueden definir fácilmente qué partes de su aplicación Angular desean compartir y cómo integrarlas con otras aplicaciones que también utilicen Module Federation.

Volviendo a nuestro proyecto, debemos activar el `module federation` a cada proyecto que hemos creado. Para eso necesitamos agrega la siguiente librería a nuestro proyecto:

```bash
$ npm i -D @angular-architects/module-federation@^15.0.0
```

**NOTA**

> Observar, que como estamos usando Angular 15, en la instalación del angular-architects especificamos la versión que será compatible con nuestra vesión de Angular.

## Agregando Module Federation: mf-shell

Una vez que hemos instalado la librería `@angular-architects/module-federation`, nos toca agregar el `module federation` a cada proyecto creado inicialmente. 

En este caso lo agregaremos al proyecto `mf-shell` utilizando el siguiente comando:

```bash
$ ng add @angular-architects/module-federation@^15.0.0 --project mf-shell --port 4200 --type host

Skipping installation: Package already installed
CREATE projects/mf-shell/webpack.prod.config.js (46 bytes)
CREATE projects/mf-shell/webpack.config.js (413 bytes)
CREATE projects/mf-shell/src/bootstrap.ts (214 bytes)
UPDATE tsconfig.json (903 bytes)
UPDATE projects/mf-shell/tsconfig.app.json (217 bytes)
UPDATE angular.json (8678 bytes)
UPDATE package.json (1273 bytes)
UPDATE projects/mf-shell/src/main.ts (58 bytes)
√ Packages installed successfully.
```

**DONDE**

- `--project`, seleccionamos el proyecto al que aplicaremos esta configuración.
- `--type`, le decimos qué tipo de micro frontend va a ser. En este caso, este será un micro frontend del tipo `host`.
- `--port`, le decimos que este micro frontend correrá en el puerto 4200.

Luego de que se ejecuta el comando anterior, se nos creará varios archivos, uno de ellos es el `webpack.config.js`.

En el archivo `webpack.config.js` observamos el siguiente código que se crea por defecto:

```javascript
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "mfPayment": "http://localhost:4200/remoteEntry.js",
    "mfShopping": "http://localhost:4201/remoteEntry.js",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
```

- En el objeto `remotes` se agregan los micro frontends que se van a integrar, en este caso, al proyecto host `mf-shell`, ya que ahí está ese archivo.
Es importante notar que micro frontends fueron agregados de manera automática cuando agregamos el `module federation` al `mf-shell`.

- En el objeto `shared` se colocan todo aquello que se va a compartir. Por ejemplo, compartirá el `package.json` del proyecto con todos los micro frontends para que trabajen con la misma versión de librerías.

## Agregando Module Federation: mf-shopping

Agregamos el module federation al micro frontend mf-shopping. Es importante notar que dentro de las banderas utilizadas estamos diciéndole que es del `--type remote`. 
Es `remote` porque este micro frontend será integrada dentro de la aplicación `host`, es decir, dentro del micro frontend `mf-shell`.

Si observamos el `mf-shell` veremos que en el archivo `webpack.config.js` el objeto `remotes` y dentro de ese objeto está siendo llamado nuestro micro frontend
`mf-shopping`, por esa razón es que este micro frontend debe ser remoto, incluso le hemos colocado el puerto `4201` desde donde será llamado:

```bash
$ ng add @angular-architects/module-federation@^15.0.0 --project mf-shopping --port 4201 --type remote

Skipping installation: Package already installed
CREATE projects/mf-shopping/webpack.prod.config.js (46 bytes)
CREATE projects/mf-shopping/webpack.config.js (389 bytes)
CREATE projects/mf-shopping/src/bootstrap.ts (214 bytes)
UPDATE tsconfig.json (903 bytes)
UPDATE projects/mf-shopping/tsconfig.app.json (217 bytes)
UPDATE angular.json (9113 bytes)
UPDATE package.json (1273 bytes)
UPDATE projects/mf-shopping/src/main.ts (58 bytes)
√ Packages installed successfully.
```

Luego de que se ejecuta el comando anterior, se nos creará varios archivos, uno de ellos es el `webpack.config.js`.

En el archivo `webpack.config.js` observamos el siguiente código que se crea por defecto:

```javascript
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mf-shopping',

  exposes: {
    './Component': './projects/mf-shopping/src/app/app.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
```
Observemos que como este micro frontend es del `type remote` el contenido del archivo `webpack.config.js` es algo distinto al contenido del micro frontend del tipo `host`.

**DONDE**

- `name`, propiedad donde se le asigna un nombre a nuestro micro frontend. En nuestro caso lo puso tal cual se llama el proyecto `mf-shopping`.
- `expose`, aquí deben ir los elementos o módulos que queremos que se compartan. Por defecto nos da el ejemplo que dice, sabes qué comparteme este componente `./projects/mf-shopping/src/app/app.component.ts`,
  pero, lo que en realidad debemos compartir son `módulos` dado que estamos usando `Module Federation`, precisamente para compartir `módulos` y no componentes.

**NOTA**
> `Module federation` sirve para compartir **módulos**, por eso se llama federación de **módulos**, lo que vamos a compartir son **módulos**, entonces  en el `expose` lo que debemos exponer en realidad son módulos.
