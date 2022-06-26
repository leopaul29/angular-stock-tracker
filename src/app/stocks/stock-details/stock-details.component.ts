import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StocksService } from '../../core/stocks.service';
import { IStock } from '../../models/stock.model';

@Component({
  selector: 'app-stock-details',
  template: `<div class="border">stock details!
  {{stock | json}}
  </div>
  <nav>
  <a [routerLink]="['/stocks']" class="button">< Back to list of stocks</a>
  </nav>`,
  styles: [],
})
export class StockDetailsComponent implements OnInit {
  stock: IStock;

  constructor(
    private stocksService: StocksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.stock = this.stocksService.getStock(
      this.route.snapshot.params['symbol']
    );
  }
}
