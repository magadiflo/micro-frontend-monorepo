const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  //* Definimos el nombre con el que será utilizado este micro frontend
  name: 'mfPayment',

  //* Estamos compartiendo un PaymentComponent, pero ese es un componente del tipo StandAlone,
  //* es decir, por debajo es un módulo en sí mismo.
  exposes: {
    './PaymentComponent': './projects/mf-payment/src/app/payment/payment.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  //* Recordar, que como estamos usando la librería en este micro frontend,
  //* debemos usar la opción sharedMapping y colocar el alias @commons-lib
  sharedMappings: ["@commons-lib"],
});
