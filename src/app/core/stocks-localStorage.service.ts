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

  getStocklistArray(): string[] {
    return Array.from(this.stocksSymbol);
  }

  addStocks(stockSymbol: string): void {
    if (this.stocksSymbol) {
      this.stocksSymbol.add(stockSymbol);
      this.store();
    }
  }

  removeStockSymbol(symbol: string): void {
    if (this.stocksSymbol) {
      this.stocksSymbol.delete(symbol);
    }
    this.store();
  }

  /**
   * LocalStorage store and load methods
   */
  store() {
    const arr = this.getStocklistArray();
    localStorage.setItem(this.key, JSON.stringify(arr));
  }

  load(): void {
    this.clearAllStocksSymbol();
    let storedStocks = localStorage.getItem(this.key);

    if (storedStocks && this.stocksSymbol) {
      try {
        this.stocksSymbol = new Set(
          JSON.parse(storedStocks).filter((stock: string) => stock)
        );
        this.store();
      } catch (err) {
        alert(
          'An error has been detected while decoding the stocklist in local memory.\nThe stocklist has been cleared'
        );
        console.error(
          'Cannot restor stock data. The stocklist has been cleared',
          err
        );
        this.clearAllStocksSymbol();
        this.clearLocalStorage();
      }
    }
  }

  /**
   * Clear
   */
  clearAllStocksSymbol(): void {
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
