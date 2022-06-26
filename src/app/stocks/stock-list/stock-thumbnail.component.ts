import { Component, Input, OnInit } from '@angular/core';
import { StocksService } from '../../core/stocks.service';
import { IStock } from '../../models/stock.model';

@Component({
  selector: 'app-stock-thumbnail',
  template: `<div class="border stock-thumbnail" >
  <div class="thumbnail-header">
  <div class="thumbnail-title" [routerLink]="['/stocks', stock.symbol]">
    <img *ngIf="stock.logo" src={{stock.logo}} alt={{stock.name}} width="50"/>
    <h3>{{stock.name | uppercase}}</h3></div>
    <span (click)="clear()">xXx</span>
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
    <div class="thumbnail-trend" [ngStyle]="getTrendStyle()">
      <span *ngIf="stock.changeToday > 0">⇧</span>
      <span *ngIf="stock.changeToday == 0" >=</span>
      <span *ngIf="stock.changeToday < 0 ">⇩</span>
    </div>
  </div>`,
  styles: [],
})
export class StockThumbnailComponent implements OnInit {
  @Input() stock: IStock;
  constructor(private stocksService: StocksService) {}

  ngOnInit() {}

  clear() {
    this.stocksService.clear(this.stock.symbol);
  }

  getTrendStyle() {
    const trend = this.stock?.changeToday;
    switch (true) {
      case trend > 0:
        return { color: 'green' };
      case trend < 0:
        return { color: 'red' };
      case trend == 0:
        return { color: 'brown' };
      default:
        return { color: 'black' };
    }
  }
}
