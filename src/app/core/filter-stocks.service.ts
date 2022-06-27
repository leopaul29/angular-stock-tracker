import { Injectable } from '@angular/core';
import { IStock } from '../models/stock.model';

@Injectable()
export class FilterStocksService {
  constructor() {}

  filterStocks(filter: string, stockList: IStock[]): IStock[] {
    if (!filter) {
      return stockList;
    }
    if (filter === 'name') {
      return stockList.sort(this.sortByNameAsc);
    }
    if (filter === 'currentPrice') {
      return stockList.sort(this.sortByPriceDesc);
    }
    return [];
  }
  sortByNameAsc(s1: IStock, s2: IStock): number {
    if (s1.name > s2.name) return 1;
    else if (s1.name === s2.name) return 0;
    else return -1;
  }
  sortByPriceDesc(s1: IStock, s2: IStock): number {
    return s2.currentPrice - s1.currentPrice;
  }
}
