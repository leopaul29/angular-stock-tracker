import { Injectable } from '@angular/core';
import { IStock } from '../models/stock.model';
import { StockTrackingService } from './stock-tracking.service';
import { StocksLocalStorageService } from './stocks-localStorage.service';

@Injectable({
  // singleton
  providedIn: 'root',
})
export class StocksService {
  stockList: IStock[];

  constructor(
    private stockTraking: StockTrackingService,
    private stocksLocalStorage: StocksLocalStorageService
  ) {
    this.stockList = new Array();
  }

  load() {
    this.stocksLocalStorage.load();
    this.generateStocks(this.stocksLocalStorage.getStocklistArray());
  }

  generateStocks(localStorageStockList: Array<string>): void {
    console.log('localStorageStockList', localStorageStockList);
    localStorageStockList.map((symbol) => {
      this.addStockBySymbol(symbol);
    });
    //this.stockList.filter((stock) => stock.name);
    /*this.getStockBySymbol('GOOGL');
    /*this.getStockBySymbol('AAPL');
    this.getStockSymbol('META');
    this.getStockSymbol('AMZN');
    this.getStockSymbol('TSLA');*/
  }

  getStocks(): IStock[] {
    return this.stockList;
  }

  addStockBySymbol(symbol: string): void {
    let newStock = <IStock>{ symbol: symbol };
    this.stockList.push(newStock);

    this.stockTraking.getStockProfile(symbol).subscribe(
      (data: IStock) => {
        this.stockList.map((stock, index) => {
          //console.log('data', data);

          if (stock.symbol === symbol && data.name) {
            stock.name = data.name;
          } else {
            stock = null;
          }
        });
      },
      (err: any) => console.log(err)
    );

    this.stockTraking.getStockQuote(symbol).subscribe(
      (data: IStock) => {
        this.stockList.map((stock, index) => {
          if (stock && stock.symbol === symbol) {
            this.stockList[index].changeToday = data.changeToday;
            this.stockList[index].openPrice = data.openPrice;
            this.stockList[index].currentPrice = data.currentPrice;
            this.stockList[index].highPrice = data.highPrice;
          }
        });
      },
      (err: any) => console.log(err)
    );

    this.stocksLocalStorage.addStocks(symbol);
    /*console.log('test', this.stockTraking.getStockProfile2(symbol));
    this.stockTraking.getStockProfile2(symbol).subscribe(
      (data: IStock) => this.stockList.push(data),
      (err: any) => console.log(err)
    );*/
  }
}
