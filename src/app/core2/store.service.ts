import { Injectable, OnInit } from '@angular/core';
import { IStock } from '../models/stock.model';
import { StocksManagerService } from './stocks-manager.service';

@Injectable()
export class StoreService implements OnInit {
  private key = 'STOCKSSYMBOLLIST';
  stockList$ = this.stocksManagerService.stockList$;

  constructor(private stocksManagerService: StocksManagerService) {}

  ngOnInit(): void {
    this.stockList$.subscribe(
      (stocklist: IStock[]) => this.store(stocklist),
      (err) => console.error('Error when storing the stocklist', err),
      () => console.log('Store completed!')
    );
  }

  store(stocklist: IStock[]) {
    const arr: string[] = stocklist.map((stock: IStock) => stock.symbol);
    localStorage.setItem(this.key, JSON.stringify(arr));
  }

  load(): void {
    /*this.clearAllStocksSymbol();
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
    }*/
  }

  clearLocalStorage(): void {
    localStorage.removeItem(this.key);
  }
}
