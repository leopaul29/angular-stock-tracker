import { Component, OnInit, VERSION } from '@angular/core';
import { StocksService } from './core/stocks.service';

@Component({
  selector: 'my-app',
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(private stocksService: StocksService) {}

  ngOnInit(): void {
    this.stocksService.load();
  }
}
