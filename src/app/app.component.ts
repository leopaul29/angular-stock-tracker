import { Component, OnInit, VERSION } from '@angular/core';
import { StocksLocalStorageService } from './core/stocks-localStorage.service';
import { StocksService } from './core/stocks.service';

@Component({
  selector: 'my-app',
  template: `<app-stock-form></app-stock-form>
  <app-stock-list></app-stock-list>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(private stocksLocalStorage: StocksLocalStorageService) {}
  ngOnInit(): void {
    this.stocksLocalStorage.load();
  }
}
