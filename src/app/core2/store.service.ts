import { Injectable, OnInit } from '@angular/core';
import { StocksService } from '../core2/stock.service';
import { IStock } from '../models/stock.model';
import { StocksManagerService } from './stocks-manager.service';

@Injectable({
  // singleton
  providedIn: 'root',
})
export class StoreService implements OnInit {
  private key = 'STOCKSSYMBOLLIST';

  constructor(private stocksService: StocksService) {}

  ngOnInit(): void {}

  store(stocklist: IStock[]) {
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
        const tempStockList: string[] = JSON.parse(storedStocks).filter(
          (stock: string) => stock
        );
        console.log('storeService-load:', JSON.stringify(tempStockList));
        tempStockList.map((symbol) => {
          console.log('load', symbol);
          this.stocksService.selectedSymbolChanged(symbol);
          this.stocksService.stock$;
        });
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
