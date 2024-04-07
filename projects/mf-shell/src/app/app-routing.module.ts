import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//* Para que no nos marque error en la ruta de improtación,
//* es que agregamos el archivo custom.d.ts con cierta configuración.
const routes: Routes = [
  //* Primer microfrontend
  {
    path: '',
    loadChildren: () => import('mfShopping/ProductsModule').then(m => m.ProductsModule),
  },
  //* Segundo microfrontend
  {
    path: 'payment',
    loadChildren: () => import('mfPayment/PaymentComponent').then(c => c.PaymentComponent),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
