import { Component, Input, OnInit } from '@angular/core';
import { StocksService } from '../../../core/stocks.service';
import { IStock } from '../../../models/stock.model';

@Component({
  selector: 'app-stock-thumbnail',
  templateUrl: './stock-thumbnail.component.html',
  styleUrls: ['./stock-thumbnail.component.css'],
})
export class StockThumbnailComponent implements OnInit {
  @Input() stock: IStock;

  constructor(private stocksService: StocksService) {}

  ngOnInit() {}

  clear() {
    this.stocksService.clear(this.stock.symbol);
  }
}
