import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IStock } from '../models/stock.model';
import { StockTrackingService } from './stock-tracking.service';
import { StocksLocalStorageService } from './stocks-localStorage.service';
import { StocksTrackingService } from './stocks-tracking.service';

@Injectable({
  // singleton
  providedIn: 'root',
})
export class StocksService {
  stockList: IStock[];

  stockList$: Observable<IStock[]>;

  constructor(
    private stockTraking: StockTrackingService,
    private stocksTraking: StocksTrackingService,
    private stocksLocalStorage: StocksLocalStorageService
  ) {
    this.stockList = new Array();
    this.stockList$ = of(this.stockList); //.pipe(tap((data) => console.log(data)));
  }

  load() {
    this.stocksLocalStorage.load();
    this.generateStocks(this.stocksLocalStorage.getStocklistArray());
  }

  generateStocks(localStorageStockList: Array<string>): void {
    console.log('localStorageStockList', localStorageStockList);
    if (localStorageStockList) {
      localStorageStockList.map((symbol) => {
        this.addStockBySymbol(symbol);
      });
    }
    //this.stockList.filter((stock) => stock.name);
    /*this.getStockBySymbol('GOOGL');
    /*this.getStockBySymbol('AAPL');
    this.getStockSymbol('META');
    this.getStockSymbol('AMZN');
    this.getStockSymbol('TSLA');*/
  }

  getStocks(): Observable<IStock[]> {
    return of(this.stockList);
  }

  addStockBySymbol(symbol: string): void {
    let newStock = <IStock>{ symbol: symbol };
    this.stocksTraking.stock$.subscribe((data: IStock) => {
      console.log('addstock', data);
      this.stockList.push(data);
    });
    /*    this.stockList.push(newStock);

    //this.stockTraking.getStockProfile(symbol).subscribe(
    this.stockTraking.stockProfile$.subscribe(
      (data: IStock) => {
        this.stockList.map((stock, index) => {
          console.log('data', data);
          if (stock && stock.symbol === symbol) {
            stock.name = data.name;
          }
        });
      },
      (err: any) => console.log(err)
    );

    //this.stockTraking.getStockQuote(symbol).subscribe(
    this.stockTraking.stockQuote$.subscribe(
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

  clearAll() {
    this.stocksLocalStorage.clearStocksSymbol();
    this.stocksLocalStorage.clearLocalStorage();
    this.stockList.length = 0;
  }
}
