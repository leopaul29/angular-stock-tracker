import { Component, Input, OnInit } from '@angular/core';
import { IStock } from '../../models/stock.model';

@Component({
  selector: 'app-stock-thumbnail',
  template: `<div class="border stock-thumbnail">
  <div class="thumbnail-header">
    <img *ngIf="stock.logo" src={{stock.logo}} alt={{stock.name}} width="50"/>
    <h3>{{stock.name | uppercase}}</h3>
  </div>
  <div class="thumbnail-body">
    <div class="thumbnail-data">
      <ul>
        <li>Change today: {{stock.changeToday}}% </li>
        <li>Open price: {{stock.openPrice | currency: 'USD'}}</li>
        <li>Current price: {{stock.currentPrice | currency: 'USD'}}</li>
        <li>High price: {{stock.highPrice | currency: 'USD'}}</li>
      </ul>
    </div>
    <div class="thumbnail-trend">
      <span *ngIf="stock.changeToday > 0" style="color:green;">⇧</span>
      <span *ngIf="stock.changeToday == 0 "style="color:brown;">=</span>
      <span *ngIf="stock.changeToday < 0 "style="color:red;">⇩</span>
    </div>
  </div>`,
  styles: [],
})
export class StockThumbnailComponent implements OnInit {
  @Input() stock: IStock;
  constructor() {}

  ngOnInit() {}
}
