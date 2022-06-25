import { Injectable } from '@angular/core';

@Injectable({
  // singleton
  providedIn: 'root',
})
export class StocksLocalStorageService {
  key = 'STOCKSSYMBOLLIST';
  stocksSymbol: Set<string>;

  constructor() {
    this.stocksSymbol = new Set<string>();
  }

  addStocks(stockSymbol: string): void {
    if (this.stocksSymbol) {
      this.stocksSymbol.add(stockSymbol);
      this.store();
    }
  }

  getStocklistArray(): string[] {
    return Array.from(this.stocksSymbol);
  }

  store() {
    const arr = this.getStocklistArray();
    localStorage.setItem(this.key, JSON.stringify(arr));
  }

  load(): void {
    this.clearStocksSymbol();
    let storedStocks = localStorage.getItem(this.key);

    if (storedStocks && this.stocksSymbol) {
      this.stocksSymbol = new Set(JSON.parse(storedStocks));
    }
  }

  clearStocksSymbol(): void {
    if (this.stocksSymbol) {
      this.stocksSymbol.clear();
    } else {
      this.stocksSymbol = new Set<string>();
    }
  }

  clearLocalStorage(): void {
    localStorage.removeItem(this.key);
  }
}
