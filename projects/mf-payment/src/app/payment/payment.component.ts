import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ICommonProduct } from '@commons-lib';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PaymentComponent implements OnInit {

  public products: ICommonProduct[] = [];

  ngOnInit(): void {
    const productsStorage = localStorage.getItem('products');
    console.log(productsStorage);

    if (productsStorage) {
      this.products = JSON.parse(productsStorage) as ICommonProduct[];
    }
  }

}
