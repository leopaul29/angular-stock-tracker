import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../core/stocks.service';

@Component({
  selector: 'app-stock-list',
  template: `<app-stock-list-filter></app-stock-list-filter>
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
  //visibleStockList: IStock[];

  stockList$ = this.stocksService.stockList$;

  constructor(private stocksService: StocksService) {}

  ngOnInit() {}

  clearAll() {
    this.stocksService.clearAll();
  }
}
