import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../../core/stocks.service';

@Component({
  selector: 'app-stock-list-filter',
  templateUrl: './stock-list-filter.component.html',
  styleUrls: ['./stock-list-filter.component.css'],
})
export class StockListFilterComponent implements OnInit {
  constructor(private stocksService: StocksService) {}

  ngOnInit() {}

  clearAll() {
    this.stocksService.clearAll();
  }
}
