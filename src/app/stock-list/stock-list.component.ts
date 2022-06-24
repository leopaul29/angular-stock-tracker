import { Component, Input, OnInit } from '@angular/core';
import { StocksService } from '../core/stocks.service';
import { IStock } from '../models/stock.model';

@Component({
  selector: 'app-stock-list',
  template: `<div *ngFor="let stock of visibleStockList">
    <app-stock-thumbnail [stock]="stock"></app-stock-thumbnail> 
  </div>`,
  styles: [],
})
export class StockListComponent implements OnInit {
  stockList: IStock[];
  visibleStockList: IStock[];
  constructor(private stocksService: StocksService) {}

  ngOnInit() {
    this.stockList = this.stocksService.getStocks();
    this.visibleStockList = this.stockList;
    console.log('this.stockList', this.stockList);
  }
}
