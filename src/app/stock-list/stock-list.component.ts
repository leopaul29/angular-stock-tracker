import { Component, Input, OnInit } from '@angular/core';
import { StocksService } from '../core/stocks.service';
import { IStock } from '../models/stock.model';

@Component({
  selector: 'app-stock-list',
  template: `{{stocklistjson}}
  <div *ngFor="let stock of visibleStockList">
    <app-stock-thumbnail [stock]="stock"></app-stock-thumbnail> 
  </div>`,
  styles: [],
})
export class StockListComponent implements OnInit {
  stockList: IStock[];
  visibleStockList: IStock[];
  stocklistjson: string;
  constructor(private stocksService: StocksService) {}

  ngOnInit() {
    this.stockList = this.stocksService.getStocks();
    this.stocklistjson = JSON.stringify(this.stockList);
    this.visibleStockList = this.stockList.filter((stock) => stock !== null);
    console.log('this.stockList', this.stockList);
  }
}
