import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StockTrackingService } from '../core/stock-tracking.service';
import { StocksService } from '../core/stocks.service';
import { IStockCompany } from '../model/stock-tracking.model';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styles: [],
})
export class StockFormComponent implements OnInit {
  stockSymbol: string;
  // ADD VALIDATION_ERR
  constructor(
    private stockTrackingService: StockTrackingService,
    private stocksService: StocksService
  ) {}

  ngOnInit() {
    this.stockTrackingService
      .getStockQuote('AAPL')
      .subscribe((data: IStockCompany) =>
        console.log(`subscribed: ${JSON.stringify(data)}`)
      );
  }

  addStock(formValues): void {
    console.log('addStock', formValues);
    this.stocksService.addStock(formValues.stockSymbol);
  }
}
