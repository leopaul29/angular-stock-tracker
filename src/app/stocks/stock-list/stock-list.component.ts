import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StocksManagerService } from '../../core/stocks-manager.service';
import { IStock } from '../../models/stock.model';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['stock-list.component.css'],
})
export class StockListComponent implements OnInit, OnDestroy {
  stockList: IStock[];
  stockList$: Observable<IStock[]>;
  stockListSubscription: Subscription;

  constructor(private stocksManager: StocksManagerService) {
    this.stockList = [];
    this.stockList$ = new Observable<IStock[]>();
    this.stockListSubscription = new Subscription();
  }

  ngOnInit() {
    this.stockList$ = this.stocksManager.stockList$;
  }

  ngOnDestroy(): void {
    this.stockListSubscription.unsubscribe();
  }

  clearAll(): void {
    this.stocksManager.clearAll();
  }
}
