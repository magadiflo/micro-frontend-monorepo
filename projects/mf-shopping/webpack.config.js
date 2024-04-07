const { shareAll, withModuleFederationPlugin, SharedMappings } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  //* Le definimos un nombre a este micro frontend
  name: 'mfShopping',

  //* De este micro frontend vamos a exponer este módulo de productos.
  //* Este módulo será utilizable para los demás micro frontends
  exposes: {
    './ProductModule': './projects/mf-shopping/src/app/products/products.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  //* "@commons-lib", alias de las librerías que se utilzará en cada microfrontend. Por detrás,
  //* la librería Angular Architect va a generar la instancia de la descarga y la
  //* va a inyectar a cada uno de los microfrontend. De esa manera es más limpio
  //* interactuar con librerías en un proyecto de Angular
  sharedMappings: ["@commons-lib"]
});
