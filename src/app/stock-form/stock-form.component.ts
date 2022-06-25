import { Component, OnInit } from '@angular/core';
import { StockTrackingService } from '../core/stock-tracking.service';
import { StocksLocalStorageService } from '../core/stocks-localStorage.service';
import { StocksService } from '../core/stocks.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styles: [],
})
export class StockFormComponent implements OnInit {
  stockSymbol: string;
  stocklist: string;
  // ADD VALIDATION_ERR
  constructor(
    private stocksService: StocksService,
    private stockslocalStorage: StocksLocalStorageService
  ) {}

  ngOnInit() {
    /*this.stockTrackingService
      .getStockQuote('AAPL')
      .subscribe((data: IStockCompany) =>
        console.log(`subscribed: ${JSON.stringify(data)}`)
      );*/
    this.stocklist = JSON.stringify(
      this.stockslocalStorage.getStocklistArray()
    );
  }

  addStock(formValues): void {
    console.log('form addStock', formValues);
    if (!formValues.stockSymbol) return;

    this.stocksService.addStockBySymbol(formValues.stockSymbol);
    this.stocklist = JSON.stringify(
      this.stockslocalStorage.getStocklistArray()
    );
  }
}
