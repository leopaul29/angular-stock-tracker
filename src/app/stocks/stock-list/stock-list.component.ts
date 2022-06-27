import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { FilterStocksService } from '../../core/filter-stocks.service';
import { StocksService } from '../../core/stocks.service';
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
  stockList$ = this.stocksService.stockList$;
  stockListSubscription: Subscription;

  constructor(
    private stocksService: StocksService,
    private filterStocksService: FilterStocksService
  ) {
    this.sortBy = '';
    this.visibleStockList = [];
    this.visibleStockList$ = new Observable();
    this.stockList = [];
    this.stockListSubscription = new Subscription();
  }

  ngOnInit() {
    this.stockListSubscription = this.stockList$.subscribe((data) => {
      console.log('stockList changed');
      this.stockList = data;
    });
    this.visibleStockList = this.stockList;
    this.visibleStockList$ = of(this.visibleStockList);
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
    this.stocksService.clearAll();
  }
}
