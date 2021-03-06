import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StocksService } from '../../core/stock.service';
import { StocksManagerService } from '../../core/stocks-manager.service';
import { IStock, IStockForm } from '../../models/stock.model';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css'],
})
export class StockFormComponent implements OnInit, OnDestroy {
  // form input
  stockSymbol: string;
  errorMsg: string;
  stockListSubscription: Subscription;

  constructor(
    private stocksService: StocksService,
    private stocksManager: StocksManagerService
  ) {
    this.stockSymbol = '';
    this.errorMsg = '';
    this.stockListSubscription = new Subscription();
  }

  ngOnInit() {
    this.stockListSubscription = this.stocksService.stock$.subscribe(
      (data: IStock) => {
        if (data) {
          if (!this.stocksManager.stockExist(data?.symbol)) {
            this.stocksManager.addStock(data);
            this.stockSymbol = '';
          } else {
            this.errorMsg = `Stock ${this.stockSymbol} in the list`;
          }
        } else {
          this.errorMsg = 'Stock not found:' + this.stockSymbol;
        }
        this.stockSymbol = '';
      },
      (err) => {
        alert(err);
        console.error('Error:', err);
      },
      () => console.log('Completed form add stock')
    );
  }

  ngOnDestroy(): void {
    this.stockListSubscription.unsubscribe();
  }

  addStock(formValues: IStockForm): void {
    if (formValues && formValues.stockSymbol) {
      this.stocksService.selectedSymbolChanged(formValues.stockSymbol);
      this.stocksService.stock$;
    }
  }
}
