import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { FilterStocksService } from '../../core/filter-stocks.service';
import { StocksManagerService } from '../../core2/stocks-manager.service';
import { IStock } from '../../models/stock.model';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['stock-list.component.css'],
})
export class StockListComponent implements OnInit, OnDestroy {
  sortBy: string;
  visibleStockList: IStock[];
  visibleStockList$: Observable<IStock[]>;
  stockList: IStock[];
  stockList$: Observable<IStock[]>;
  stockListSubscription: Subscription;

  constructor(
    private stocksManager: StocksManagerService,
    private filterStocksService: FilterStocksService
  ) {
    this.sortBy = '';
    this.visibleStockList = [];
    this.visibleStockList$ = new Observable<IStock[]>();
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

  applyFilter(filter: string): void {
    if (!filter) return;

    this.sortBy = filter;
    this.visibleStockList = this.filterStocksService.filterStocks(
      filter,
      this.stockList
    );
  }

  clearAll(): void {
    this.stocksManager.clearAll();
  }
}
