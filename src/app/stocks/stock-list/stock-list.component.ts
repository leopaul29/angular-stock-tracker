import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../core/stocks.service';

@Component({
  selector: 'app-stock-list',
  template: `stocklistjson:{{stocklistjson}}
  <app-stock-list-filter></app-stock-list-filter>
  <b>filter here</b>
  <button (click)="clearAll()">Clear All</button>
  <div *ngIf="stockList$ | async as stockList">
    <div *ngFor="let stock of stockList">
      <app-stock-thumbnail [stock]="stock"></app-stock-thumbnail> 
    </div>
  </div>`,
  styles: [],
})
export class StockListComponent implements OnInit {
  //stockList: IStock[];
  //visibleStockList: IStock[];
  stocklistjson: string;

  stockList$ = this.stocksService.stockList$;

  constructor(private stocksService: StocksService) {}

  ngOnInit() {
    this.stocklistjson = JSON.stringify(this.stocksService.getStocks());
  }

  clearAll() {
    this.stocksService.clearAll();
  }
}
