const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "mfShopping": "http://localhost:4201/remoteEntry.js",
    "mfPayment": "http://localhost:4202/remoteEntry.js",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  //* Para poder utilizar dentro de nuestro mf-shell lo exportado en la librería
  sharedMappings: ['@commons-lib']
});
