import { Component, Input, OnInit } from '@angular/core';
import { StocksService } from '../core/stocks.service';
import { IStock } from '../model/stock.model';

@Component({
  selector: 'app-stock-list',
  template: `<div *ngFor="let stock of visibleStockList">
    <app-stock-thumbnail [stock]="stock"></app-stock-thumbnail> 
  </div>`,
  styles: [],
})
export class StockListComponent implements OnInit {
  stockList: IStock[];
  visibleStockList = [{ c: '123' }, { c: '456' }, { c: '789' }];
  constructor(private stocksService: StocksService) {}

  ngOnInit() {
    this.stockList = this.stocksService.getStocks();

  }
}
