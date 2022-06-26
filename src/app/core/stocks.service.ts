import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProfile, IQuote } from '../models/stock-tracking.model';
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
    this.stockList$ = of(this.stockList);

    this.stocksTraking.stock$.subscribe(
      (data: IStock) => {
        //console.log('GOT1:', data);
        if (
          data &&
          !this.stockList.find((stock) => stock.symbol === data.symbol)
        ) {
          this.stockList.push(data);
          this.stocksLocalStorage.addStocks(data.symbol);
        }
      },
      (err) => console.log('Error:', err),
      () => console.log('Completed')
    );
  }

  load() {
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

  getStocks(): Observable<IStock[]> {
    return of(this.stockList);
  }

  addStockBySymbol(symbol: string): void {
    //console.log('symbol', symbol);
    this.stocksTraking.selectedSymbolChanged(symbol);
    //this.stocksTraking.stock$;
    //this.stocksTraking.a$;
    this.stocksTraking.stock$;
  }

  clearAll() {
    this.stocksLocalStorage.clearStocksSymbol();
    this.stocksLocalStorage.clearLocalStorage();
    this.stockList.length = 0;
  }

  addCustomeStock(symbol) {
    this.stockList.push({ symbol: symbol } as IStock);

    this.stockTraking.getStockProfile(symbol).subscribe(
      (data: IStock) => {
        this.stockList.map((stock) => {
          //console.log('data', data);
          if (stock && stock.symbol === symbol) {
            stock.name = data.name;
            stock.logo = data.logo;
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

    /*this.stockTraking.getStockProfile2(symbol).subscribe(
      (data: IStock) => this.stockList.push(data),
      (err: any) => console.log(err)
    );*/
  }
}
