import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StocksLocalStorageService } from '../core/stocks-localStorage.service';
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
  constructor(
    private stocksService: StocksService,
    private stockslocalStorage: StocksLocalStorageService
  ) {}

  ngOnInit() {
    this.stocksService.generateStubStocks();
    this.stockList = this.stocksService.getStocks();
    this.visibleStockList = this.stockList;
    console.log('this.visibleStockList', this.visibleStockList);
    /*this.stockList = new Array();
    let stocksSymbol = this.stockslocalStorage.getstocklist();
    this.buildStockList(stocksSymbol);*/
  }

  /*private buildStockList(stocksSymbol: Array<string>) {
    of(stocksSymbol).pipe(
      //map((symbol) => <IStock>{ name: symbol }),
      //tap((stock) => this.stockList.push(stock))
      tap((s) => console.log('s', s))
    );
    console.log('this.stockList', this.stockList);
    /*
    stocksSymbol.forEach(function (symbol) {
      //let stock = this.stocksService.getStockSymbol(symbol);
      let stock = 'AAPL';
      //this.stockList.push(stock);
      console.log(symbol);
      this.stockList.push(stock);
    });
  }*/
}
