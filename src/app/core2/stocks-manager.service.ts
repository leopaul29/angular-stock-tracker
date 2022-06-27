import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IStock } from '../models/stock.model';
import { StorageService } from './storage.service';

@Injectable({
  // singleton
  providedIn: 'root',
})
export class StocksManagerService {
  private stockList: IStock[];
  stockList$: Observable<IStock[]>;

  constructor(private storage: StorageService) {
    this.stockList = new Array<IStock>();
    this.stockList$ = of(this.stockList);

    this.storage.load();
    this.intiStocklist(this.storage.getSymbolList());
  }

  private intiStocklist(storageStockList: string[]) {
    console.log('storageStockList', storageStockList);
    if (storageStockList) {
      storageStockList.map((symbol) => {
        this.addStockBySymbol(symbol);
      });
    }
  }

  addStockBySymbol(symbol: string): void {
    this.stockList.push({ symbol: symbol } as IStock);

    /*this.stocksCustomLoader.getStockProfile(symbol).subscribe(
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
      (err: any) => console.error(err)
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
      (err: any) => console.error(err)
    );*/
  }

  stockExist(symbol: string): boolean {
    return (
      this.stockList.find((stock) => {
        return stock.symbol === symbol && stock.name && stock.currentPrice != 0;
      }) != undefined
    );
  }

  addStock(stock: IStock) {
    if (this.stockList && stock && !this.stockExist(stock.symbol)) {
      this.stockList.push(stock);
      this.storage.store(this.stockList);
    }
  }

  removeStock(symbol: string): void {
    if (this.stockList.length <= 0) return;

    const index = this.stockList.findIndex(
      (stock) => stock && stock.symbol === symbol
    );
    this.stockList.splice(index, 1);
    this.storage.store(this.stockList);
  }

  clearAll(): void {
    this.stockList.length = 0;
    this.storage.store(this.stockList);
  }
}
