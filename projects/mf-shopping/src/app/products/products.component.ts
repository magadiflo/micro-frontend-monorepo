import { Component, OnInit } from '@angular/core';

import { AnimeService } from '../services/anime.service';
import { IProductCard } from '../models/product-card.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: IProductCard[] = [];

  constructor(private _animeService: AnimeService) { }

  ngOnInit(): void {
    this._animeService.getAnimes()
      .subscribe(response => {
        this.products = response;
      });
  }

}
