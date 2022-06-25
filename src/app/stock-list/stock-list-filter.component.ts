import { Component, Input, OnInit } from '@angular/core';
import { StocksService } from '../core/stocks.service';

@Component({
  selector: 'app-stock-list-filter',
  template: `<div><!--
  <b>filter here</b>
  <button (click)="clearAll()">Clear All</button>-->
  </div>`,
  styles: [],
})
export class StockListFilterComponent implements OnInit {
  constructor(private stocksService: StocksService) {}

  ngOnInit() {}

  clearAll() {
    console.log('filter clearAll');
  }
}
