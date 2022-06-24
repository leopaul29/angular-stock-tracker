import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IStock } from '../models/stock.model';
import { StockTrackingService } from './stock-tracking.service';

@Injectable({
  // singleton
  providedIn: 'root',
})
export class StocksService {
  stockList: IStock[];

  constructor(private stockTraking: StockTrackingService) {}

  addStock(stockSymbol: IStock) {
    this.stockList.push(stockSymbol);
    console.log('this.addStock ss', stockSymbol);
  }

  getStocks(): IStock[] {
    return this.stockList;
  }

  generateStubStocks(): void {
    this.getStockSymbol('GOOGL');
    this.getStockSymbol('AAPL');
    this.getStockSymbol('META');
    this.getStockSymbol('AMZN');
    this.getStockSymbol('TSLA');
    console.log('this.stocksSymbolList ss', this.stockList);
  }

  getStockSymbol(symbol: string): void {
    let stock;
    this.stockTraking.getStockProfile(symbol).subscribe(
      (data: IStock) => (stock = data),
      (err: any) => console.log(err)
    );
  }
}
