import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StocksTrackingService } from '../../core/stocks-tracking.service';
import { StocksService } from '../../core/stocks.service';
import { IStock, IStockForm } from '../../models/stock.model';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styles: ['./stock-form.component.css'],
})
export class StockFormComponent implements OnInit, OnDestroy {
  // form input
  stockSymbol: string;
  // ADD VALIDATION_ERR
  stockListSubscription: Subscription;

  constructor(
    private stocksService: StocksService,
    private stocksTraking: StocksTrackingService
  ) {}

  ngOnInit() {
    this.stockListSubscription = this.stocksTraking.stock$.subscribe(
      (data: IStock) => {
        console.log('GOT1:', data);
        if (
          data &&
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
      },
      (err) => console.log('Error:', err),
      () => console.log('Completed')
    );
  }

  ngOnDestroy(): void {
    this.stockListSubscription.unsubscribe();
  }

  addStock(formValues: IStockForm): void {
    if (formValues && formValues.stockSymbol) {
      this.stocksTraking.selectedSymbolChanged(formValues.stockSymbol);
      this.stocksTraking.stock$;
    }
  }
}
