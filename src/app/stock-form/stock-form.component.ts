import { Component, OnInit } from '@angular/core';
import { StockTrackingService } from '../core/stock-tracking.service';
import { StocksLocalStorageService } from '../core/stocks-localStorage.service';
import { StocksService } from '../core/stocks.service';
import { IStockForm } from '../models/stock.model';

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

  ngOnInit() {}

  addStock(formValues: IStockForm): void {
    console.log('form addStock', formValues);
    if (formValues && formValues.stockSymbol) {
      this.stocksService.addStockBySymbol(formValues.stockSymbol);
      this.stocklist = JSON.stringify(
        this.stockslocalStorage.getStocklistArray()
      );
    }
  }
}
