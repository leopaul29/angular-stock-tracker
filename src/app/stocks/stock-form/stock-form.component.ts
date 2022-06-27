import { Component, OnDestroy, OnInit } from '@angular/core';
import { pipe, Subscription } from 'rxjs';
import { StocksTrackingService } from '../../core/stocks-tracking.service';
import { StocksService } from '../../core/stocks.service';
import { IStock } from '../../models/stock.model';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css'],
})
export class StockFormComponent implements OnInit, OnDestroy {
  // form input
  stockSymbol: string;
  // ADD VALIDATION_ERR
  stockListSubscription: Subscription;
  errorMsg: string;

  constructor(
    private stocksService: StocksService,
    private stocksTraking: StocksTrackingService
  ) {
    this.stockSymbol = '';
    this.errorMsg = '';
    this.stockListSubscription = new Subscription();
  }

  ngOnInit() {
    this.stockListSubscription = this.stocksTraking.stock$.subscribe(
      (data: IStock) => {
        if (!data) {
          this.errorMsg = 'Stock not found';
          return;
        }
        if (
          !this.stocksService.stockList.find((stock) => {
            return (
              stock.symbol === data.symbol &&
              data.name &&
              data.currentPrice != 0
            );
          })
        ) {
          this.stocksService.addStock(data);
        }
        if (
          this.stocksService.stockList.find((stock) => {
            return {} as IStock;
          })
        ) {
        }
      },
      (err) => {
        alert(err);
        console.error('Error:', err);
      },
      () => console.log('Completed add stock')
    );
  }

  ngOnDestroy(): void {
    this.stockListSubscription.unsubscribe();
  }

  addStock(formValues): void {
    if (formValues && formValues.stockSymbol) {
      this.stocksTraking.selectedSymbolChanged(formValues.stockSymbol);
      this.stocksTraking.stock$;
      this.stockSymbol = '';
    }
  }
}
