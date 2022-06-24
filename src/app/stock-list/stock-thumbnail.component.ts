import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-thumbnail',
  template: `<div>current price: {{stock.c}}</div>`,
  styles: [],
})
export class StockThumbnailComponent implements OnInit {
  @Input() stock;
  constructor() {}

  ngOnInit() {}
}
