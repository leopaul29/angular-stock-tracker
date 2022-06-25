import { Component, OnInit } from '@angular/core';
import { StocksService } from '../core/stocks.service';

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
    /*this.sub = this.stocksService
      .getStocks()
      .subscribe((stockList) => (this.stockList = stockList));
    this.stocklistjson = JSON.stringify(this.stockList);

    //this.visibleStockList = this.stockList.filter((stock) => stock !== null);
    console.log('this.stockList', this.stockList);*/
  }

  clearAll() {
    console.log('list clearAll');
    this.stocksService.clearAll();
    //this.visibleStockList = this.stockList.filter((stock) => stock !== null);
    this.stocklistjson = JSON.stringify(this.stocksService.getStocks());
  }
}
