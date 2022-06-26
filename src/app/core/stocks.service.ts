import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IStock } from '../models/stock.model';
import { StocksCustomLoaderService } from './stocks-customLoader.service';
import { StocksLocalStorageService } from './stocks-localStorage.service';
import { StocksTrackingService } from './stocks-tracking.service';

@Injectable({
  // singleton
  providedIn: 'root',
})
export class StocksService {
  stockList: IStock[];
  stockList$: Observable<IStock[]>;
  stockSentiment;

  constructor(
    private stocksCustomLoader: StocksCustomLoaderService,
    private stocksLocalStorage: StocksLocalStorageService,
    private stocksTraking: StocksTrackingService
  ) {
    this.stockList = new Array();
    this.stockList$ = of(this.stockList);
  }

  addStock(stock: IStock): void {
    this.stockList.push(stock);
    this.stocksLocalStorage.addStocks(stock.symbol);
  }

  getStock(symbol: string): IStock {
    return this.stockList.find((stock) => stock.symbol === symbol);
  }

  getSentiment(symbol: string): void {
    //stockSentiment
  }

  /**
   * Clear stocks
   */
  clear(symbol: string): void {
    console.log('clear', symbol);
    this.stocksLocalStorage.clearStockSymbol(symbol);
    this.stocksLocalStorage.store();
    const index = this.stockList.findIndex(
      (stock) => stock && stock.symbol === symbol
    );
    this.stockList.splice(index, 1);
  }

  clearAll(): void {
    this.stocksLocalStorage.clearAllStocksSymbol();
    this.stocksLocalStorage.clearLocalStorage();
    this.stockList.length = 0;
  }

  /**
   * Load stocks from local storage
   */
  load(): void {
    this.stocksLocalStorage.load();
    this.generateStocks(this.stocksLocalStorage.getStocklistArray());
  }

  generateStocks(localStorageStockList: Array<string>): void {
    console.log('localStorageStockList', localStorageStockList);
    if (localStorageStockList) {
      localStorageStockList.map((symbol) => {
        this.addCustomeStock(symbol);
      });
    }
  }

  addCustomeStock(symbol: string): void {
    this.stockList.push({ symbol: symbol } as IStock);

    this.stocksCustomLoader.getStockProfile(symbol).subscribe(
      (data: IStock) => {
        const index = this.stockList.findIndex(
          (stock) => stock && stock.symbol === symbol && data.name
        );
        if (!data.name) {
          this.stockList.splice(index, 1);
        }
        this.stockList[index] = {
          ...this.stockList[index],
          name: data.name,
          logo: data.logo,
        };
      },
      (err: any) => console.log(err)
    );

    this.stocksCustomLoader.getStockQuote(symbol).subscribe(
      (data: IStock) => {
        const index = this.stockList.findIndex(
          (stock) => stock && stock.symbol === symbol
        );
        if (data.currentPrice.toFixed(2) == '0.00') {
          this.stockList.splice(index, 1);
        }
        this.stockList[index] = {
          ...this.stockList[index],
          changeToday: +data.changeToday.toFixed(2),
          openPrice: +data.openPrice.toFixed(2),
          currentPrice: +data.currentPrice.toFixed(2),
          highPrice: +data.highPrice.toFixed(2),
        };
      },
      (err: any) => console.log(err)
    );
  }
}
