# [MICRO - FRONTEND con Angular y Module Federation](https://www.youtube.com/watch?v=12x2QpDCsfk&t=794s)

Tutorial tomado del canal de **youtube LogiDev**

---

## Características del proyecto

- Angular 15.1.1
- Node v16.13.2


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
