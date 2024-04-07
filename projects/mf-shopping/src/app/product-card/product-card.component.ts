import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  clickCard(): void {
    console.log('clickCard()');
  }

}
