import { Component, VERSION } from '@angular/core';
import { StocksService } from './core/stocks.service';

@Component({
  selector: 'my-app',
  template: `<app-stock-form></app-stock-form>
  <app-stock-list></app-stock-list>
  `,
  styles: [],
})
export class AppComponent {
  constructor() {}
}
