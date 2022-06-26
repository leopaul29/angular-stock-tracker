import { Component, Input, OnInit } from '@angular/core';
import { StocksService } from '../../core/stocks.service';
import { IStock } from '../../models/stock.model';

@Component({
  selector: 'app-stock-details',
  template: `<div>stock details!
  </div>`,
  styles: [],
})
export class StockDetailsComponent implements OnInit {
  stock: IStock;

  constructor(private stocksService: StocksService) {}

  ngOnInit() {
    this.stock = this.stocksService.getStocks()[0];
  }
}
