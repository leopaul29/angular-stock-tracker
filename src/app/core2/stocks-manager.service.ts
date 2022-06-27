import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IStock } from '../models/stock.model';
import { StoreService } from './store.service';

@Injectable()
export class StocksManagerService {
  private stockList: IStock[];
  stockList$: Observable<IStock[]>;

  constructor(private storeService: StoreService) {
    this.stockList = new Array<IStock>();
    this.stockList$ = of(this.stockList);
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
    }
  }

  removeStock(symbol: string): void {
    if (this.stockList.length <= 0) return;

    const index = this.stockList.findIndex(
      (stock) => stock && stock.symbol === symbol
    );
    this.stockList.splice(index, 1);
  }

  clearAll(): void {
    this.stockList.length = 0;
    this.storeService.clearLocalStorage();
  }
}
