import { Component, Input, OnInit } from '@angular/core';
import { IStock } from '../models/stock.model';

@Component({
  selector: 'app-stock-thumbnail',
  template: `<div>
  <h3>{{stock.name}}</h3>
  {{stock | json}}
  <ul>
    <li>{{stock.changeToday}}</li>
    <li>{{stock.openPrice}}</li>
    <li>{{stock.currentPrice}}</li>
    <li>{{stock.highPrice}}</li>
  </ul>
  </div>`,
  styles: [],
})
export class StockThumbnailComponent implements OnInit {
  @Input() stock: IStock;
  constructor() {}

  ngOnInit() {}
}
