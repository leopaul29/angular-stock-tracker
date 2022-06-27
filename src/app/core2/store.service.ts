import { Injectable, OnInit } from '@angular/core';
import { StocksService } from '../core2/stock.service';
import { IStock } from '../models/stock.model';
import { StocksManagerService } from './stocks-manager.service';

@Injectable()
export class StoreService implements OnInit {
  private key = 'STOCKSSYMBOLLIST';
  stockList$ = this.stocksManagerService.stockList$;

  constructor(
    private stocksManagerService: StocksManagerService,
    private stocksService: StocksService
  ) {}

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
    let storedStocks = localStorage.getItem(this.key);

    if (storedStocks) {
      try {
        const tempStockList: string[] = JSON.parse(storedStocks).filter(
          (stock: string) => stock
        );
        tempStockList.map((symbol) => {
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
