import { Injectable } from '@angular/core';
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
  }

  getStocks(): IStock[] {
    return this.stockList;
  }

  generateStubStocks(): void {
    this.stockList = new Array();
    this.getStockSymbol('GOOGL');
    /*this.getStockSymbol('AAPL');
    this.getStockSymbol('META');
    this.getStockSymbol('AMZN');
    this.getStockSymbol('TSLA');*/
  }

  getStockSymbol(symbol: string): void {
    /*this.stockTraking.getStockProfile(symbol).subscribe(
      (data: IStock) => this.stockList.push(data),
      (err: any) => console.log(err)
    );
    this.stockTraking.getStockQuote(symbol).subscribe(
      (data: IStock) => {
        console.log('data', data);
        this.stockList.map((stock) => {
          console.log('stock.symbol', stock.symbol);
          console.log('symbol', symbol);
          stock.symbol === symbol
            ? { ...stock, data }
            : stock;
          console.log('stock', stock);
        });
      },
      (err: any) => console.log(err)
    );*/
    console.log('test', this.stockTraking.getStockProfile2(symbol));
    this.stockTraking.getStockProfile2(symbol).subscribe(
      (data: IStock) => this.stockList.push(data),
      (err: any) => console.log(err)
    );
  }
}
