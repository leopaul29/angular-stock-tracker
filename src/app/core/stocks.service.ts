import { Injectable } from '@angular/core';

@Injectable()
export class StocksService {
  stocksSymbolList: IStock[];

  constructor() {}

  addStock(stockSymbol: string) {
    this.stocksSymbolList.push(stockSymbol);
  }

  getStocks() {
    return this.stocksSymbolList;
  }
}
