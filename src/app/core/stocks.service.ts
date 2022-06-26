import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
        console.log('GOT1:', data);
        if (
          data &&
          !this.stockList.find((stock) => {
            return (
              stock.symbol === data.symbol &&
              data.name &&
              data.currentPrice != 0
            );
          })
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
    this.stocksTraking.selectedSymbolChanged(symbol);
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
        /*this.stockList.map((stock) => {
          if (stock && stock.symbol === symbol && data.name) {
            console.log('data profile', data);
            stock.name = data.name;
            stock.logo = data.logo;
          }
        });*/
      },
      (err: any) => console.log(err)
    );

    this.stockTraking.getStockQuote(symbol).subscribe(
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
        /*this.stockList.map((stock, index) => {
          if (
            stock &&
            stock.symbol === symbol &&
            data.currentPrice.toFixed(2) != '0'
          ) {
            console.log('data quote', data.currentPrice.toFixed(2));
            this.stockList[index].changeToday = +data.changeToday.toFixed(2);
            this.stockList[index].openPrice = +data.openPrice.toFixed(2);
            this.stockList[index].currentPrice = +data.currentPrice.toFixed(2);
            this.stockList[index].highPrice = +data.highPrice.toFixed(2);
          }
        });*/
      },
      (err: any) => console.log(err)
    );

    /*this.stockTraking.getStockProfile2(symbol).subscribe(
      (data: IStock) => this.stockList.push(data),
      (err: any) => console.log(err)
    );*/
  }
}
