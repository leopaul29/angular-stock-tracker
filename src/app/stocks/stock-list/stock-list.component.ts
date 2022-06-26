import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../core/stocks.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['stock-list.component.ts'],
})
export class StockListComponent implements OnInit {
  //visibleStockList: IStock[];

  stockList$ = this.stocksService.stockList$;

  constructor(private stocksService: StocksService) {}

  ngOnInit() {}

  clearAll() {
    this.stocksService.clearAll();
  }
}
