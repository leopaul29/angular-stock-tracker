import { Component, Input, OnInit } from '@angular/core';
import { IStock } from '../models/stock.model';

@Component({
  selector: 'app-stock-thumbnail',
  template: `<div>
  <h3>
    <img src={{stock.logo}} alt={{stock.name}} width="50"/>
    {{stock.name | uppercase}}
  </h3>
  {{stock | json}}  
  <ul>
    <li>Change today: {{stock.changeToday}}%</li>
    <li>Open price: {{stock.openPrice | currency: 'USD'}}</li>
    <li>Current price: {{stock.currentPrice | currency: 'USD'}}</li>
    <li>High price: {{stock.highPrice | currency: 'USD'}}</li>
  </ul>
  </div>`,
  styles: [],
})
export class StockThumbnailComponent implements OnInit {
  @Input() stock: IStock;
  constructor() {}

  ngOnInit() {}
}
