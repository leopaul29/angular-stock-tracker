import { Injectable } from '@angular/core';
import { IStock } from '../model/stock.model';

@Injectable()
export class StocksService {
  stocksSymbolList: IStock[];

  constructor() {}

  addStock(stockSymbol: string) {
    this.stocksSymbolList.push(null);
  }

  getStocks() {
    return this.stocksSymbolList;
  }
}
