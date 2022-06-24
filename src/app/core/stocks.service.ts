import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IStock } from '../models/stock.model';
import { StockTrackingService } from './stock-tracking.service';

@Injectable()
export class StocksService {
  stocksSymbolList: IStock[];

  constructor(private stockTraking: StockTrackingService) {}

  addStock(stockSymbol: IStock) {
    this.stocksSymbolList.push(stockSymbol);
    console.log('this.addStock ss', stockSymbol);
  }

  getStocks(): IStock[] {
    return this.stocksSymbolList;
  }

  generateStubStocks(): void {
    this.getStockSymbol('GOOGL');
    this.getStockSymbol('AAPL');
    this.getStockSymbol('META');
    this.getStockSymbol('AMZN');
    this.getStockSymbol('TSLA');
    console.log('this.stocksSymbolList ss', this.stocksSymbolList);
  }

  getStockSymbol(symbol: string): void {
    this.stockTraking
      .getStockProfile(symbol)
      .pipe(tap((data) => console.log(data))); /*.subscribe(
      (data: IStock) => this.stocksSymbolList.push(data),
      (err: any) => console.log(err)
    );*/
  }
}
