import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonsLibService } from '@commons-lib';

import { IProductCard } from '../models/product-card.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  imports: [CommonModule]
})
export class ProductCardComponent {

  @Input() product?: IProductCard;

  constructor(private _commonsLibService: CommonsLibService) { }

  clickCard(): void {
    this._commonsLibService.sendData({
      name: this.product!.name,
      price: this.product!.price
    });
  }

}
