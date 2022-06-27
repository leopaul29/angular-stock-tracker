import { Injectable } from '@angular/core';
import { IStock } from '../models/stock.model';

@Injectable({
  // singleton
  providedIn: 'root',
})
export class StorageService {
  private key = 'STOCKSYMBOLLIST';
  private symbolList: string[];

  constructor() {
    this.symbolList = [];
  }

  getSymbolList(): string[] {
    return this.symbolList;
  }

  store(stocklist: IStock[]): void {
    const stocksToStore: string[] = stocklist.map(
      (stock: IStock) => stock.symbol
    );
    console.log('storeService-store:', JSON.stringify(stocksToStore));
    localStorage.setItem(this.key, JSON.stringify(stocksToStore));
  }

  load(): void {
    let storedStocks = localStorage.getItem(this.key);

    if (storedStocks) {
      try {
        this.symbolList = JSON.parse(storedStocks).filter(
          (stock: string) => stock
        );
      } catch (err) {
        alert(
          'An error has been detected while decoding the stocklist in local memory.\nThe stocklist has been cleared'
        );
        console.error(
          'Cannot restor stock data. The stocklist has been cleared',
          err
        );
        this.clearLocalStorage();
      }
    }
  }

  clearLocalStorage(): void {
    localStorage.removeItem(this.key);
  }
}
